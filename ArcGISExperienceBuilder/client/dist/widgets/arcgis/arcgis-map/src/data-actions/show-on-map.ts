import {
  type DataRecordSet,
  type ImmutableObject,
  type JimuMapViewInfo,
  AbstractDataAction,
  getAppStore,
  DataSourceStatus,
  MutableStoreManager,
  utils,
  i18n,
  DataLevel
} from 'jimu-core'
import { MapViewManager, SHOW_ON_MAP_DATA_ID_PREFIX, ActionType, type ShowOnMapDatas, type ShowOnMapData } from 'jimu-arcgis'
import defaultMessages from '../runtime/translations/default'

interface TitleCountInfo {
  count: number // 1 based
  rawTitle: string
  finalTitle: string
}

interface ShowOnMapDataWithTitleCountInfo extends ShowOnMapData {
  titleCountInfo?: TitleCountInfo
}

export default class ShowOnMap extends AbstractDataAction {
  private readonly _viewManager = MapViewManager.getInstance()

  /**
   * ShowOnMap data action only supports DataLevel.RECORDS data, doesn't support DataLevel.DATA_SOURCE data.
   */
  async isSupported (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean> {
    if (dataSets.length > 1) {
      return false
    }
    const dataSet = dataSets[0]
    const { records, dataSource } = dataSet
    if (!dataSource || dataSource.getStatus() === DataSourceStatus.NotReady) {
      return false
    }
    // @ts-expect-error
    return dataLevel === DataLevel.Records && records?.length > 0 && records.some(record => record.feature?.geometry)
  }

  async onExecute (dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string, actionConfig?: any): Promise<boolean> {
    const activeViewId = this._getActiveViewId(this.widgetId, getAppStore().getState().jimuMapViewsInfo)
    const showOnMapDatas: ShowOnMapDatas = MutableStoreManager.getInstance().getStateValue([this.widgetId])?.showOnMapDatas || {}

    const dataSet = dataSets[0]
    const titleCountInfo = this.getUniqueTitleCountInfo(dataSet, activeViewId, showOnMapDatas)

    // save action data
    const id = `${SHOW_ON_MAP_DATA_ID_PREFIX}dataAction_${utils.getUUID()}`

    // use code to maintain 'symbolOption' compatibility here
    // For app was created before online10.1 (inlcude 10.1), actionConfig is undefined, the final 'symbolOption' is undefined.
    // For app was created or saved after online10.1, actionConfig is a object,
    //  if actionConfig.isUseCustomSymbol is true, means check 'Use custom symbols' option, the final 'symbolOption' is actionConfig.symbolOption
    //  if actionConfig.isUseCustomSymbol is false, means uncheck 'Use layer-defined symbols' option, the final 'symbolOption' is null

    // Summary:
    // for 'symbolOption', the difference between the values 'undefined' and 'null':
    //   undefined: app was created before online10.1 (inlcude 10.1), use default symbol;
    //   null: app was created or saved after online10.1, use default renderer of layer.
    // symbolOption: actionConfig?.isUseCustomSymbol ? actionConfig.symbolOption : (actionConfig?.isUseCustomSymbol === false ? null : undefined),
    let symbolOption

    if (actionConfig) {
      // > online 10.1
      if (actionConfig.isUseCustomSymbol) {
        // 'Use custom symbols' option
        symbolOption = actionConfig.symbolOption
      } else if (actionConfig.isUseCustomSymbol === false) {
        // 'Use layer-defined symbols' option
        symbolOption = null
      } else {
        // should not goes here
        symbolOption = undefined
      }
    } else {
      // <= online 10.1
      // use featureUtils.getDefaultSymbol() to create default 2D symbol
      symbolOption = undefined
    }

    const newShowOnMapData: ShowOnMapDataWithTitleCountInfo = {
      mapWidgetId: this.widgetId,
      // messageWidgetId is only available for message action, so keep it empty for data action
      messageWidgetId: undefined,
      jimuMapViewId: activeViewId,
      dataSet,
      type: ActionType.DataAction,
      symbolOption,
      title: titleCountInfo.finalTitle,
      titleCountInfo
    }

    showOnMapDatas[id] = newShowOnMapData
    MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'showOnMapDatas', showOnMapDatas)

    return await Promise.resolve(true)
  }

  private getUniqueTitleCountInfo (dataSet: DataRecordSet, activeViewId: string, showOnMapDatas: ShowOnMapDatas): TitleCountInfo {
    const intl = i18n.getIntl()
    const rawTitle = dataSet.name || intl.formatMessage({ id: 'showOnMapData', defaultMessage: defaultMessages.showOnMapData })

    // #16798, If Query widget sends data action with same data source and data records multiple times, we will create multiple layers with same title.
    // To avoid this case, we need to make name unique.
    const existingTitleCounts: number[] = []
    Object.values(showOnMapDatas).forEach((showOnMap: ShowOnMapDataWithTitleCountInfo) => {
      const titleCountInfo = showOnMap.titleCountInfo

      if (showOnMap.jimuMapViewId === activeViewId && showOnMap.type === ActionType.DataAction && titleCountInfo && titleCountInfo.rawTitle === rawTitle && titleCountInfo.count >= 0) {
        existingTitleCounts.push(titleCountInfo.count)
      }
    })

    let titleCountInfo: TitleCountInfo = null

    if (existingTitleCounts.length > 0) {
      const maxCount = Math.max(...existingTitleCounts)
      const count = maxCount + 1
      const finalTitle = `${rawTitle} ${maxCount + 1}`

      titleCountInfo = {
        rawTitle,
        finalTitle,
        count
      }
    } else {
      const count = 1
      const finalTitle = rawTitle

      titleCountInfo = {
        rawTitle,
        finalTitle,
        count
      }
    }

    return titleCountInfo
  }

  private _getActiveViewId (mapWidgetId: string, infos: ImmutableObject<{ [jimuMapViewId: string]: JimuMapViewInfo }>): string {
    let activeViewId = Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId && infos[viewId].isActive)
    // using a default map view as active map view if the widget hasn't been loaded.
    if (!activeViewId) {
      activeViewId = Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId)
    }
    return activeViewId
  }
}
