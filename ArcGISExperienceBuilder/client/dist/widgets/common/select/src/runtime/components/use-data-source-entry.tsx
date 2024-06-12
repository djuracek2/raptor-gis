import { React, type ImmutableArray, Immutable, getAppStore, DataSourceManager, DataSourceTypes, utils as jimuCoreUtils } from 'jimu-core'
import SelectHeader from './select-header'
import SelectByFilter from './select-by-filter'
import SelectByLocation from './select-by-location'
import {
  WidgetDisplayMode, type UpdateWidgetDisplayMode, type SelectWidgetProps, type DataSourceItemRuntimeInfoMap,
  type WidgetDomRef, getInitialDataSourceItemRuntimeInfoMap, getImDataSourceItemForGeneratedDataSource,
  type UpdateDataSourceItemRuntimeInfoForUid, getReadyToDisplayRuntimeInfos
} from '../utils'
import { type DataSourceItem, type IMDataSourceItem } from '../../config'

export interface UseDataSourceEntryProps {
  isRTL: boolean
  className?: string
  widgetProps: SelectWidgetProps
  widgetDomRef: WidgetDomRef
  dataSourceItemRuntimeInfoMap: DataSourceItemRuntimeInfoMap
  mixinDataSourceItemRuntimeInfoMap: (updatedDataSourceItemRuntimeInfoMap: DataSourceItemRuntimeInfoMap) => void
  updateDataSourceItemRuntimeInfoForUid: UpdateDataSourceItemRuntimeInfoForUid
  updateWidgetDisplayMode: UpdateWidgetDisplayMode
}

/**
 * Entry component when source radio 'Select by data attribute' is checked.
 */
