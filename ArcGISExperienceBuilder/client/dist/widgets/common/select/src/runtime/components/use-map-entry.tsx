import { React, hooks, type ImmutableArray, Immutable, DataSourceManager, DataSourceTypes, type DataSource, utils as jimuCoreUtils } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView, type JimuLayerView, LayerTypes } from 'jimu-arcgis'
import SelectHeader from './select-header'
import SelectByFilter from './select-by-filter'
import SelectByLocation from './select-by-location'
import {
  WidgetDisplayMode, type UpdateWidgetDisplayMode, type SelectWidgetProps, type DataSourceItemRuntimeInfoMap, type WidgetDomRef,
  type UpdateDataSourceItemRuntimeInfoForUid, getInitialDataSourceItemRuntimeInfoMap, getImDataSourceItemForGeneratedDataSource,
  getReadyToDisplayRuntimeInfos
} from '../utils'
import { type DataSourceItem, type IMDataSourceItem } from '../../config'

export interface UseMapEntryProps {
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
 * Entry component when source radio 'Interact with a Map widget' is checked.
 */
export default function UseMapEntry (props: UseMapEntryProps) {
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
    mapWidgetId,
    autoControlWidgetId
  } = widgetProps

  const {
    mapInfo,
    spatialSelection
  } = config

  // By default, this.props.enableDataAction is undefined, which means enabled.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
  const enableDataAction = widgetProps.enableDataAction !== false
  const shouldRenderSelectByLocation = !!(spatialSelection?.enable)
  const jimuMapViewsConfig = mapInfo.jimuMapViews
  // make sure allowGenerated is boolean value, otherwise hooks.usePrevious(allowGenerated) maybe not work correctly
  const allowGenerated = !!(mapInfo.allowGenerated)
  // const mapWidgetId = useMapWidgetIds?.length > 0 ? useMapWidgetIds[0] : ''

  // isSelectByLoactionVisible is used to add d-none
  const [isSelectByLoactionVisible, setSelectByLoactionVisible] = React.useState<boolean>(false)
  const allowGeneratedRef = React.useRef<boolean>(allowGenerated)
  allowGeneratedRef.current = allowGenerated
  const preAllowGenerated = hooks.usePrevious(allowGenerated)
  const [activeJimuMapView, setActiveJimuMapView] = React.useState<JimuMapView>(null)
  const preActiveJimuMapView = hooks.usePrevious(activeJimuMapView)
  const activeJimuMapViewId = activeJimuMapView ? activeJimuMapView.id : ''

  // store generated data sources at runtime
  const [generatedImDataSourceItems, setGeneratedImDataSourceItems] = React.useState<ImmutableArray<DataSourceItem>>(Immutable([]))

