/** @jsx jsx */
import { React, hooks, jsx, css, DataSourceManager, Immutable, uuidv1, classNames, type ImmutableArray, type UseDataSource, utils as jimuCoreUtils } from 'jimu-core'
import { type JimuMapView, type JimuLayerView, type JimuFeatureLayerView, type JimuSceneLayerView, LayerTypes } from 'jimu-arcgis'
import { defaultMessages as jimuUIMessages, Button, Tooltip, Loading } from 'jimu-ui'
import { DataMapOutlined } from 'jimu-icons/outlined/gis/data-map'
import { DataSceneOutlined } from 'jimu-icons/outlined/gis/data-scene'
import { SettingOutlined } from 'jimu-icons/outlined/application/setting'
import { DownOutlined } from 'jimu-icons/outlined/directional/down'
import { UpOutlined } from 'jimu-icons/outlined/directional/up'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'
import { SettingRow, SidePopper, JimuLayerViewSelector } from 'jimu-ui/advanced/setting-components'
import { List, type TreeItemType, type CommandType, type CommandActionDataType, type _TreeItem } from 'jimu-ui/basic/list-tree'
import LayerItemDetail from './layer-item-detail'
import defaultMessages from '../translations/default'
import { type DataSourceItem, type IMDataSourceItem } from '../../config'
import selectByAttributeIconSrc from 'jimu-icons/svg/outlined/application/attribute.svg'

interface MapLayersSettingProps {
  jimuMapView: JimuMapView
  enableAttributeSelection: boolean
  dataSourceItems: DataSourceItem[]
  onDataSourceItemsChange: (jimuMapViewId: string, newIMDataSourceItems: ImmutableArray<DataSourceItem>) => void
}

export type SelectableJimuLayerView = JimuFeatureLayerView | JimuSceneLayerView

const style = css`
  .map-layers-header-setting-row.jimu-widget-setting--row-label {
    margin-top: 0 !important;
  }

  .map-layers-header-setting-row {
    width: calc(100% - 22px);
    max-width: calc(100% - 22px);

    .jimu-widget-setting--row-label {
      width: 100%;
      flex-basis: 100%;
      flex-shrink: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .map-title-icon-container {
      flex-wrap: no-wrap;
      flex-shrink: 0;
      flex-grow: 0;

      .setting-loading-container {
        position: relative;
        height: 16px;
        width: 16px;
  
        .donut-loading {
          width: 16px !important;
          height: 16px !important;
          left: 0 !important;
          right: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
        }
      }
    }
  }
`

/**
 * Select layers and configure filters for one JimuMapView.
 */
