/** @jsx jsx */
import { React, hooks, jsx, css, type AllWidgetProps, type IMState, classNames, utils as jimuCoreUtils } from 'jimu-core'
import { defaultMessages as jimuUIMessages, WidgetPlaceholder, Loading } from 'jimu-ui'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import defaultMessages from './translations/default'
import UseDataSourceEntry from './components/use-data-source-entry'
import UseMapEntry from './components/use-map-entry'
import { WidgetDisplayMode, type ExtraSelectWidgetProps, type SelectWidgetProps, type DataSourceItemRuntimeInfoMap, type DataSourceItemRuntimeInfo } from './utils'
import { getConfigWithValidDataSourceItems } from '../utils'
import { type IMConfig } from '../config'
import selectWidgetIconSrc from '../../icon.svg'

const style = css`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  .nowrap {
    white-space: nowrap;
    text-wrap: nowrap;
  }

  .no-layers-panel-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-left: 50px;
    padding-right: 50px;
  }
`

const Widget = (props: SelectWidgetProps): React.ReactElement => {
  const {
    isRTL,
    widgetId,
    config
  } = props

  const {
    useMap,
    dataAttributeInfo,
    mapInfo
  } = config

  const translate = hooks.useTranslation(jimuUIMessages, defaultMessages)

  const widgetDomRef = React.useRef<HTMLDivElement>()
  const [widgetDisplayMode, setWidgetDisplayMode] = React.useState<WidgetDisplayMode>(WidgetDisplayMode.Placeholder)
  const widgetDisplayModeRef = React.useRef<WidgetDisplayMode>(widgetDisplayMode)
  widgetDisplayModeRef.current = widgetDisplayMode
  const alreadySetLoadingDisplayModeRef = React.useRef<boolean>(false)
  const timerRef = React.useRef<NodeJS.Timeout>(null)
  const [dataSourceItemRuntimeInfoMap, setDataSourceItemRuntimeInfoMap] = React.useState<DataSourceItemRuntimeInfoMap>({})

  const updateWidgetDisplayMode = React.useCallback((displayMode: WidgetDisplayMode) => {
    if (displayMode !== widgetDisplayModeRef.current) {
      if (displayMode === WidgetDisplayMode.Loading) {
        if (alreadySetLoadingDisplayModeRef.current) {
          // we have ever set loading display mode before, we only show loading mode one time
          return
        } else {
          alreadySetLoadingDisplayModeRef.current = true

          // only show loading for 20s, we will show NoLayersTip display mode if timeout
          if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
              if (widgetDisplayModeRef.current === WidgetDisplayMode.Loading) {
                setWidgetDisplayMode(WidgetDisplayMode.NoLayersTip)
              }
            }, 20000)
          }
        }
      }

      setWidgetDisplayMode(displayMode)
    }
  }, [])

  // clear timer when unmounted
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // mixin newly added runtimeInfoMap or updated runtimeInfoMap into dataSourceItemRuntimeInfoMap
  const mixinDataSourceItemRuntimeInfoMap = React.useCallback((updatedDataSourceItemRuntimeInfoMap: DataSourceItemRuntimeInfoMap) => {
    if (!updatedDataSourceItemRuntimeInfoMap || Object.keys(updatedDataSourceItemRuntimeInfoMap).length === 0) {
      return
    }

    setDataSourceItemRuntimeInfoMap(currDataSourceItemRuntimeInfoMap => {
      const newDataSourceItemRuntimeInfoMap = Object.assign({}, currDataSourceItemRuntimeInfoMap, updatedDataSourceItemRuntimeInfoMap)
      return newDataSourceItemRuntimeInfoMap
    })
  }, [setDataSourceItemRuntimeInfoMap])

  // udpate the DataSourceItemRuntimeInfo for the specific uid
  const updateDataSourceItemRuntimeInfoForUid = React.useCallback((uid: string, itemRuntimeInfoMixin: Partial<DataSourceItemRuntimeInfo>) => {
    setDataSourceItemRuntimeInfoMap((currDataSourceItemRuntimeInfoMap) => {
      const oldItemRuntimeInfo = currDataSourceItemRuntimeInfoMap[uid]

      if (!oldItemRuntimeInfo) {
        return
      }

      const newItemRuntimeInfo = Object.assign({}, oldItemRuntimeInfo, itemRuntimeInfoMixin)
      const newDataSourceItemRuntimeInfoMap = Object.assign({}, currDataSourceItemRuntimeInfoMap)
      newDataSourceItemRuntimeInfoMap[uid] = newItemRuntimeInfo
      return newDataSourceItemRuntimeInfoMap
    })
  }, [setDataSourceItemRuntimeInfoMap])

  // calculate current used uids from config
  // if usedMap is true, calculate it by config.mapInfo.jimuMapViews, otherwise calculate it by config.dataAttributeInfo
  const currentUsedConfigUids: string[] = React.useMemo(() => {
    let usedConfigUids: string[] = []

    if (useMap) {
      if (mapInfo && mapInfo.jimuMapViews) {
        const jimuMapViewIds = Object.keys(mapInfo.jimuMapViews)
        jimuMapViewIds.forEach(jimuMapViewId => {
          const dataSourceItems = mapInfo.jimuMapViews[jimuMapViewId]

          if (dataSourceItems && dataSourceItems.length > 0) {
            dataSourceItems.forEach(dataSourceItem => {
              const uid = dataSourceItem.uid

              if (uid) {
                usedConfigUids.push(uid)
              }
            })
          }
        })
      }
    } else {
      if (dataAttributeInfo && dataAttributeInfo.dataSourceItems?.length > 0) {
        dataAttributeInfo.dataSourceItems.forEach(imDataSourceItem => {
          const uid = imDataSourceItem.uid

          if (uid) {
            usedConfigUids.push(uid)
          }
        })
      }
    }

    // remove duplicate items
    usedConfigUids = Array.from(new Set(usedConfigUids))

    return usedConfigUids
  }, [useMap, mapInfo, dataAttributeInfo])

  const preUsedConfigUids: string[] = hooks.usePrevious(currentUsedConfigUids) || []

  // calculate the deleted used config uids by preUsedConfigUids and currentUsedConfigUids
  const { deleted: deletedUsedConfigUids } = jimuCoreUtils.diffArrays(true, preUsedConfigUids, currentUsedConfigUids)

  // remove the DataSourceItemRuntimeInfos of deletedUsedConfigUids from dataSourceItemRuntimeInfoMap
  React.useEffect(() => {
    if (deletedUsedConfigUids && deletedUsedConfigUids.length > 0) {
      setDataSourceItemRuntimeInfoMap((currDataSourceItemRuntimeInfoMap) => {
        const newDataSourceItemRuntimeInfoMap = Object.assign({}, currDataSourceItemRuntimeInfoMap)

        let changed = false

        deletedUsedConfigUids.forEach(deletedUid => {
          if (newDataSourceItemRuntimeInfoMap[deletedUid]) {
            // console.log(`delete uid, uid: ${newDataSourceItemRuntimeInfoMap[deletedUid].uid}, displayTitle: ${newDataSourceItemRuntimeInfoMap[deletedUid].displayTitle}`)
            delete newDataSourceItemRuntimeInfoMap[deletedUid]
            changed = true
          }
        })

        if (changed) {
          return newDataSourceItemRuntimeInfoMap
        } else {
          return currDataSourceItemRuntimeInfoMap
        }
      })
    }
  }, [deletedUsedConfigUids])

  const notShowPlaceHolder = widgetDisplayMode !== WidgetDisplayMode.Placeholder
  const rootClassName = classNames(['jimu-widget widget-select border-0'], { 'surface-1': notShowPlaceHolder })

  return (
    <div ref={widgetDomRef} className={rootClassName} css={style}>
      {/* use data source */}
      {
        !useMap &&
        <UseDataSourceEntry
          isRTL={isRTL}
          className={ widgetDisplayMode === WidgetDisplayMode.Normal ? '' : 'd-none'}
          widgetProps={props}
          widgetDomRef={widgetDomRef}
          dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
          mixinDataSourceItemRuntimeInfoMap={mixinDataSourceItemRuntimeInfoMap}
          updateDataSourceItemRuntimeInfoForUid={updateDataSourceItemRuntimeInfoForUid}
          updateWidgetDisplayMode={updateWidgetDisplayMode}
        />
      }

      {/* use map */}
      {
        useMap &&
        <UseMapEntry
          isRTL={isRTL}
          className={ widgetDisplayMode === WidgetDisplayMode.Normal ? '' : 'd-none'}
          widgetProps={props}
          widgetDomRef={widgetDomRef}
          dataSourceItemRuntimeInfoMap={dataSourceItemRuntimeInfoMap}
          mixinDataSourceItemRuntimeInfoMap={mixinDataSourceItemRuntimeInfoMap}
          updateDataSourceItemRuntimeInfoForUid={updateDataSourceItemRuntimeInfoForUid}
          updateWidgetDisplayMode={updateWidgetDisplayMode}
        />
      }

      {
        (widgetDisplayMode === WidgetDisplayMode.NoLayersTip) &&
        <div className='no-layers-panel w-100 h-100 d-flex align-items-center'>
          <div className='no-layers-panel-content w-100 h-100'>
            <InfoOutlined width={24} height={24} />
            <div className='mt-2 mb-2'>{translate('noLayersAvailableTip')}</div>
            {
              window.jimuConfig?.isInBuilder &&
              <div>{translate('openSettingPanelTip')}</div>
            }
            </div>
        </div>
      }

      {
        (widgetDisplayMode === WidgetDisplayMode.Loading) &&
        <Loading type="SECONDARY" />
      }

      {
        (widgetDisplayMode === WidgetDisplayMode.Placeholder) &&
        <WidgetPlaceholder
          widgetId={widgetId}
          icon={selectWidgetIconSrc}
          message={translate('_widgetLabel')}
        />
      }
    </div>
  )
}

Widget.mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): ExtraSelectWidgetProps => {
  let isRTL = false
  let dataSourceCount = 0
  let mapWidgetId = ''
  let autoControlWidgetId = ''

  const config = getConfigWithValidDataSourceItems(props.config, props.useDataSources) || props.config

  if (state.appContext?.isRTL) {
    isRTL = true
  }

  if (state.dataSourcesInfo) {
    dataSourceCount = Object.keys(state.dataSourcesInfo).length
  }

  const useMapWidgetIds = props.useMapWidgetIds

  if (useMapWidgetIds && useMapWidgetIds.length > 0) {
    mapWidgetId = useMapWidgetIds[0]
  }

  if (state.mapWidgetsInfo && mapWidgetId) {
    autoControlWidgetId = state.mapWidgetsInfo[mapWidgetId]?.autoControlWidgetId || ''
  }

  return {
    isRTL,
    dataSourceCount,
    mapWidgetId,
    autoControlWidgetId,
    config
  }
}

export default Widget
