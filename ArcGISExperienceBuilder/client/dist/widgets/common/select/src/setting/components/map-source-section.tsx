/** @jsx jsx */
import { React, hooks, jsx, type ImmutableArray } from 'jimu-core'
import defaultMessages from '../translations/default'
import { defaultMessages as jimuUIMessages, Alert } from 'jimu-ui'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { MapWidgetSelector, SettingRow } from 'jimu-ui/advanced/setting-components'
import TitleWithSwitch from './title-with-switch'
import MapLayersSetting from './map-layers-setting'
import Placeholder from './placeholder'
import { type RootSettingProps, getUseDataSourcesByConfig } from '../utils'
import { type DataSourceItem } from '../../config'

interface MapSourceSectionProps {
  rootSettingProps: RootSettingProps
  showPlaceholder: boolean
}

/**
 * Configure map and layers when source radio 'Interact with a Map widget' is checked.
 * @returns
 */
export default function MapSourceSection (props: MapSourceSectionProps) {
  const {
    rootSettingProps
  } = props

  const {
    id: widgetId,
    config,
    useMapWidgetIds,
    onSettingChange
  } = rootSettingProps

  const {
    mapInfo
  } = config

  const translate = hooks.useTranslation(jimuUIMessages, defaultMessages)
  const currMapWidgetId = (useMapWidgetIds && useMapWidgetIds.length > 0) ? useMapWidgetIds[0] : ''
  const allowGenerated = !!mapInfo.allowGenerated
  const enableAttributeSelection = !!mapInfo.enableAttributeSelection

  const [jimuMapViews, setJimuMapViews] = React.useState<JimuMapView[]>([])

  const onMapWidgetSelect = React.useCallback((newMapWidgetIds: string[]) => {
    if (!newMapWidgetIds) {
      newMapWidgetIds = []
    }

    const newConfig = config.setIn(['mapInfo', 'jimuMapViews'], {})

    onSettingChange({
      id: widgetId,
      config: newConfig,
      useMapWidgetIds: newMapWidgetIds
    })
  }, [config, onSettingChange, widgetId])

  const onAllowGeneratedLayersSwitchChange = React.useCallback((evt, checked: boolean) => {
    const newConfig = config.setIn(['mapInfo', 'allowGenerated'], checked)

    onSettingChange({
      id: widgetId,
      config: newConfig
    })
  }, [config, onSettingChange, widgetId])

  const onGlobalAttributeSelectionSwitchChange = React.useCallback((evt, checked: boolean) => {
    let newMapInfo = config.mapInfo.set('enableAttributeSelection', checked)

    if (!checked) {
      // need to remove all sqlExpressions if the global attribute selection is disabled
      Object.keys(newMapInfo.jimuMapViews).forEach(jimuMapViewId => {
        const dataSourceItems = newMapInfo.jimuMapViews[jimuMapViewId]
        const newDataSourceItems = dataSourceItems.map(dataSourceItem => {
          const newDataSourceItem = dataSourceItem.set('sqlExpression', null)
          return newDataSourceItem
        })
        newMapInfo = newMapInfo.setIn(['jimuMapViews', jimuMapViewId], newDataSourceItems)
      })
    }

    const newConfig = config.set('mapInfo', newMapInfo)

    onSettingChange({
      id: widgetId,
      config: newConfig
    })
  }, [config, onSettingChange, widgetId])

  React.useEffect(() => {
    setJimuMapViews((currJimuMapViews) => {
      const newJimuMapViews = currJimuMapViews.filter(jimuMapView => jimuMapView.mapWidgetId === currMapWidgetId)
      return newJimuMapViews
    })
  }, [currMapWidgetId, setJimuMapViews])

  const onJimuViewsCreate = React.useCallback((viewsObj: { [jimuMapViewIds: string]: JimuMapView }) => {
    const allJimuMapViews = Object.values(viewsObj)
    // Need to filter out default webmap
    const newJimuMapViews = allJimuMapViews.filter(jimuMapView => {
      return jimuMapView.dataSourceId && jimuMapView.mapWidgetId === currMapWidgetId
    })
    setJimuMapViews(newJimuMapViews)
  }, [currMapWidgetId, setJimuMapViews])

  const onDataSourceItemsChange = React.useCallback((jimuMapViewId: string, newImDataSourceItems: ImmutableArray<DataSourceItem>) => {
    const newConfig = config.setIn(['mapInfo', 'jimuMapViews', jimuMapViewId], newImDataSourceItems)
    const useDataSources = getUseDataSourcesByConfig(newConfig)

    onSettingChange({
      id: widgetId,
      config: newConfig,
      useDataSources
    })
  }, [config, onSettingChange, widgetId])

  return (
    <React.Fragment>
      <SettingRow>
        <MapWidgetSelector
          useMapWidgetIds={useMapWidgetIds}
          onSelect={onMapWidgetSelect}
        />
      </SettingRow>

      {
        !currMapWidgetId &&
        <Placeholder
          text={translate('selectMapHint')}
          style={{ height: 'calc(100% - 15rem)' }}
        />
      }

      {
        currMapWidgetId &&
        <React.Fragment>
          <SettingRow flow='wrap' label={translate('selectableLayers')}>
            <TitleWithSwitch
              enabled={allowGenerated}
              titleKey='allowGeneratedData'
              onSwitchChange={onAllowGeneratedLayersSwitchChange}
            />

            <TitleWithSwitch
              enabled={enableAttributeSelection}
              titleKey='attributeSelection'
              className='mt-3'
              onSwitchChange={onGlobalAttributeSelectionSwitchChange}
            />
          </SettingRow>

          <SettingRow bottomLine={true}></SettingRow>

          <JimuMapViewComponent
            useMapWidgetId={currMapWidgetId}
            onViewsCreate={onJimuViewsCreate}
          />

          {
            jimuMapViews.length === 0 &&
            <Alert
              closable={false}
              className='w-100 mt-4'
              form='basic'
              text={translate('noWebMapWebSceneTip')}
              type='warning'
              withIcon={false}
            />
          }

          {
            jimuMapViews.map((jimuMapView) => {
              return (
              <MapLayersSetting
                key={jimuMapView.id}
                jimuMapView={jimuMapView}
                enableAttributeSelection={enableAttributeSelection}
                dataSourceItems={mapInfo.jimuMapViews[jimuMapView.id] as unknown as DataSourceItem[]}
                onDataSourceItemsChange={onDataSourceItemsChange}
              />)
            })
          }
        </React.Fragment>
      }
    </React.Fragment>
  )
}