export default function MapLayersSetting (props: MapLayersSettingProps) {
  const {
    jimuMapView,
    enableAttributeSelection,
    dataSourceItems,
    onDataSourceItemsChange
  } = props

  const translate = hooks.useTranslation(jimuUIMessages, defaultMessages)

  const mapDataSource = DataSourceManager.getInstance().getDataSource(jimuMapView.dataSourceId)
  const mapDataSourceLabel = mapDataSource?.getLabel() || ''

  const jimuMapViewId = jimuMapView.id
  const jimuMapViewIdRef = React.useRef<string>(jimuMapViewId)
  jimuMapViewIdRef.current = jimuMapViewId
  const isWebScene = jimuMapView.view?.type === '3d'

  // isLayersAndDataSourcesLoaded is true means all JimuLayerViews loaded and all related data sources of the JimuLayerViews are created
  const [isLayersAndDataSourcesLoaded, setIsLayersAndDataSourcesLoaded] = React.useState<boolean>(false)

  // If dataSourceItems is undefined, means it is first opened.
  const isFirstConfigure = !dataSourceItems
  const isFirstConfigureRef = React.useRef<boolean>(isFirstConfigure)
  isFirstConfigureRef.current = isFirstConfigure

  // dataSourceItems maybe undefined, so need to wrap it with imDataSourceItems, the following code should use imDataSourceItems instead of dataSourceItems
  const imDataSourceItems = React.useMemo(() => {
    return Immutable(dataSourceItems || [])
  }, [dataSourceItems])

  const configuredJimuLayerViewIds = React.useMemo(() => {
    const newConfiguredJimuLayerViewIds: string[] = []
    imDataSourceItems.forEach(dataSourceItem => {
      newConfiguredJimuLayerViewIds.push(dataSourceItem.jimuLayerViewId)
    })
    return newConfiguredJimuLayerViewIds
  }, [imDataSourceItems])

  const [isJimuLayerViewSelectorSidePopperOpened, setIsJimuLayerViewSelectorSidePopperOpened] = React.useState<boolean>(false)
  const mapLayersSettingBtnRef = React.useRef<HTMLButtonElement>(null)

  // allSelectableJimuLayerViews means the JimuLayerViews that have data source and not generated at runtime
  const [allSelectableJimuLayerViews, setAllSelectableJimuLayerViews] = React.useState<SelectableJimuLayerView[]>([])
  const [currentJimuLayerViewIdToShowDetail, setCurrentJimuLayerViewIdToShowDetail] = React.useState<string>('')

  // const allSelectableJimuLayerViewIds = React.useMemo(() => {
  //   return allSelectableJimuLayerViews.map(jimuLayerView => jimuLayerView.id)
  // }, [allSelectableJimuLayerViews])

  // all JimuLayerViews that can show in JimuLayerViewSelector, include FeatureJimuLayerView/SceneJimuLayerView and their ancestor JimuLayerViews
  const allAvailableJimuLayerViewIdsObjForJimuLayerViewSelector = React.useMemo(() => {
    const jimuLayerViewIdsObj: { [jimuLayerViewId: string]: boolean } = {}

    allSelectableJimuLayerViews.forEach(leafJimuLayerView => {
      jimuLayerViewIdsObj[leafJimuLayerView.id] = true
      const ancestorJimuLayerViews = leafJimuLayerView.getAllAncestorJimuLayerViews()
      ancestorJimuLayerViews.forEach(ancestorJimuLayerView => {
        jimuLayerViewIdsObj[ancestorJimuLayerView.id] = true
      })
    })

    return jimuLayerViewIdsObj
  }, [allSelectableJimuLayerViews])

  const currentLayerItemToShowDetail = React.useMemo(() => {
    if (currentJimuLayerViewIdToShowDetail) {
      return imDataSourceItems.find(layerItem => layerItem.jimuLayerViewId === currentJimuLayerViewIdToShowDetail)
    }

    return null
  }, [currentJimuLayerViewIdToShowDetail, imDataSourceItems])

  // update data source items to config, this method will also sort the data source items by map layers order
  const updateDataSourceItemsConfig = React.useCallback((newDataSourceItems: DataSourceItem[]) => {
    const sortedNewDataSourceItems = sortDataSourceItemsByLayersOrder(jimuMapView, newDataSourceItems)
    const imSortedNewDataSourceItems = Immutable(sortedNewDataSourceItems)
    onDataSourceItemsChange(jimuMapView.id, imSortedNewDataSourceItems)
  }, [jimuMapView, onDataSourceItemsChange])
  const updateDataSourceItemsConfigRef = React.useRef<typeof updateDataSourceItemsConfig>()
  updateDataSourceItemsConfigRef.current = updateDataSourceItemsConfig

  const [isLayerListVisible, setIsLayerListVisible] = React.useState<boolean>(false)

  // callback when click list item
  const onClickListItem = React.useCallback((refComponent: _TreeItem) => {
    // LayerItemDetail component is used to configure sqlExpression and sqlHint,
    // so it is only available when the global enableAttributeSelection is true.
    if (enableAttributeSelection) {
      const itemJsons = refComponent?.props?.itemJsons
      const itemJson = itemJsons?.length > 0 ? itemJsons[0] : null

      if (itemJson) {
        const jimuLayerViewId = itemJson.itemKey
        setCurrentJimuLayerViewIdToShowDetail(jimuLayerViewId)
      }
    }
  }, [enableAttributeSelection])

  // configured items in config
  const listItemsJson = React.useMemo((): TreeItemType[] => {
    const result: TreeItemType[] = []

    imDataSourceItems.forEach(imDataSourceItem => {
      const {
        jimuLayerViewId,
        sqlExpression
      } = imDataSourceItem

      if (!jimuLayerViewId) {
        return
      }

      const jimuLayerView = allSelectableJimuLayerViews.find(item => item.id === jimuLayerViewId)

      if (!jimuLayerView) {
        return
      }

      const itemStateChecked = !!(jimuLayerViewId && jimuLayerViewId === currentJimuLayerViewIdToShowDetail)
      const itemStateDisabled = !enableAttributeSelection
      const layerTitle = jimuLayerView.layer?.title || ''

      let commands: CommandType[] = []

      const hasSql = sqlExpression?.parts?.length > 0

      if (hasSql) {
        // only show sql icon when user has configured sqlExpression
        commands = [
          {
            label: '',

            // IconComponentProps
            iconProps: {
              icon: selectByAttributeIconSrc,
              size: 16
            },

            action: ({ data }: CommandActionDataType) => {
              onClickListItem(data?.refComponent)
            }
          }
        ]
      }

      const treeItem: TreeItemType = {
        itemKey: jimuLayerViewId,
        itemStateChecked,
        itemStateDisabled,
        itemStateTitle: layerTitle,
        itemStateCommands: commands
      }

      result.push(treeItem)
    })

    return result
  }, [allSelectableJimuLayerViews, currentJimuLayerViewIdToShowDetail, enableAttributeSelection, onClickListItem, imDataSourceItems])

  // wait for all JimuLayerViews loaded and all related data sources of the JimuLayerViews are created
  React.useEffect(() => {
    async function getJimuLayerViews () {
      const thisJimuMapViewId = jimuMapView.id
      const allJimuLayerViewsObj = await jimuMapView.whenAllJimuLayerViewLoaded()
      const allJimuLayerViews: JimuLayerView[] = Object.values(allJimuLayerViewsObj)
      const allJimuFeatureLayerViewsOrJimuSceneLayerViews: SelectableJimuLayerView[] = allJimuLayerViews.filter(jimuLayerView => {
        return (!jimuLayerView.fromRuntime) && (jimuLayerView.type === LayerTypes.FeatureLayer || jimuLayerView.type === LayerTypes.SceneLayer)
      }) as SelectableJimuLayerView[]

      // only filter the JimuLayerView that has data source
      const promises = allJimuFeatureLayerViewsOrJimuSceneLayerViews.map(jimuLayerView => jimuLayerView.createLayerDataSource())

      try {
        await Promise.all(promises)
      } catch (e) {
        // some SceneLayer can't create data source, it is as expected, just log it
        console.log(e)
      }

      // If the Map widget has two web maps, there will be two MapLayersSetting instances.
      // In Builder, both JimuLayerViews and data sources are created by default, then the above aysnc code logic just take little time (about 20ms).
      // So the two MapLayersSetting instances run here almost at the same time, and they call updateDataSourceItemsConfigRef.current(dataSourceItems) at the same time,
      // and they call onDataSourceItemsChange almost at the same time.
      // By test, MapLayersSetting1 calls onDataSourceItemsChange at time1, and MapLayersSetting2 calls onDataSourceItemsChange at (time1 + 3ms).
      // Calling onDataSourceItemsChange will update the config.
      // Here is the expected workflow:
      // MapLayersSetting1 (webmap1) calls onDataSourceItemsChange: config -> config1, config1.mapInfo.jimuMapViews only includes layer items of webmap1
      // MapLayersSetting2 (webmap2) calls onDataSourceItemsChange: config1 -> config2, config2 merge config1, config2.mapInfo.jimuMapViews includes layer items of both webmap1 and webmap2

      // Here is the real workflow:
      // MapLayersSetting1 (webmap1) calls onDataSourceItemsChange: config -> config1, config1.mapInfo.jimuMapViews only includes layer items of webmap1
      // MapLayersSetting2 (webmap2) calls onDataSourceItemsChange: config -> config2, config2 repalce config1, config2.mapInfo.jimuMapViews only includes layer items of webmap2

      // To solve the above issue, we need to increase the time interval between MapLayersSetting2.onDataSourceItemsChange and MapLayersSetting1.onDataSourceItemsChange.
      if (!jimuMapView.isActive) {
        // By test, the duration of MapLayersSetting2.onDataSourceItemsChange and MapLayersSetting1.onDataSourceItemsChange is about 3ms, we use 500ms for safety.
        await waitTime(500)
      }

      const newSelectableJimuLayerViews: SelectableJimuLayerView[] = allJimuFeatureLayerViewsOrJimuSceneLayerViews.filter(jimuLayerView => !!jimuLayerView.getLayerDataSource())

      // need to check if the current view is changed
      if (jimuMapViewIdRef.current === thisJimuMapViewId) {
        setAllSelectableJimuLayerViews(newSelectableJimuLayerViews)
        setIsLayersAndDataSourcesLoaded(true)

        if (isFirstConfigureRef.current) {
          // When user first connect to the jimuLayerView, need to save all queryable JimuFeatureLayerView/JimuSceneLayerViews into config by default.
          const dataSourceItems: DataSourceItem[] = newSelectableJimuLayerViews.map(jimuLayerView => getDataSourceItemByJimuLayerView(jimuLayerView))

          if (updateDataSourceItemsConfigRef.current) {
            updateDataSourceItemsConfigRef.current(dataSourceItems)
          }
        }
      }
    }

    getJimuLayerViews()
  }, [jimuMapView])

  const onMapLayersSettingBtnClicked = React.useCallback(() => {
    setIsJimuLayerViewSelectorSidePopperOpened(true)
  }, [])

  const onToggleLayerListBtnClicked = React.useCallback(() => {
    setIsLayerListVisible(visible => !visible)
  }, [])

  const onLayerItemDetailPopperToggle = React.useCallback(() => {
    setCurrentJimuLayerViewIdToShowDetail('')
  }, [setCurrentJimuLayerViewIdToShowDetail])

  // sqlExpression or sqlHint changed for one dataSourceItem
  const onLayerItemDetailUpdate = React.useCallback((newImDataSourceItem: IMDataSourceItem) => {
    const newImDataSourceItems = imDataSourceItems.map((item) => {
      if (item.jimuLayerViewId === newImDataSourceItem.jimuLayerViewId) {
        return newImDataSourceItem
      } else {
        return item
      }
    }) as unknown as ImmutableArray<DataSourceItem>

    onDataSourceItemsChange(jimuMapViewId, newImDataSourceItems)
  }, [imDataSourceItems, jimuMapViewId, onDataSourceItemsChange])

  const onJimuLayerViewSelectorSidePopperToggle = React.useCallback(() => {
    setIsJimuLayerViewSelectorSidePopperOpened(false)
  }, [])

  // Hide the JimuLayerViews that not in allAvailableJimuLayerViewIdsObjForJimuLayerViewSelector.
  const jimuLayerViewSelectorHideLayers = React.useCallback((jimuLayerView: JimuLayerView) => {
    const jimuLayerViewId = jimuLayerView.id
    return !allAvailableJimuLayerViewIdsObjForJimuLayerViewSelector[jimuLayerViewId]
  }, [allAvailableJimuLayerViewIdsObjForJimuLayerViewSelector])

  // If JimuLayerView is not in allSelectableJimuLayerViews, disable selecting in JimuLayerViewSelector.
  const jimuLayerViewSelectorDisableLayers = React.useCallback((jimuLayerView: JimuLayerView) => {
    return !allSelectableJimuLayerViews.includes(jimuLayerView as SelectableJimuLayerView)
  }, [allSelectableJimuLayerViews])

  // JimuLayerViewSelector change
  const onJimuLayerViewSelectorChange = (newSelectedJimuLayerViewIds: string[]) => {
    newSelectedJimuLayerViewIds = Array.from(new Set(newSelectedJimuLayerViewIds))
    const allSelectableJimuLayerViewIds = allSelectableJimuLayerViews.map(jimuLayerView => jimuLayerView.id)
    let { saved: intersectionJimuLayerViewIds } = jimuCoreUtils.diffArrays(true, allSelectableJimuLayerViewIds, newSelectedJimuLayerViewIds)
    intersectionJimuLayerViewIds = Array.from(new Set(intersectionJimuLayerViewIds))

    const dataSourceItemsObj: { [key: string]: DataSourceItem } = {}

    imDataSourceItems.forEach(imDataSourceItem => {
      const jimuLayerViewId = imDataSourceItem.jimuLayerViewId
      dataSourceItemsObj[jimuLayerViewId] = imDataSourceItem.asMutable() as unknown as DataSourceItem
    })

    const newDataSourceItems: DataSourceItem[] = []

    intersectionJimuLayerViewIds.forEach(jimuLayerViewId => {
      let dataSourceItem = dataSourceItemsObj[jimuLayerViewId]

      if (!dataSourceItem) {
        // the jimuLayerViewId is newly selected
        if (jimuMapView) {
          const jimuLayerView = jimuMapView.jimuLayerViews[jimuLayerViewId]

          if (jimuLayerView) {
            dataSourceItem = getDataSourceItemByJimuLayerView(jimuLayerView)
          }
        }
      }

      if (dataSourceItem) {
        newDataSourceItems.push(dataSourceItem)
      }
    })

    updateDataSourceItemsConfig(newDataSourceItems)
  }

  const jimuLayerViewSelectorSidePopperTrigger: HTMLElement[] = []

  if (mapLayersSettingBtnRef.current) {
    jimuLayerViewSelectorSidePopperTrigger.push(mapLayersSettingBtnRef.current)
  }

  return (
    <div className='map-layers-setting' css={style}>
      <div className='map-layers-header w-100 d-flex align-items-center mt-4'>
        {
          isWebScene && <DataSceneOutlined className='mr-2' />
        }

        {
          !isWebScene && <DataMapOutlined className='mr-2' />
        }

        <SettingRow
          flow='no-wrap'
          className='map-layers-header-setting-row w-100'
          label={mapDataSourceLabel}
          aria-label={mapDataSourceLabel}
        >
          <div className='map-title-icon-container d-flex align-items-center'>
            {
              !isLayersAndDataSourcesLoaded &&
              <div className='setting-loading-container'>
                <Loading type="DONUT" />
              </div>
            }

            {
              isLayersAndDataSourcesLoaded && allSelectableJimuLayerViews.length === 0 &&
              <Tooltip title={translate('noAvailableLayers')} showArrow={false} placement='top'>
                <span>
                  <Button
                    className='border-0'
                    disabled={!isLayersAndDataSourcesLoaded}
                    type='tertiary'
                    icon={true}
                    size='sm'
                  >
                    <WarningOutlined
                      size={16}
                      color={'var(--warning-600)'}
                    />
                  </Button>
                </span>
              </Tooltip>
            }

            {
              isLayersAndDataSourcesLoaded && allSelectableJimuLayerViews.length > 0 &&
              <Tooltip title={translate('customizeLayers')} showArrow={false} placement='top'>
                <span>
                  <Button
                    ref={mapLayersSettingBtnRef}
                    className='map-layers-setting-btn mr-1 p-0 border-0'
                    disabled={!isLayersAndDataSourcesLoaded}
                    type='tertiary'
                    icon={true}
                    size='sm'
                    onClick={onMapLayersSettingBtnClicked}
                  >
                    <SettingOutlined
                      size={16}
                    />
                  </Button>
                </span>
              </Tooltip>
            }

            {
              isLayersAndDataSourcesLoaded && allSelectableJimuLayerViews.length > 0 &&
              <Button
                className='layer-list-toggle-btn p-0 border-0'
                type='tertiary'
                icon={true}
                size='sm'
                onClick={onToggleLayerListBtnClicked}
              >
                {
                  isLayerListVisible &&
                  <UpOutlined
                    size={16}
                  />
                }

                {
                  !isLayerListVisible &&
                  <DownOutlined
                    size={16}
                  />
                }
              </Button>
            }
          </div>
        </SettingRow>
      </div>

      <List
        className={classNames(['w-100 mt-1', { 'd-none': !isLayerListVisible }])}
        dndEnabled={false}
        showCheckbox={false}
        itemsJson={listItemsJson}
        onClickItemBody={(actionData, refComponent) => {
          onClickListItem(refComponent)
        }}
      />

      {
        isJimuLayerViewSelectorSidePopperOpened &&
        <SidePopper
          isOpen={true}
          toggle={onJimuLayerViewSelectorSidePopperToggle}
          position='right'
          trigger={jimuLayerViewSelectorSidePopperTrigger}
          title={translate('customizeLayers')}
        >
          <SettingRow
            className='w-100 pl-4 pr-4'
            label={mapDataSourceLabel}
            aria-label={mapDataSourceLabel}
          ></SettingRow>

          {/* Need to use a div to wrapper JimuLayerViewSelector to fix the scrollbar issue. */}
          <div className='select-jimu-layer-view-selector-container p-4'>
            <JimuLayerViewSelector
              jimuMapViewId={jimuMapViewId}
              isMultiSelection={true}
              defaultSelectedValues={configuredJimuLayerViewIds.slice()}
              hideLayers={jimuLayerViewSelectorHideLayers}
              disableLayers={jimuLayerViewSelectorDisableLayers}
              onChange={onJimuLayerViewSelectorChange}
            />
          </div>
        </SidePopper>
      }

      {
        (jimuMapView && currentLayerItemToShowDetail) &&
        <SidePopper
          isOpen={true}
          toggle={onLayerItemDetailPopperToggle}
          position='right'
          trigger={[]}
          title={translate('configureLayerAttribute')}
        >
          <LayerItemDetail
            jimuMapView={jimuMapView}
            currentDataSourceItem={currentLayerItemToShowDetail}
            onLayerItemDetailUpdate={onLayerItemDetailUpdate}
          />
        </SidePopper>
      }
    </div>
  )
}