export default function UseDataSourceEntry (props: UseDataSourceEntryProps): React.ReactElement {
  const {
    isRTL,
    className,
    widgetProps,
    widgetDomRef,
    dataSourceItemRuntimeInfoMap,
    mixinDataSourceItemRuntimeInfoMap,
    updateDataSourceItemRuntimeInfoForUid,
    updateWidgetDisplayMode
  } = props

  const {
    widgetId,
    config,
    dataSourceCount: dsCountInAppState,
    autoControlWidgetId
  } = widgetProps

  const {
    dataAttributeInfo,
    spatialSelection
  } = config

  const {
    allowGenerated,
    dataSourceItems: configDataSourceItems
  } = dataAttributeInfo

  // By default, this.props.enableDataAction is undefined, which means enabled.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
  const enableDataAction = widgetProps.enableDataAction !== false
  const shouldRenderSelectByLocation = !!(spatialSelection?.enable)

  // isSelectByLoactionVisible is used to add d-none
  const [isSelectByLoactionVisible, setSelectByLoactionVisible] = React.useState<boolean>(false)

  // store generated data sources at runtime
  const [generatedImDataSourceItems, setGeneratedImDataSourceItems] = React.useState<ImmutableArray<DataSourceItem>>(Immutable([]))

  // generatedImDataSourceItems + configDataSourceItems
  const allImDataSourceItems = React.useMemo(() => {
    return generatedImDataSourceItems.concat(configDataSourceItems)
  }, [configDataSourceItems, generatedImDataSourceItems])

  // update widgetDisplayMode
  React.useEffect(() => {
    let newDisplayMode: WidgetDisplayMode = null

    if (allImDataSourceItems.length > 0) {
      const readyToDisplayRuntimeInfos = getReadyToDisplayRuntimeInfos(allImDataSourceItems, dataSourceItemRuntimeInfoMap)

      if (readyToDisplayRuntimeInfos.length > 0) {
        // some items are ready to display
        newDisplayMode = WidgetDisplayMode.Normal
      } else {
        // all items are loading
        newDisplayMode = WidgetDisplayMode.Loading
      }
    } else {
      // show placeholder if doesn't have any items
      newDisplayMode = WidgetDisplayMode.Placeholder
    }

    updateWidgetDisplayMode(newDisplayMode)
  }, [allImDataSourceItems, dataSourceItemRuntimeInfoMap, updateWidgetDisplayMode])

  // try to update generated data sources when ds count (Object.keys(_appState.dataSourcesInfo).length) changes
  React.useEffect(() => {
    // console.log('ds count change', dsCountInAppState)

    if (!allowGenerated) {
      if (generatedImDataSourceItems.length !== 0) {
        // switch from enable allowGenerated to disable allowGenerated
        setGeneratedImDataSourceItems(Immutable([]))
      }

      return
    }

    const appState = getAppStore().getState()
    const dataSourcesInfo = appState.dataSourcesInfo || Immutable({})
    const dsManager = DataSourceManager.getInstance()
    const oldGeneratdDataSourceIds = generatedImDataSourceItems.map(item => item.useDataSource.dataSourceId).asMutable()
    const newGeneratdDataSourceIds: string[] = []
    Object.keys(dataSourcesInfo).forEach(dsId => {
      // ignore the data source that created by view-in-table action
      if (dsId.includes('view_in_table')) {
        return
      }

      // ignore the associated data source, otherwise Select will show two data sources (one SceneLayerDataSource and one FeatureLayerDataSource) when AddData add a scene layer url
      // TODO: this is a workaround, needs further fix in next release
      if (dsId.includes('associated_data_source')) {
        return
      }

      const ds = dsManager.getDataSource(dsId)

      if (ds) {
        // only want to get generated main data sources
        if (!ds.isInAppConfig() && !ds.isDataView && !ds.isLocal) {
          if (ds.type === DataSourceTypes.FeatureLayer || ds.type === DataSourceTypes.SceneLayer) {
            newGeneratdDataSourceIds.push(ds.id)
          }
        }
      }
    })

    const {
      added: addedGeneratedDsIds,
      deleted: deletedGeneratedDsId,
      saved: keptGeneratedDsIds
    } = jimuCoreUtils.diffArrays(true, oldGeneratdDataSourceIds, newGeneratdDataSourceIds)

    if (addedGeneratedDsIds.length === 0 && deletedGeneratedDsId.length === 0) {
      // no generated data source change
      return
    }

    // ImDataSourceItems that both in oldGeneratdDataSourceIds and newGeneratdDataSourceIds
    const keptGeneratedImDataSourceItems = generatedImDataSourceItems.filter(generatedImDataSourceItem => {
      const dsId = generatedImDataSourceItem.useDataSource.dataSourceId
      return keptGeneratedDsIds.includes(dsId)
    })

    const addedGeneratedDataSourceItems: IMDataSourceItem[] = []

    if (addedGeneratedDsIds.length > 0) {
      // add generated data source
      addedGeneratedDsIds.forEach(dsId => {
        const ds = dsManager.getDataSource(dsId)

        if (ds) {
          const newImDataSourceItem = getImDataSourceItemForGeneratedDataSource(ds)
          addedGeneratedDataSourceItems.push(newImDataSourceItem)
        }
      })

      // add runtimeInfos for addedGeneratedDataSourceItems
      const useMap = false
      const isGenerated = true
      const newAddedDataSourceItemRuntimeInfoMap = getInitialDataSourceItemRuntimeInfoMap(useMap, isGenerated, addedGeneratedDataSourceItems, dataSourceItemRuntimeInfoMap)
      mixinDataSourceItemRuntimeInfoMap(newAddedDataSourceItemRuntimeInfoMap)
    }

    const finalGeneratedImDataSourceItems = keptGeneratedImDataSourceItems.concat(addedGeneratedDataSourceItems)
    setGeneratedImDataSourceItems(finalGeneratedImDataSourceItems)
  }, [dsCountInAppState, allowGenerated, generatedImDataSourceItems, mixinDataSourceItemRuntimeInfoMap, setGeneratedImDataSourceItems, dataSourceItemRuntimeInfoMap])

  // need to check if some configDataSourceItems are added or some configDataSourceItems are removed
  // need to add new runtimeInfos for config DataSourceItems which doesn't have runtimeInfo
  React.useEffect(() => {
    // dataSourceItemsWithoutRuntimeInfo are new added data sources
    const dataSourceItemsWithoutRuntimeInfo = configDataSourceItems.filter(imDataSourceItem => {
      const uid = imDataSourceItem.uid
      const itemRuntimeInfo = dataSourceItemRuntimeInfoMap[uid]
      return !itemRuntimeInfo
    })

    if (dataSourceItemsWithoutRuntimeInfo.length > 0) {
      // add new runtimeInfos for config DataSourceItems which doesn't have runtimeInfo
      const useMap = false
      const isGenerated = false
      const runtimeInfoMapForNewDataSourceItems = getInitialDataSourceItemRuntimeInfoMap(useMap, isGenerated, dataSourceItemsWithoutRuntimeInfo, dataSourceItemRuntimeInfoMap)
      mixinDataSourceItemRuntimeInfoMap(runtimeInfoMapForNewDataSourceItems)
    }
  }, [configDataSourceItems, dataSourceItemRuntimeInfoMap, mixinDataSourceItemRuntimeInfoMap])

  const classNames = ['select-use-data-source-entry']

  if (className) {
    classNames.push(className)
  }

  const strFinalClassName = classNames.join(' ')

  return (
    <div className={strFinalClassName}>
      <SelectHeader
        config={config}
        widgetId={widgetId}
        mapWidgetId=''
        autoControlWidgetId={autoControlWidgetId}
        activeJimuMapView={null}
        setSelectByLoactionVisible={setSelectByLoactionVisible}
        allImDataSourceItems={allImDataSourceItems}
        dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
      />

      {
        shouldRenderSelectByLocation &&
        <SelectByLocation
          widgetId={widgetId}
          visible={isSelectByLoactionVisible}
          allImDataSourceItems={allImDataSourceItems}
          dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
          imSpatialSelection={spatialSelection}
          updateDataSourceItemRuntimeInfoForUid={updateDataSourceItemRuntimeInfoForUid}
        />
      }

      <SelectByFilter
        isRTL={isRTL}
        widgetId={widgetId}
        widgetDomRef={widgetDomRef}
        jimuMapView={null}
        enableDataAction={enableDataAction}
        allImDataSourceItems={allImDataSourceItems}
        generatedImDataSourceItems={generatedImDataSourceItems}
        configDataSourceItems={configDataSourceItems}
        dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
        updateDataSourceItemRuntimeInfoForUid={updateDataSourceItemRuntimeInfoForUid}
      />
    </div>
  )
}
