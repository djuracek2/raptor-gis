import {
  AbstractMessageAction, MessageType, type Message, type DataRecordSetChangeMessage, RecordSetChangeType, getAppStore, DataSourceManager,
  type DataRecordsSelectionChangeMessage, type FeatureDataRecord, type ExtentChangeMessage, MutableStoreManager, type DataSourceFilterChangeMessage, type MessageDescription,
  type DataSourcesChangeMessage, DataSourcesChangeType, type UseDataSource, type ImmutableArray
} from 'jimu-core'
import { loadArcGISJSAPIModules, type ViewPadding, type ZoomToOptions } from 'jimu-arcgis'
import { cloneFeature } from '../runtime/utils'
import { type IMConfig } from './zoom-to-feature-action-setting'
import { getDsByWidgetId } from './action-utils'

export interface BaseZoomToInternalValue {
  zoomToOption: ZoomToOptions
}

export interface ZoomToArrayGraphicsInternalValue extends BaseZoomToInternalValue {
  type: 'zoom-to-array-graphics'
  arrayFeatures: __esri.Graphic[][]
}

export interface ZoomToGraphicsInternalValue extends BaseZoomToInternalValue {
  type: 'zoom-to-graphics'
  features: __esri.Graphic[]
  dataSourceId: string
}

export interface ZoomToExtentInternalValue extends BaseZoomToInternalValue {
  type: 'zoom-to-extent'
  extent: __esri.Extent
  viewpoint: __esri.Viewpoint
  stationary: boolean
  interacive: boolean
  publishTime: number
  publishWidgetId: string
}

export interface ZoomToQueryParamsInternalValue extends BaseZoomToInternalValue {
  type: 'zoom-to-query-params'
  dataSourceIds: string[]
  useDataSources: ImmutableArray<UseDataSource>
}

export interface ZoomToLayersInternalValue extends BaseZoomToInternalValue {
  type: 'zoom-to-layers'
  dataSourceIds: string[]
}

export interface ZoomToFeatureActionValue {
  value: ZoomToArrayGraphicsInternalValue | ZoomToGraphicsInternalValue | ZoomToExtentInternalValue | ZoomToQueryParamsInternalValue | ZoomToLayersInternalValue
  relatedWidgets: string[]
}

export default class ZoomToFeatureAction extends AbstractMessageAction {
  NoLockTriggerLayerWidgets = ['Map']

  filterMessageDescription (messageDescription: MessageDescription): boolean {
    if (messageDescription.messageType === MessageType.ExtentChange) {
      return true
    } else if (messageDescription.messageType === MessageType.DataSourcesChange) {
      return true
    } else if (messageDescription.messageType !== MessageType.DataRecordSetChange &&
        messageDescription.messageType !== MessageType.DataRecordsSelectionChange &&
        messageDescription.messageType !== MessageType.DataSourceFilterChange) {
      return false
    } else {
      const dataSourceManager = DataSourceManager.getInstance()
      const messageWidgetUseDataSources = getDsByWidgetId(messageDescription.widgetId, messageDescription.messageType)
      return messageWidgetUseDataSources.some(useDataSource => {
        const ds = dataSourceManager.getDataSource(useDataSource.dataSourceId)

        // widget1 send message to map widget, ds comes from widget1.useDataSources.

        if (ds) {
          // #16835, ds maybe not ready when the ExB app is opened and add the message action immediately in widget action setting
          if (ds.type === 'WEB_MAP' || ds.type === 'WEB_SCENE') {
            // If ds.type is WEB_MAP or WEB_SCENE, means widget1 is also a map widget.
            return true
          } else {
            // widget1 is not map widget, like list widget uses a layer ds.
            return !!ds.getGeometryType()
          }
        }

        return false
      })
    }
  }

  filterMessage (message: Message): boolean {
    return true
  }

  getSettingComponentUri (messageType: MessageType, messageWidgetId?: string): string {
    if (messageType === MessageType.DataRecordsSelectionChange ||
          messageType === MessageType.DataRecordSetChange ||
          messageType === MessageType.DataSourceFilterChange) {
      return 'message-actions/zoom-to-feature-action-setting'
    } else {
      return null
    }
  }