function getDataSourceItemByJimuLayerView (jimuLayerView: JimuLayerView): DataSourceItem {
  const uid = uuidv1()
  const useDataSource = getUseDataSourceByJimuLayerView(jimuLayerView)
  const jimuLayerViewId = jimuLayerView.id

  const dataSourceItem: DataSourceItem = {
    uid,
    sqlHint: '',
    useDataSource,
    sqlExpression: null,
    jimuLayerViewId
  }

  return dataSourceItem
}

function getUseDataSourceByJimuLayerView (jimuLayerView: JimuLayerView): UseDataSource {
  const ds = jimuLayerView.getLayerDataSource()
  const dsId = ds.id
  const mainDs = ds.getMainDataSource()
  const rootDs = ds.getRootDataSource()
  const mainDataSourceId = mainDs ? mainDs.id : dsId
  const rootDsId = rootDs ? rootDs.id : ''

  const useDataSource: UseDataSource = {
    dataSourceId: dsId,
    mainDataSourceId,
    rootDataSourceId: rootDsId
  }

  return useDataSource
}

/**
 * Sort DataSourceItems by layers order.
 * @param jimuMapView
 * @param dataSourceItems
 * @returns
 */
function sortDataSourceItemsByLayersOrder (jimuMapView: JimuMapView, dataSourceItems: DataSourceItem[]): DataSourceItem[] {
  const sortedDataSourceItems = dataSourceItems.slice()

  if (jimuMapView) {
    sortedDataSourceItems.sort((dataSourceItem1, dataSourceItem2) => {
      const hierarchyLevel1 = getJimuLayerViewHierarchyLevelByDataSourceItem(jimuMapView, dataSourceItem1)
      const hierarchyLevel2 = getJimuLayerViewHierarchyLevelByDataSourceItem(jimuMapView, dataSourceItem2)

      if (hierarchyLevel1 && hierarchyLevel2) {
        return compareVersion(hierarchyLevel1, hierarchyLevel2)
      }

      return 0
    })
  }

  return sortedDataSourceItems
}