  // updateGeneratedDataSourcesRef.current is updateGeneratedDataSources method
  const updateGeneratedDataSourcesRef = React.useRef<() => void>()
  // udpate generatedImDataSourceItems by allowGenerated and activeJimuMapView
  const updateGeneratedDataSources = React.useCallback(() => {
    // const currJimuMapView = activeJimuMapViewRef.current
    // const currJimuMapView = activeJimuMapView

    if (!allowGenerated || !activeJimuMapView) {
      if (generatedImDataSourceItems.length !== 0) {
        // switch from enable allowGenerated to disable allowGenerated
        setGeneratedImDataSourceItems(Immutable([]))
      }
      return
    }

    const dsManager = DataSourceManager.getInstance()
    const oldGeneratdDataSourceIds = generatedImDataSourceItems.map(item => item.useDataSource.dataSourceId).asMutable()
    const newGeneratdDataSourceIds: string[] = []

    const jimuFeatureOrSceneLayerViews = getAliveGeneratedFeatureLayerOrSceneLayerJimuLayerViews(activeJimuMapView)
    jimuFeatureOrSceneLayerViews.forEach(jimuFeatureOrSceneLayerView => {
      const layerDs = jimuFeatureOrSceneLayerView.getLayerDataSource()

      if (layerDs && (layerDs.type === DataSourceTypes.FeatureLayer || layerDs.type === DataSourceTypes.SceneLayer)) {
        newGeneratdDataSourceIds.push(layerDs.id)
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
          const jimuLayerView = activeJimuMapView.getJimuLayerViewByDataSourceId(ds.id)
          const jimuLayerViewId = jimuLayerView?.id
          const newImDataSourceItem = getImDataSourceItemForGeneratedDataSource(ds, jimuLayerViewId)
          addedGeneratedDataSourceItems.push(newImDataSourceItem)
        }
      })

      // add runtimeInfos for addedGeneratedDataSourceItems
      const useMap = true
      const isGenerated = true
      const newAddedDataSourceItemRuntimeInfoMap = getInitialDataSourceItemRuntimeInfoMap(useMap, isGenerated, addedGeneratedDataSourceItems, dataSourceItemRuntimeInfoMap)
      mixinDataSourceItemRuntimeInfoMap(newAddedDataSourceItemRuntimeInfoMap)
    }

    const finalGeneratedImDataSourceItems = keptGeneratedImDataSourceItems.concat(addedGeneratedDataSourceItems)
    setGeneratedImDataSourceItems(finalGeneratedImDataSourceItems)
  }, [activeJimuMapView, allowGenerated, dataSourceItemRuntimeInfoMap, generatedImDataSourceItems, mixinDataSourceItemRuntimeInfoMap])

  updateGeneratedDataSourcesRef.current = updateGeneratedDataSources

  // If allowGenerated changed, need to call updateGeneratedDataSources to update generatedImDataSourceItems
  React.useEffect(() => {
    // need to check if allowGenerated really changed because we will also go to here if updateGeneratedDataSources changed
    if (preAllowGenerated !== allowGenerated) {
      // allowGenerated changed
      if (updateGeneratedDataSourcesRef.current) {
        updateGeneratedDataSourcesRef.current()
      }
    }
  }, [preAllowGenerated, allowGenerated, updateGeneratedDataSourcesRef])

  // If activeJimuMapView changed
  // 1. Need to call updateGeneratedDataSources to update generatedImDataSourceItems
  // 2. Need to add JimuLayerViewCreated event listener
  React.useEffect(() => {
    // need to check if activeJimuMapView really changed because we will also go to here if updateGeneratedDataSources changed
    if (preActiveJimuMapView !== activeJimuMapView) {
      // active jimuMapView changed
      const jimuFeatureOrSceneLayerViews = getAliveGeneratedFeatureLayerOrSceneLayerJimuLayerViews(activeJimuMapView)
      const promises = jimuFeatureOrSceneLayerViews.map(jimuLayerView => {
        const layerDs = jimuLayerView.getLayerDataSource()

        if (layerDs) {
          return Promise.resolve(layerDs)
        } else {
          return jimuLayerView.createLayerDataSource()
        }
      })

      const p = Promise.all(promises)

      // some jimuLayerView.createLayerDataSource() (like SceneLayer without associated feature layer) will reject the promise,
      // it is as expected, so we call updateGeneratedDataSources() in the finally callback, not just in the then() callback.
      p.finally(() => {
        if (updateGeneratedDataSourcesRef.current) {
          updateGeneratedDataSourcesRef.current()
        }
      })
    }

    // add JimuLayerViewCreated event listener
    const jimuLayerViewCreatedListener = async (newJimuLayerView: JimuLayerView) => {
      // use isJimuLayerViewInMap(newJimuLayerView) to make sure the newJimuLayerView is alive
      if (allowGeneratedRef.current && newJimuLayerView && isGeneratedFeatureLayerOrSceneLayerJimuLayerView(newJimuLayerView) && isJimuLayerViewInMap(newJimuLayerView)) {
        let newDs: DataSource = newJimuLayerView.getLayerDataSource()

        if (!newDs) {
          try {
            newDs = await newJimuLayerView.createLayerDataSource()
          } catch (e) {
            console.error(`fail to create data source for JimuMapView ${newJimuLayerView.id}`, e)
          }
        }

        const isValidDs = newDs && (newDs.type === DataSourceTypes.FeatureLayer || newDs.type === DataSourceTypes.SceneLayer)

        if (isValidDs) {
          if (updateGeneratedDataSourcesRef.current) {
            updateGeneratedDataSourcesRef.current()
          }
        }
      }
    }

    let watchRemoveLayerHandle: __esri.Handle = null

    if (activeJimuMapView) {
      activeJimuMapView.addJimuLayerViewCreatedListener(jimuLayerViewCreatedListener)
      const layerCollection = activeJimuMapView.view?.map?.layers

      if (layerCollection) {
        watchRemoveLayerHandle = layerCollection.on('after-remove', (evt) => {
          const removedLayer = evt.item

          if (removedLayer) {
            const removedJimuLayerView = activeJimuMapView.getJimuLayerViewByAPILayer(removedLayer)

            // don't call isGeneratedFeatureLayerOrSceneLayerJimuLayerView(removedJimuLayerView) here, because removedJimuLayerView maybe the parent of JimuFeatureLayerView
            if (removedJimuLayerView && removedJimuLayerView.fromRuntime) {
              if (updateGeneratedDataSourcesRef.current) {
                updateGeneratedDataSourcesRef.current()
              }
            }
          }
        })
      }
    }

    return () => {
      if (activeJimuMapView) {
        activeJimuMapView.removeJimuLayerViewCreatedListener(jimuLayerViewCreatedListener)
      }

      if (watchRemoveLayerHandle) {
        watchRemoveLayerHandle.remove()
        watchRemoveLayerHandle = null
      }
    }
  }, [preActiveJimuMapView, activeJimuMapView, updateGeneratedDataSourcesRef])

  // update generated layers when remove the generated data source
  // In the above, by listening to the layer-add event and layer-remove event, most cases of generated layers can be correctly handled.
  // In addition to listening to layer-remove envent, we also need to listen to ds-remove event. Because if ds is deleted by Add Data, but the layer is not deleted, then the layer still cannot select features.
  React.useEffect(() => {
    if (updateGeneratedDataSourcesRef.current) {
      updateGeneratedDataSourcesRef.current()
    }
  }, [dsCountInAppState])

  // configDataSourceItems for current active jimuMapView
  const activeConfigDataSourceItems = React.useMemo(() => {
    let resultActiveConfigDataSourceItems: Immutable.ImmutableArray<DataSourceItem> = null

    if (jimuMapViewsConfig && activeJimuMapViewId) {
      const tempConfigDataSourceItems = jimuMapViewsConfig[activeJimuMapViewId]

      if (tempConfigDataSourceItems && tempConfigDataSourceItems.length > 0) {
        resultActiveConfigDataSourceItems = tempConfigDataSourceItems
      }
    }

    if (!resultActiveConfigDataSourceItems) {
      resultActiveConfigDataSourceItems = Immutable([])
    }

    return resultActiveConfigDataSourceItems
  }, [activeJimuMapViewId, jimuMapViewsConfig])

  // generatedImDataSourceItems + configDataSourceItems
  const allImDataSourceItems = React.useMemo(() => {
    return generatedImDataSourceItems.concat(activeConfigDataSourceItems)
  }, [activeConfigDataSourceItems, generatedImDataSourceItems])

  // update widgetDisplayMode
  React.useEffect(() => {
    let newDisplayMode: WidgetDisplayMode = null

    if (mapWidgetId) {
      let allViewConfigItemsCount: number = 0

      if (jimuMapViewsConfig) {
        Object.values(jimuMapViewsConfig).forEach(items => {
          if (items && items.length > 0) {
            allViewConfigItemsCount += items.length
          }
        })
      }

      if (generatedImDataSourceItems.length === 0 && allViewConfigItemsCount === 0) {
        newDisplayMode = WidgetDisplayMode.NoLayersTip
      } else {
        if (activeJimuMapViewId) {
          // map view is loaded
          if (allImDataSourceItems.length > 0) {
            const readyToDisplayRuntimeInfos = getReadyToDisplayRuntimeInfos(allImDataSourceItems, dataSourceItemRuntimeInfoMap)

            if (readyToDisplayRuntimeInfos.length > 0) {
              newDisplayMode = WidgetDisplayMode.Normal
            } else {
              newDisplayMode = WidgetDisplayMode.Loading
            }
          } else {
            newDisplayMode = WidgetDisplayMode.NoLayersTip
          }
        } else {
          // map view is loading
          newDisplayMode = WidgetDisplayMode.Loading
        }
      }
    } else {
      // show placeholder if don't set mapWidgetId or the map widget is removed
      newDisplayMode = WidgetDisplayMode.Placeholder
    }

    updateWidgetDisplayMode(newDisplayMode)
  }, [activeJimuMapViewId, allImDataSourceItems, dataSourceItemRuntimeInfoMap, generatedImDataSourceItems.length, jimuMapViewsConfig, updateWidgetDisplayMode, mapWidgetId])

  // need to check if some activeConfigDataSourceItems are added or some activeConfigDataSourceItems are removed
  // need to add new runtimeInfos for config DataSourceItems which doesn't have runtimeInfo
  React.useEffect(() => {
    // dataSourceItemsWithoutRuntimeInfo are new added data sources
    const dataSourceItemsWithoutRuntimeInfo = activeConfigDataSourceItems.filter(imDataSourceItem => {
      const uid = imDataSourceItem.uid
      const itemRuntimeInfo = dataSourceItemRuntimeInfoMap[uid]
      return !itemRuntimeInfo
    })

    if (dataSourceItemsWithoutRuntimeInfo.length > 0) {
      // add new runtimeInfos for config DataSourceItems which doesn't have runtimeInfo
      const useMap = true
      const isGenerated = false
      const runtimeInfoMapForNewDataSourceItems = getInitialDataSourceItemRuntimeInfoMap(useMap, isGenerated, dataSourceItemsWithoutRuntimeInfo, dataSourceItemRuntimeInfoMap)
      mixinDataSourceItemRuntimeInfoMap(runtimeInfoMapForNewDataSourceItems)
    }
  }, [activeConfigDataSourceItems, dataSourceItemRuntimeInfoMap, mixinDataSourceItemRuntimeInfoMap])

  const onActiveViewChange = React.useCallback((newActiveJimuMapView: JimuMapView) => {
    setActiveJimuMapView(newActiveJimuMapView)
  }, [setActiveJimuMapView])

  const classNames = ['select-use-map-entry']

  if (className) {
    classNames.push(className)
  }

  const strFinalClassName = classNames.join(' ')

  return (
    <div className={strFinalClassName}>
      {
        mapWidgetId &&
        <JimuMapViewComponent
          useMapWidgetId={mapWidgetId}
          onActiveViewChange={onActiveViewChange}
        />
      }

      <SelectHeader
        config={config}
        widgetId={widgetId}
        mapWidgetId={mapWidgetId}
        autoControlWidgetId={autoControlWidgetId}
        activeJimuMapView={activeJimuMapView}
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
        jimuMapView={activeJimuMapView}
        enableDataAction={enableDataAction}
        allImDataSourceItems={allImDataSourceItems}
        generatedImDataSourceItems={generatedImDataSourceItems}
        configDataSourceItems={activeConfigDataSourceItems}
        dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
        updateDataSourceItemRuntimeInfoForUid={updateDataSourceItemRuntimeInfoForUid}
      />
    </div>
  )
}

