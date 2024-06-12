import {
  AbstractMessageAction, MessageType, type Message, getAppStore, type DataRecordSetChangeMessage, RecordSetChangeType, type DataSourceFilterChangeMessage,
  type DataRecordsSelectionChangeMessage, type ExtentChangeMessage, type FeatureDataRecord as FeatureQueryDataRecord, MutableStoreManager, DataSourceManager, type MessageDescription,
  type DataSourcesChangeMessage, DataSourcesChangeType, type UseDataSource, type ImmutableArray
} from 'jimu-core'
import { type FeatureDataRecord as FeatureLayerDataRecord, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { cloneFeature, isWidgetSendZoomToActionToAnother } from '../runtime/utils'
import { type IMConfig } from './pan-to-action-setting'
import { getDsByWidgetId } from './action-utils'

export interface PanToGeometriesInternalValue {
  type: 'pan-to-geometries'
  geometries: __esri.Geometry[]
}

export interface PanToExtentInternalValue {
  type: 'pan-to-extent'
  geometries: [__esri.Extent]
  stationary: boolean
  publishTime: number
  publishWidgetId: string
}

export interface PanToQueryParamsInternalValue {
  type: 'pan-to-query-params'
  dataSourceIds: string[]
  useDataSources: ImmutableArray<UseDataSource>
}

export interface PanToLayerInternalValue {
  type: 'pan-to-layer'
  dataSourceId: string
}

export interface PanToLayersInternalValue {
  type: 'pan-to-layers'
  dataSourceIds: string[]
}

export interface PanToActionValue {
  value: PanToGeometriesInternalValue | PanToExtentInternalValue | PanToQueryParamsInternalValue | PanToLayerInternalValue | PanToLayersInternalValue
  relatedWidgets: string[]
}

export default class PanToAction extends AbstractMessageAction {
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
    //const config = getAppStore().getState().appStateInBuilder ? getAppStore().getState().appStateInBuilder.appConfig : getAppStore().getState().appConfig
    //const messageWidgetJson = config.widgets[messageWidgetId]
    if (messageType === MessageType.DataRecordsSelectionChange ||
          messageType === MessageType.DataSourceFilterChange) {
      return 'message-actions/pan-to-action-setting'
    } else {
      return null
    }
  }

  onExecute (message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean {
    // message.widgetId is message sender, this.widgetId is message receiver

    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: typeof __esri.Graphic = null;
      [Graphic] = modules

      switch (message.type) {
        case MessageType.DataRecordSetChange:
          if (isWidgetSendZoomToActionToAnother(message.widgetId, this.widgetId, MessageType.DataRecordSetChange)) {
            // message.widgetId sends both panTo and zoomTo actions to this.widgetId, we should not execute panTo action to avoid conflict with zoomTo action.
            break
          }

          const dataRecordSetChangeMessage = message as DataRecordSetChangeMessage
          if (dataRecordSetChangeMessage.changeType === RecordSetChangeType.CreateUpdate) {
            const geometries: __esri.Geometry[] = []
            dataRecordSetChangeMessage.dataRecordSets.forEach(dataRecordSet => {
              if (dataRecordSet && dataRecordSet.records) {
                for (let i = 0; i < dataRecordSet.records.length; i++) {
                  const dataRecordFeature = (dataRecordSet.records[i] as
                    (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature
                  if (dataRecordFeature) {
                    geometries.push(cloneFeature(dataRecordFeature, Graphic).geometry)
                  }
                }
              }
            })
            const panToValue: PanToGeometriesInternalValue = {
              type: 'pan-to-geometries',
              geometries: geometries
            }
            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', panToValue)
          }
          break
        case MessageType.DataRecordsSelectionChange:
          if (isWidgetSendZoomToActionToAnother(message.widgetId, this.widgetId, MessageType.DataRecordsSelectionChange)) {
            // message.widgetId sends both panTo and zoomTo actions to this.widgetId, we should not execute panTo action to avoid conflict with zoomTo action.
            break
          }

          const config = getAppStore().getState().appConfig
          const messageWidgetJson = config.widgets[message.widgetId]
          const messageWidgetLabel = messageWidgetJson.manifest.label
          const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage

          const geometries: __esri.Geometry[] = []
          if (dataRecordsSelectionChangeMessage.records) {
            if (dataRecordsSelectionChangeMessage.records[0]) {
              //if (!actionConfig.useDataSource || (dataRecordsSelectionChangeMessage.records[0].dataSource.getMainDataSource().id !== actionConfig.useDataSource.mainDataSourceId)) {
              //  break
              //}
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
              const dataRecordFeature = (dataRecordsSelectionChangeMessage.records[i] as
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature
              if (dataRecordFeature) {
                geometries.push(cloneFeature(dataRecordFeature, Graphic).geometry)
              }
            }
          }

          const panToValue: PanToGeometriesInternalValue = {
            type: 'pan-to-geometries',
            geometries: geometries
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', panToValue)
          break
        case MessageType.ExtentChange:
          if (isWidgetSendZoomToActionToAnother(message.widgetId, this.widgetId, MessageType.ExtentChange)) {
            // message.widgetId sends both panTo and zoomTo actions to this.widgetId, we should not execute panTo action to avoid conflict with zoomTo action.
            // isWidgetSendZoomToActionToAnother() can only handle simple panTo and zoomTo conflict.
            // To avoid more complicated panTo and zoomTo conflict cases, we do it in handleActionForPanToActionValue of mapbase.
            break
          }

          const extentChangeMessage = message as ExtentChangeMessage
          const relatedWidgetIds = extentChangeMessage.getRelatedWidgetIds()

          if (relatedWidgetIds.includes(this.widgetId)) {
            break
          }

          const extentValue: PanToExtentInternalValue = {
            type: 'pan-to-extent',
            geometries: [extentChangeMessage.extent],
            stationary: extentChangeMessage.stationary,
            publishTime: extentChangeMessage.publishTime,
            publishWidgetId: extentChangeMessage.widgetId
          }

          const panToFeatureActionValue: PanToActionValue = {
            value: extentValue,
            relatedWidgets: relatedWidgetIds
          }
          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue', panToFeatureActionValue)
          break
        case MessageType.DataSourceFilterChange:
          if (isWidgetSendZoomToActionToAnother(message.widgetId, this.widgetId, MessageType.DataSourceFilterChange)) {
            // message.widgetId sends both panTo and zoomTo actions to this.widgetId, we should not execute panTo action to avoid conflict with zoomTo action.
            break
          }

          const filterChangeMessage = message as DataSourceFilterChangeMessage
          // support view.
          if (!actionConfig.useDataSources.some(useDataSource => filterChangeMessage.dataSourceIds.some(dataSourceId => useDataSource?.dataSourceId === dataSourceId))) {
            break
          }

          const filterChangeActionValue: PanToQueryParamsInternalValue = {
            type: 'pan-to-query-params',
            dataSourceIds: filterChangeMessage.dataSourceIds,
            useDataSources: actionConfig.useDataSources || ([] as unknown as ImmutableArray<UseDataSource>)
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', filterChangeActionValue)
          break
        case MessageType.DataSourcesChange:
          if (isWidgetSendZoomToActionToAnother(message.widgetId, this.widgetId, MessageType.DataSourcesChange)) {
            // message.widgetId sends both panTo and zoomTo actions to this.widgetId, we should not execute panTo action to avoid conflict with zoomTo action.
            break
          }

          const dataSourcesChangeMessage = message as DataSourcesChangeMessage
          if (dataSourcesChangeMessage.changeType === DataSourcesChangeType.Create) {
            const dataSourceIds = []
            dataSourcesChangeMessage.dataSources.forEach(dataSource => {
              dataSourceIds.push(dataSource.id)
            })
            const panToFeatureActionValueForLayers: PanToLayersInternalValue = {
              type: 'pan-to-layers',
              dataSourceIds: dataSourceIds
            }
            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', panToFeatureActionValueForLayers)
          }
          break
      }
      return true
    })
  }
}
