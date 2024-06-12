import {
  AbstractMessageAction, MessageType, type Message, type DataRecordSetChangeMessage, RecordSetChangeType, MutableStoreManager,
  getAppStore, type ImmutableObject, type JimuMapViewInfo, type MessageDescription, DataSourceManager
} from 'jimu-core'
import { SHOW_ON_MAP_DATA_ID_PREFIX, ActionType, type ShowOnMapDatas } from 'jimu-arcgis'
import { type IMConfig } from './show-on-map-action-setting'
import { getDsByWidgetId } from './action-utils'

export default class ShowOnMapAction extends AbstractMessageAction {
  filterMessageDescription (messageDescription: MessageDescription): boolean {
    if (messageDescription.messageType === MessageType.DataRecordSetChange) {
      const dataSourceManager = DataSourceManager.getInstance()
      const messageWidgetUseDataSources = getDsByWidgetId(messageDescription.widgetId, messageDescription.messageType)
      return messageWidgetUseDataSources.some(useDataSource => {
        const ds = dataSourceManager.getDataSource(useDataSource.dataSourceId)

        // widget1 send message to map widget, ds comes from widget1.useDataSources.

        if (ds) {
          // #16835, ds maybe not ready when the ExB app is opened and add the message action immediately in widget action setting
          return !!ds.getGeometryType()
        }

        return false
      })
    } else {
      return false
    }
  }

  filterMessage (message: Message): boolean {
    return true
  }

  onRemoveListen (messageType: MessageType, messageWidgetId?: string) {
    const showOnMapDatas: ShowOnMapDatas = MutableStoreManager.getInstance().getStateValue([this.widgetId])?.showOnMapDatas || {}
    const newShowOnMapDatas = {}
    Object.entries(showOnMapDatas).forEach(entry => {
      if (entry[1]?.messageWidgetId !== messageWidgetId) {
        newShowOnMapDatas[entry[0]] = entry[1]
      }
    })
    // save action data
    MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'showOnMapDatas', newShowOnMapDatas)
  }

  //getSettingComponentUri (messageType: MessageType, messageWidgetId?: string): string {
  //  return 'message-actions/show-on-map-action-setting'
  //}

  onExecute (message: DataRecordSetChangeMessage, actionConfig?: IMConfig): Promise<boolean> | boolean {
    const activeViewId = this._getActiveViewId(this.widgetId, getAppStore().getState().jimuMapViewsInfo)
    const defaultViewId = this._getDefaultViewId(this.widgetId, getAppStore().getState().jimuMapViewsInfo)
    const jimuMapViewId = activeViewId || defaultViewId
    let showOnMapDatas = MutableStoreManager.getInstance().getStateValue([this.widgetId])?.showOnMapDatas || {}

    if (message.changeType === RecordSetChangeType.CreateUpdate) {
      message.dataRecordSets.forEach(dataRecordSet => {
        const idBase = this._getIdBase(dataRecordSet.name)
        const idTemporary = `${idBase}???`
        // id is used as layerId
        const id = activeViewId ? `${idBase}${activeViewId}` : idTemporary

        if (defaultViewId && defaultViewId === activeViewId) {
          // allow to add data using a temporary id, temporary id data will be deleted if can get activeViewId
          // handle situation:
          //   if the map widget has not been loaded in another page and the map widget has two views (view1 and view2),
          //   the view id is unknown at this time, so ues a temporary view id to add data first, until the page is
          //   loaded and add data again, delete the data corresponding to this temporary view id and use crrrent
          //   active view id to add data.
          delete showOnMapDatas[idTemporary]
        }

        showOnMapDatas[id] = {
          mapWidgetId: this.widgetId,
          messageWidgetId: message.widgetId,
          // Set jimuMapViewId to null means the data will be shared between all jimuMapViews of one mapWidget
          jimuMapViewId: jimuMapViewId, // activeViewId,
          dataSet: dataRecordSet,
          type: ActionType.MessageAction,
          // use code to maintain compatibility here
          // for 'symbolOption', the difference between the values 'undefined' and 'null':
          //   undefined: app was created before online10.1 (inlcude 10.1), use default symbol;
          //   null: app was created or saved after online10.1, use default renderer of layer.
          // eslint-disable-next-line
          symbolOption: actionConfig?.isUseCustomSymbol ? actionConfig.symbolOption : (actionConfig?.isUseCustomSymbol === false ? null : undefined),
          title: id // 'Show on map message ...'
        }
      })
    } else if (message.changeType === RecordSetChangeType.Remove) {
      message.dataRecordSetNames.forEach(dataRecordSetName => {
        const idBase = this._getIdBase(dataRecordSetName)

        // delete showOnMapDatas[id]
        const newShowOnMapDatas = {}
        Object.entries(showOnMapDatas).forEach(entry => {
          if (entry[0].indexOf(idBase) !== 0) {
            newShowOnMapDatas[entry[0]] = entry[1]
          }
        })
        showOnMapDatas = newShowOnMapDatas
      })
    }

    // save action data
    MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'showOnMapDatas', showOnMapDatas)
    return Promise.resolve(true)
  }

  private _getIdBase (dataRecordSetName: string): string {
    return `${SHOW_ON_MAP_DATA_ID_PREFIX}messageAction_${this.widgetId}_${dataRecordSetName}_`
  }

  private _getActiveViewId (mapWidgetId: string, infos: ImmutableObject<{ [jimuMapViewId: string]: JimuMapViewInfo }>): string {
    return Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId && infos[viewId].isActive)
  }

  private _getDefaultViewId (mapWidgetId: string, infos: ImmutableObject<{ [jimuMapViewId: string]: JimuMapViewInfo }>): string {
    return Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId)
  }
}