  onExecute (message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean {
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: typeof __esri.Graphic = null;
      [Graphic] = modules

      let zoomToOption: ZoomToOptions = null
      const viewPadding: ViewPadding = {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
      }

      switch (message.type) {
        case MessageType.DataRecordSetChange:
          const dataRecordSetChangeMessage = message as DataRecordSetChangeMessage
          if (dataRecordSetChangeMessage.changeType === RecordSetChangeType.CreateUpdate) {
            const arrayFeatures: __esri.Graphic[][] = []
            dataRecordSetChangeMessage.dataRecordSets.forEach(dataRecordSet => {
              if (dataRecordSet && dataRecordSet.records) {
                const features: __esri.Graphic[] = []
                for (let i = 0; i < dataRecordSet.records.length; i++) {
                  if ((dataRecordSet.records[i] as FeatureDataRecord).feature) {
                    features.push(cloneFeature((dataRecordSet.records[i] as
                      FeatureDataRecord).feature, Graphic))
                  }
                }
                if (features.length > 0) {
                  arrayFeatures.push(features)
                }
              }
            })

            zoomToOption = getZoomToOptions(actionConfig, viewPadding)

            const zoomToValue: ZoomToArrayGraphicsInternalValue = {
              type: 'zoom-to-array-graphics',
              arrayFeatures: arrayFeatures,
              zoomToOption: zoomToOption
            }

            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', zoomToValue)
          }
          break
        case MessageType.DataRecordsSelectionChange:
          const config = getAppStore().getState().appConfig
          const messageWidgetJson = config.widgets[message.widgetId]
          const messageWidgetLabel = messageWidgetJson.manifest.label
          const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage

          const selectFeatures: __esri.Graphic[] = []

          let dataSourceId: string = null
          if (dataRecordsSelectionChangeMessage.records) {
            if (dataRecordsSelectionChangeMessage.records[0]) {
              if (dataRecordsSelectionChangeMessage.records[0].dataSource) {
                dataSourceId = (dataRecordsSelectionChangeMessage.records[0].dataSource).id
              }

              if (this.NoLockTriggerLayerWidgets.includes(messageWidgetLabel)) {
                const mainDataSourceOfSelection = dataRecordsSelectionChangeMessage.records[0].dataSource.getMainDataSource()
                if (!actionConfig?.useDataSources?.some(useDataSource => useDataSource?.mainDataSourceId === mainDataSourceOfSelection.id)) {
                  break
                }
              } else {
                const selectionChangeDS = dataRecordsSelectionChangeMessage.records[0].dataSource
                const selectionChangeMainDS = selectionChangeDS?.getMainDataSource()
                // check dsId of mainDS currently, will support view in the future.
                if (!actionConfig.useDataSources.some(useDataSource => useDataSource?.mainDataSourceId === selectionChangeMainDS.id)) {
                  break
                }
              }
            }

            for (let i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
              if ((dataRecordsSelectionChangeMessage.records[i] as FeatureDataRecord).feature) {
                selectFeatures.push(cloneFeature((dataRecordsSelectionChangeMessage.records[i] as
                  FeatureDataRecord).feature, Graphic))
              }
            }
          }

          const isNotEmptyFeatures = selectFeatures && selectFeatures.length > 0
          const isEmptyFeatures = !isNotEmptyFeatures

          if (!dataSourceId || isEmptyFeatures) {
            break
          }

          zoomToOption = getZoomToOptions(actionConfig, viewPadding)

          const selectionFeatureSet: ZoomToGraphicsInternalValue = {
            type: 'zoom-to-graphics',
            features: selectFeatures,
            dataSourceId: dataSourceId,
            zoomToOption: zoomToOption
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', selectionFeatureSet)
          break
        case MessageType.ExtentChange:
          const extentChangeMessage = message as ExtentChangeMessage
          const relatedWidgetIds = extentChangeMessage.getRelatedWidgetIds()

          if (relatedWidgetIds.includes(this.widgetId)) {
            break
          }

          const extentValue: ZoomToExtentInternalValue = {
            type: 'zoom-to-extent',
            extent: extentChangeMessage.extent,
            viewpoint: extentChangeMessage.viewpoint,
            stationary: extentChangeMessage.stationary,
            interacive: extentChangeMessage.interacive,
            zoomToOption: undefined,
            publishTime: extentChangeMessage.publishTime,
            publishWidgetId: extentChangeMessage.widgetId
          }

          const zoomToFeatureActionValue: ZoomToFeatureActionValue = {
            value: extentValue,
            relatedWidgets: relatedWidgetIds
          }
          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue', zoomToFeatureActionValue)
          break
        case MessageType.DataSourceFilterChange:
          const filterChangeMessage = message as DataSourceFilterChangeMessage
          // support data view.
          if (!actionConfig.useDataSources.some(useDataSource => filterChangeMessage.dataSourceIds.some(dataSourceId => useDataSource?.dataSourceId === dataSourceId))) {
            break
          }

          zoomToOption = getZoomToOptions(actionConfig, viewPadding)

          const filterChangeActionValue: ZoomToQueryParamsInternalValue = {
            type: 'zoom-to-query-params',
            dataSourceIds: filterChangeMessage.dataSourceIds,
            zoomToOption: zoomToOption,
            useDataSources: actionConfig.useDataSources || ([] as unknown as ImmutableArray<UseDataSource>)
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', filterChangeActionValue)
          break
        case MessageType.DataSourcesChange:
          const dataSourcesChangeMessage = message as DataSourcesChangeMessage

          if (dataSourcesChangeMessage.changeType === DataSourcesChangeType.Create) {
            const dataSourceIds = []
            dataSourcesChangeMessage.dataSources.forEach(dataSource => {
              dataSourceIds.push(dataSource.id)
            })

            zoomToOption = getZoomToOptions(actionConfig, viewPadding)

            const zoomToFeatureActionValueForLayers: ZoomToLayersInternalValue = {
              type: 'zoom-to-layers',
              dataSourceIds: dataSourceIds,
              zoomToOption: zoomToOption
            }

            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', zoomToFeatureActionValueForLayers)
          }

          break
      }

      return true
    })
  }
}

function getZoomToOptions (actionConfig: IMConfig, padding: ViewPadding): ZoomToOptions {
  let zoomToOptions: ZoomToOptions = {}

  if (actionConfig && actionConfig.isUseCustomZoomToOption && typeof actionConfig.zoomToOption.scale === 'number') {
    zoomToOptions.scale = actionConfig.zoomToOption.scale
  }

  if (padding) {
    zoomToOptions.padding = padding
  }

  if (Object.keys(zoomToOptions).length === 0) {
    zoomToOptions = null
  }

  return zoomToOptions
}