function getJimuLayerViewHierarchyLevelByDataSourceItem (jimuMapView: JimuMapView, dataSourceItem: DataSourceItem): string {
  let jimuLayerViewLevel = ''

  if (jimuMapView && dataSourceItem) {
    const jimuLayerViewId = dataSourceItem.jimuLayerViewId

    if (jimuLayerViewId) {
      const jimuLayerView = jimuMapView.jimuLayerViews[jimuLayerViewId]

      if (jimuLayerView) {
        jimuLayerViewLevel = jimuLayerView.hierarchyLevel
      }
    }
  }

  return jimuLayerViewLevel
}

/**
 * If version1 < version2, return -1.
 * If version1 > version2, return 1.
 * If version1 == version2, return 0.
 * @param version1 like '0.3.4'
 * @param version2 liek '1.4.5.3'
 * @returns
 */
function compareVersion (version1: string, version2: string) {
  const nums1 = version1.split('.').map(item => parseInt(item))
  const nums2 = version2.split('.').map(item => parseInt(item))

  while (nums1.length > 0 && nums2.length > 0) {
    const num1 = nums1.shift()
    const num2 = nums2.shift()

    if (num1 < num2) {
      return -1
    } else if (num1 > num2) {
      return 1
    }
  }

  if (nums1.length > 0) {
    return 1
  }

  if (nums2.length > 0) {
    return -1
  }

  return 0
}

function waitTime (ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