function getAliveGeneratedFeatureLayerOrSceneLayerJimuLayerViews (jimuMapView: JimuMapView): JimuLayerView[] {
  const jimuLayerViews: JimuLayerView[] = []

  if (jimuMapView) {
    Object.values(jimuMapView.jimuLayerViews).forEach(jimuLayerView => {
      // If isJimuLayerViewInMap(jimuLayerView) returns true, means jimuLayerView is alive.
      if (jimuLayerView && isGeneratedFeatureLayerOrSceneLayerJimuLayerView(jimuLayerView) && isJimuLayerViewInMap(jimuLayerView)) {
        jimuLayerViews.push(jimuLayerView)
      }
    })
  }

  return jimuLayerViews
}

function isGeneratedFeatureLayerOrSceneLayerJimuLayerView (jimuLayerView: JimuLayerView): boolean {
  const isValid = !!(jimuLayerView && jimuLayerView.fromRuntime && (jimuLayerView.type === LayerTypes.FeatureLayer || jimuLayerView.type === LayerTypes.SceneLayer))
  return isValid
}

function isJimuLayerViewInMap (jimuLayerView: JimuLayerView): boolean {
  if (jimuLayerView) {
    const jimuMapView = jimuLayerView.getJimuMapView()
    const layers = jimuMapView?.view?.map?.layers?.toArray() || []

    const rootJimuLayerView = getRootJimuLayerView(jimuLayerView)
    const rootLayer = rootJimuLayerView?.layer

    if (layers?.length > 0 && rootLayer) {
      return layers.includes(rootLayer)
    }
  }

  return false
}

function getRootJimuLayerView (jimuLayerView: JimuLayerView): JimuLayerView {
  let rootJimuLayerView: JimuLayerView = null

  if (jimuLayerView) {
    const jimuMapView = jimuLayerView.getJimuMapView()

    if (jimuMapView) {
      const parentJimuLayerViews = jimuMapView.getParentJimuLayerViews(jimuLayerView.id)

      if (parentJimuLayerViews.length > 0) {
        // the last one is the root JimuLayerView
        rootJimuLayerView = parentJimuLayerViews[parentJimuLayerViews.length - 1]
      } else {
        // no parents, use self as root JimuLayerView
        rootJimuLayerView = jimuLayerView
      }
    }
  }

  return rootJimuLayerView
}
