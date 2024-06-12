/** @jsx jsx */
import {
  React, Immutable, type ImmutableObject, type DataSourceJson, type IMState, FormattedMessage,
  css, jsx, DataSourceManager, getAppStore, polished, classNames, type UseDataSource, AllDataSourceTypes, type ImmutableArray
} from 'jimu-core'
import { Alert, Switch, ImageWithParam, Radio, defaultMessages as mapDefaultMessages, Select, Checkbox, Label, Tooltip } from 'jimu-ui'
import { type IMJimuMapConfig, MapStatesEditor } from 'jimu-ui/advanced/map'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { ColorPicker } from 'jimu-ui/basic/color-picker'
import { type AllWidgetSettingProps, builderAppSync } from 'jimu-for-builder'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { type IMConfig, SceneQualityMode } from '../config'
import defaultMessages from './translations/default'
import MapThumb from '../../src/runtime/components/map-thumb'
import ToolModules from '../../src/runtime/layout/tool-modules-config'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'

interface ExtraProps {
  dsJsons: ImmutableObject<{ [dsId: string]: DataSourceJson }>
}

interface State {
  showSelectThirdMapAlert: boolean
}

interface AppClientQueryDataSourceWidgetInfo {
  // key is dataSourceId, value is widgetIds that enable client query for this dataSourceId
  [dataSourceId: string]: string[]
}

interface DataSourceClientQueryInfo {
  dataSourceId: string
  dsLabel: string
  clientQueryEnabled: boolean
  switchEnabled: boolean
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, State> {
  unmount = false
  dsManager = DataSourceManager.getInstance()
  integratedDataSourceSetting = {} as any
  supportedDsTypes = Immutable([AllDataSourceTypes.WebMap, AllDataSourceTypes.WebScene])
  closeThirdMapAlertTimer
  alertRef = React.createRef<HTMLDivElement>()

  presetColors = [
    { label: '#00FFFF', value: '#00FFFF', color: '#00FFFF' },
    { label: '#FF9F0A', value: '#FF9F0A', color: '#FF9F0A' },
    { label: '#089BDC', value: '#089BDC', color: '#089BDC' },
    { label: '#FFD159', value: '#FFD159', color: '#FFD159' },
    { label: '#74B566', value: '#74B566', color: '#74B566' },
    { label: '#FF453A', value: '#FF453A', color: '#FF453A' },
    { label: '#9868ED', value: '#9868ED', color: '#9868ED' },
    { label: '#43ABEB', value: '#43ABEB', color: '#43ABEB' }
  ]

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      dsJsons: state.appStateInBuilder.appConfig.dataSources
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      showSelectThirdMapAlert: false
    }

    this.initDataSourceSettingOption()
  }

  getStyle () {
    return css`
      .widget-setting-map {
        color: ${this.props.theme.colors.palette.dark[600]};

        .setting-text-level-1 {
          color: ${this.props.theme.colors.palette.dark[800]} !important;
        }

        .source-descript {
          color: ${this.props.theme.colors.palette.dark[600]};
        }

        .webmap-thumbnail{
          cursor: pointer;
          width: 100%;
          height: 120px;
          overflow: hidden;
          padding: 1px;
          border: ${polished.rem(2)} solid initial;
          img, div{
            width: 100%;
            height: 100%;
          }
        }

        .selected-item{
          border: ${polished.rem(2)} solid ${this.props.theme.colors.palette.primary[700]} !important;
        }

        .webmap-thumbnail-multi{
          cursor: pointer;
          width: 48%;
          height: 100px;
          overflow: hidden;
          padding: 1px;
          border: ${polished.rem(2)} solid initial;
          img, div{
            width: 100%;
            height: 100%;
          }
        }

        .placeholder-container {
          background-color: ${this.props.theme.colors.secondary};
          width: 100%;
          height: 120px;
          position: relative;
        }

        .placeholder-icon {
          top: 40%;
          left: 46%;
          position: absolute;
          fill: ${this.props.theme.colors.palette.dark[300]};
        }

        .choose-btn{
          width: 100%;
        }

        .webmap-tools{
          .webmap-tools-item{
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
        }

        .uploadInput {
          position: absolute;
          opacity: 0;
          left: 0;
          top: 0;
          cursor: pointer;
        }

        .uploadInput-container {
          position: relative;
        }

        .setting-map-button{
          cursor: 'pointer';
        }

        .select-third-map-alert {
          position: fixed;
          right: 0;
          top: 139px;
          width: 260px;
          height: auto;
          z-index: 1;
        }
      }

      .item-selector-popup {
        width: 850px;
        .modal-body {
          max-height: 70vh;
          overflow: auto;
        }
      }

      .enable-client-query-header >.jimu-widget-setting--row-label {
        margin-bottom: 0;
      }
    `
  }

  componentDidMount () {
    this.unmount = false
    document.body.addEventListener('click', this.onClickBody, false)
  }

  componentWillUnmount () {
    this.unmount = true
    document.body.removeEventListener('click', this.onClickBody, false)
    this.cancelCloseSelectThirdMapAlertTimer()
  }

  getPortUrl = (): string => {
    const portUrl = getAppStore().getState().portalUrl
    return portUrl
  }

  hasWebSceneDataSource = (): boolean => {
    return this.props.useDataSources?.some(useDataSource => this.props.dsJsons[useDataSource.dataSourceId]?.type === 'WEB_SCENE')
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }

    if (!this.props.useDataSources || useDataSources.length === this.props.useDataSources.length) {
      this.props.onSettingChange({
        id: this.props.id,
        useDataSources: useDataSources
      })
    } else if (useDataSources.length > this.props.useDataSources.length) {
      const currentSelectedDs = useDataSources.find(ds => !this.props.useDataSources.some(uDs => uDs.dataSourceId === ds.dataSourceId))
      this.onDataSourceSelected(currentSelectedDs)
    } else {
      const currentRemovedDs = this.props.useDataSources.find(uDs => !useDataSources.some(ds => uDs.dataSourceId === ds.dataSourceId))
      this.onDataSourceRemoved(currentRemovedDs)
    }
  }

  onDataSourceSelected = (currentSelectedDs: UseDataSource) => {
    if (!currentSelectedDs) {
      return
    }

    let tempUseDataSources = []
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources)
    tempUseDataSources.push(currentSelectedDs)

    this.integratedDataSourceSetting = {
      id: this.props.id,
      useDataSources: Immutable(tempUseDataSources)
    }

    const settingOption = Object.assign({}, this.integratedDataSourceSetting)
    // eslint-disable-next-line
    settingOption.config = this.props.config.set('initialMapDataSourceID', currentSelectedDs.dataSourceId).set('isUseCustomMapState', false).set('initialMapState', null)
    this.props.onSettingChange(settingOption)
  }

  onDataSourceRemoved = (currentRemovedDs: UseDataSource): void => {
    if (!currentRemovedDs) {
      return
    }

    const removedDatasourceId = currentRemovedDs.dataSourceId

    // remove related useDataSource
    let tempUseDataSources = []
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources)
    for (let i = 0; i < tempUseDataSources.length; i++) {
      if (tempUseDataSources[i].dataSourceId === removedDatasourceId) {
        tempUseDataSources.splice(i, 1)
        break
      }
    }

    const settingChange = {
      id: this.props.id,
      useDataSources: Immutable(tempUseDataSources)
    } as any

    let settingOption = {} as any

    this.integratedDataSourceSetting = settingChange
    settingOption = Object.assign({}, this.integratedDataSourceSetting)
    let newConfig: IMConfig = null
    if (tempUseDataSources.length > 0) {
      const initialMapDataSourceID = tempUseDataSources[0] && tempUseDataSources[0].dataSourceId
      newConfig = this.props.config.set('initialMapDataSourceID', initialMapDataSourceID).set('isUseCustomMapState', false).set('initialMapState', null) as IMConfig
    } else {
      newConfig = this.props.config.set('initialMapDataSourceID', null).set('isUseCustomMapState', false).set('initialMapState', null) as IMConfig
    }

    // try to remove removedDatasourceId from clientQueryDataSourceIds
    newConfig = this.getNewConfigByDisableDataSourceClientQuery(newConfig, removedDatasourceId)

    settingOption.config = newConfig

    this.props.onSettingChange(Object.assign({}, settingOption))
  }

  onMapToolsChanged = (checked, name): void => {
    if (name === 'canSelect') {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.setIn(['toolConfig', 'canSelect'], checked).setIn(['toolConfig', 'canSelectState'], checked)
      })
    } else {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.setIn(['toolConfig', name], checked)
      })
    }
  }

  onMapOptionsChanged = (checked, name): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(name, checked)
    })
  }

  onSceneQualityModeChnaged = (value, name): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(name, value)
    })
  }

  onDisableSelection = (useDataSources: UseDataSource[]): boolean => {
    if (useDataSources.length > 1) {
      return true
    } else {
      return false
    }
  }

  onClickDisabledDsItem = () => {
    if (this.props.useDataSources && this.props.useDataSources.length >= 2) {
      setTimeout(() => {
        this.showSelectThirdMapAlert()
      }, 0)
    }
  }

  showSelectThirdMapAlert (): void {
    if (!this.unmount) {
      this.setState({
        showSelectThirdMapAlert: true
      }, () => {
        // make sure Alert dom is rendered and we can get the this.alertRef.current
        if (!this.unmount) {
          this.forceUpdate()
        }
      })

      this.startCloseSelectThirdMapAlertTimer()
    }
  }

  hideSelectThirdMapAlert (): void {
    this.cancelCloseSelectThirdMapAlertTimer()

    if (!this.unmount) {
      this.setState({
        showSelectThirdMapAlert: false
      })
    }
  }

  cancelCloseSelectThirdMapAlertTimer (): void {
    if (this.closeThirdMapAlertTimer) {
      clearTimeout(this.closeThirdMapAlertTimer)
      this.closeThirdMapAlertTimer = null
    }
  }

  startCloseSelectThirdMapAlertTimer (): void {
    this.cancelCloseSelectThirdMapAlertTimer()
    this.closeThirdMapAlertTimer = setTimeout(() => {
      if (!this.unmount) {
        this.setState({
          showSelectThirdMapAlert: false
        })
      }
    }, 5000)
  }

  onClickBody = () => {
    if (!this.unmount) {
      this.hideSelectThirdMapAlert()
    }
  }

  onSelectThridMapAlertClose = () => {
    this.hideSelectThirdMapAlert()
  }

  // use for dataSourceSetting cache
  initDataSourceSettingOption = () => {
    let tempUseDataSources = []
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources)

    const dataSourceSettingOption = {
      widgetId: this.props.id,
      useDataSources: Immutable(tempUseDataSources)
    }
    this.integratedDataSourceSetting = dataSourceSettingOption
  }

  setInitialMap = (dataSourceId: string) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('initialMapDataSourceID', dataSourceId)
    })

    // mapWidget.props.stateProps.initialMapDataSourceID is a temporary variable to let map setting and map runtime communicate with each other.
    // If we change the initialMapDataSourceID by clicking ds thumbnail in map setting,
    // then map setting will call builderAppSync.publishChangeWidgetStatePropToApp() to update mapWidget.props.stateProps.initialMapDataSourceID.
    // Once we check mapWidget.props.stateProps.initialMapDataSourceID is not empty in MultiSourceMap, means we changed the initialMapDataSourceID,
    // then we make sure the initialMapbase go to the initial extent.
    // At last, MultiSourceMap will reset mapWidget.props.stateProps.initialMapDataSourceID to empty.
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'initialMapDataSourceID', value: dataSourceId })
  }

  changeToolLaylout = (index: number) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('layoutIndex', index)
    })
  }

  handleMapInitStateChanged = (config: IMJimuMapConfig) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('initialMapDataSourceID', config.initialMapDataSourceID).set('initialMapState', config.initialMapState)
    })
  }

  handleIsUseCustomMapState = (isUseCustomMapState: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('isUseCustomMapState', isUseCustomMapState).set('initialMapState', null)
    })
  }

  updateSelectionHighlightColor = (color: string) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('selectionHighlightColor', color)
    })
  }

  updateSelectionHighlightHaloColor = (color: string) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('selectionHighlightHaloColor', color)
    })
  }

  onEnablePopupSwitchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const disableMapPopup = !evt.target.checked

    let newConfig = this.props.config.set('disablePopUp', disableMapPopup) as unknown as IMConfig

    if (disableMapPopup) {
      newConfig = newConfig.set('showPopupUponSelection', false) as unknown as IMConfig
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: newConfig
    })
  }

  onShowPopupUponSelectionCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.onMapOptionsChanged(evt.target.checked, 'showPopupUponSelection')
  }

  handleMapThumbKeyDown = (e: React.KeyboardEvent<any>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.setInitialMap(this.props.useDataSources[index].dataSourceId)
      e?.preventDefault()
    }
  }

  handleLayoutThumbKeyDown = (e: React.KeyboardEvent<any>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.changeToolLaylout(index)
      e?.preventDefault()
    }
  }

  getAppClientQueryDataSourceWidgetInfo = (): AppClientQueryDataSourceWidgetInfo => {
    const result: AppClientQueryDataSourceWidgetInfo = {} // { dataSourceId: mapWidgetIds }
    const widgetsJson = getAppStore().getState()?.appStateInBuilder?.appConfig?.widgets

    if (widgetsJson) {
      const widgetJsonArray = Object.values(widgetsJson)

      for (const widgetJson of widgetJsonArray) {
        if (widgetJson.uri === 'widgets/arcgis/arcgis-map/') {
          const mapWidgetId = widgetJson.id
          const useDataSources = widgetJson.useDataSources
          const mapWidgetConfig = widgetJson.config as IMConfig

          const useDataSourceIds: string[] = []

          if (useDataSources && useDataSources.length > 0) {
            useDataSources.forEach(useDataSource => {
              const dataSourceId = useDataSource?.dataSourceId

              if (dataSourceId) {
                useDataSourceIds.push(dataSourceId)
              }
            })
          }

          // The dataSourceId in mapWidgetConfig.clientQueryDataSourceIds maybe not exist in widgetJson.useDataSources (see #17570 for more details),
          // so we need to validate mapWidgetConfig.clientQueryDataSourceIds by widgetJson.useDataSources.
          const validClientQueryDataSourceIds: string[] = []

          if (mapWidgetConfig?.clientQueryDataSourceIds?.length > 0) {
            // This is just a workaround for #17570, need further fix once #12995 fixed.
            mapWidgetConfig?.clientQueryDataSourceIds?.forEach(dataSourceId => {
              if (useDataSourceIds.includes(dataSourceId)) {
                validClientQueryDataSourceIds.push(dataSourceId)
              }
            })
          }

          if (validClientQueryDataSourceIds?.length > 0) {
            validClientQueryDataSourceIds?.forEach(dataSourceId => {
              if (!result[dataSourceId]) {
                result[dataSourceId] = []
              }

              if (!result[dataSourceId].includes(mapWidgetId)) {
                result[dataSourceId].push(mapWidgetId)
              }
            })
          }
        }
      }
    }

    return result
  }

  getDsClientQueryInfos = (): DataSourceClientQueryInfo[] => {
    const result: DataSourceClientQueryInfo[] = []
    const appClientQueryDataSourceWidgetInfo = this.getAppClientQueryDataSourceWidgetInfo()
    const currMapWidgetId = this.props.id
    const allDsJsons = this.props.dsJsons

    if (allDsJsons && this.props.useDataSources?.length > 0) {
      this.props.useDataSources?.forEach(useDataSource => {
        const dataSourceId = useDataSource.dataSourceId

        if (dataSourceId) {
          const dsJson = allDsJsons[dataSourceId]

          if (dsJson && dsJson.type === 'WEB_MAP') {
            const dsLabel = dsJson.label || dsJson.sourceLabel || ''
            const enableClientQueryWidgetIds = appClientQueryDataSourceWidgetInfo[dataSourceId] || []
            const clientQueryEnabled = enableClientQueryWidgetIds.includes(currMapWidgetId)

            let switchEnabled = false

            if (clientQueryEnabled) {
              switchEnabled = true
            } else {
              switchEnabled = enableClientQueryWidgetIds.length === 0
            }

            result.push({
              dataSourceId,
              dsLabel,
              clientQueryEnabled,
              switchEnabled
            })
          }
        }
      })
    }

    return result
  }

  getNewConfigByEnableDataSourceClientQuery = (oldConfig: IMConfig, dataSourceId: string): IMConfig => {
    let newConfig = oldConfig

    const oldClientQueryDataSourceIds = oldConfig.clientQueryDataSourceIds
    let newClientQueryDataSourceIds: ImmutableArray<string> = null

    if (oldClientQueryDataSourceIds) {
      if (oldClientQueryDataSourceIds.includes(dataSourceId)) {
        newClientQueryDataSourceIds = oldClientQueryDataSourceIds
      } else {
        newClientQueryDataSourceIds = Immutable(oldClientQueryDataSourceIds.asMutable().concat(dataSourceId))
      }
    } else {
      newClientQueryDataSourceIds = Immutable([dataSourceId])
    }

    if (oldClientQueryDataSourceIds !== newClientQueryDataSourceIds) {
      newConfig = oldConfig.set('clientQueryDataSourceIds', newClientQueryDataSourceIds) as unknown as IMConfig
    }

    return newConfig
  }

  getNewConfigByDisableDataSourceClientQuery = (oldConfig: IMConfig, dataSourceId: string): IMConfig => {
    let newConfig = oldConfig

    if (oldConfig.clientQueryDataSourceIds?.includes(dataSourceId)) {
      const newClientQueryDataSourceIds = oldConfig.clientQueryDataSourceIds.filter(item => item !== dataSourceId)
      newConfig = newConfig.set('clientQueryDataSourceIds', newClientQueryDataSourceIds) as unknown as IMConfig
    }

    return newConfig
  }

  onClientQueryChanged = (dataSourceId: string, checked: boolean) => {
    const currentWidgetId = this.props.id
    const oldConfig = this.props.config
    let newConfig = oldConfig

    if (checked) {
      // need to check if other map already enable client query for safety
      const appClientQueryDataSourceWidgetInfo = this.getAppClientQueryDataSourceWidgetInfo()
      const widgetIds = appClientQueryDataSourceWidgetInfo[dataSourceId] || []
      const otherWidgetIds = widgetIds.filter(widgetId => widgetId !== currentWidgetId)

      if (otherWidgetIds.length > 0) {
        console.warn(`the data source ${dataSourceId} is enabled client query in another map widget, ${otherWidgetIds}`)
        return
      }

      newConfig = this.getNewConfigByEnableDataSourceClientQuery(oldConfig, dataSourceId)
    } else {
      newConfig = this.getNewConfigByDisableDataSourceClientQuery(oldConfig, dataSourceId)
    }

    this.props.onSettingChange({
      id: currentWidgetId,
      config: newConfig
    })
  }

  render () {
    const portalUrl = this.getPortUrl()

    let sceneQualityModeConten = null
    if (this.hasWebSceneDataSource()) {
      const sceneQualityModeLabel = this.props.intl.formatMessage({ id: 'sceneQualityMode', defaultMessage: defaultMessages.sceneQualityMode })
      sceneQualityModeConten = (
        <SettingRow flow='wrap' label={sceneQualityModeLabel}>
          <Select
            size='sm' value={(this.props.config && this.props.config.sceneQualityMode) || SceneQualityMode.low}
            onChange={evt => { this.onSceneQualityModeChnaged(evt.target.value, 'sceneQualityMode') }} className=''
          >
            {/* <option key={1} value='auto'><FormattedMessage id='auto' defaultMessage='Auto' /></option> */}
            <option key={2} value='low'><FormattedMessage id='low' defaultMessage='Low' /></option>
            <option key={3} value='medium'><FormattedMessage id='medium' defaultMessage='Medium' /></option>
            <option key={4} value='high'><FormattedMessage id='high' defaultMessage='High' /></option>
          </Select>
        </SettingRow>
      )
    }

    const alertText = this.props.intl.formatMessage({ id: 'selectThirdMapHint', defaultMessage: defaultMessages.selectThirdMapHint })
    const showPopupUponSelectionTooltip = this.props.intl.formatMessage({ id: 'showPopupUponSelectionTooltip', defaultMessage: defaultMessages.showPopupUponSelectionTooltip })

    let sidePopperTrigger: HTMLElement = null

    if (this.alertRef && this.alertRef.current) {
      sidePopperTrigger = this.alertRef.current as HTMLElement
    }

    const enablePopUp = !!(this.props.config && !this.props.config.disablePopUp)
    const showPopupUponSelection = enablePopUp && !!(this.props.config && this.props.config.showPopupUponSelection)
    const dsClientQueryInfos = this.getDsClientQueryInfos()

    const isEnLocale = this.props.locale?.startsWith('en')
    let clientQueryHelpTip1: any = ''
    let clientQueryHelpTip2: string = ''

    try {
      if (isEnLocale) {
        // show special strings for en-us
        clientQueryHelpTip1 = this.props.intl.formatMessage({
          id: 'clientQueryHelpTip1',
          defaultMessage: defaultMessages.clientQueryHelpTip1
        }, {
          link: <a href="https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/map-widget.htm" target="_blank">more information</a>
        })

        clientQueryHelpTip2 = ''
      } else {
        clientQueryHelpTip1 = this.props.intl.formatMessage({ id: 'clientQueryHelpTip1', defaultMessage: defaultMessages.clientQueryHelpTip1 })
        clientQueryHelpTip2 = this.props.intl.formatMessage({ id: 'clientQueryHelpTip2', defaultMessage: defaultMessages.clientQueryHelpTip2 })
      }
    } catch (e) {
      console.error('fail to get strings for map client query', e)
    }

    const clientQueryHelpTipCss = css`
      width: 360px;
      font-size: 12px;
    `

    const clientQueryHelpTip = (<div className='p-2' css={clientQueryHelpTipCss}>
      <div>{clientQueryHelpTip1}</div>
      { clientQueryHelpTip2 && <div className='mt-2'>{clientQueryHelpTip2}</div> }
    </div>)

    const clientQueryDisabledTip = this.props.intl.formatMessage({ id: 'clientQueryDisabledTip', defaultMessage: defaultMessages.clientQueryDisabledTip })

    return (
      <div css={this.getStyle()}><div className='widget-setting-map'>
        <Alert
          closable
          className='select-third-map-alert'
          form='basic'
          onClose={this.onSelectThridMapAlertClose}
          open={this.state.showSelectThirdMapAlert}
          text={alertText}
          type='warning'
          withIcon
          ref={this.alertRef}
        />

        <SettingSection className='section-title' title={this.props.intl.formatMessage({ id: 'sourceLabel', defaultMessage: defaultMessages.sourceLabel })}>
          <SettingRow flow='wrap'>
            <div className='source-descript text-break'>{this.props.intl.formatMessage({ id: 'sourceDescript', defaultMessage: defaultMessages.sourceDescript })}</div>
          </SettingRow>
          <SettingRow>
            <DataSourceSelector
              isMultiple types={this.supportedDsTypes}
              buttonLabel={this.props.intl.formatMessage({ id: 'selectMap', defaultMessage: defaultMessages.selectMap })}
              onChange={this.onDataSourceChange} useDataSources={this.props.useDataSources}
              disableSelection={this.onDisableSelection} mustUseDataSource widgetId={this.props.id}
              onClickDisabledDsItem={this.onClickDisabledDsItem} sidePopperTrigger={sidePopperTrigger}
            />
          </SettingRow>
          {portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 1 && <SettingRow>
            <div className='w-100'>
              <div
                className='webmap-thumbnail selected-item' title={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]?.sourceLabel}
                onClick={() => { this.setInitialMap(this.props.useDataSources[0].dataSourceId) }}
              >
                <MapThumb
                  mapItemId={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]
                    ? this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId
                    : null}
                  portUrl={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]
                    ? this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl
                    : null}
                  theme={this.props.theme}
                />
              </div>
            </div>
          </SettingRow>}
          {
            portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 2 &&
              <SettingRow>
                <div className='w-100 d-flex justify-content-between'>
                  <div
                    onClick={() => { this.setInitialMap(this.props.useDataSources[0].dataSourceId) }}
                    title={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]?.sourceLabel}
                    className={classNames('webmap-thumbnail-multi', { 'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[0].dataSourceId })}
                    tabIndex={0} role='button' onKeyDown={e => { this.handleMapThumbKeyDown(e, 0) }}
                  >
                    <MapThumb
                      mapItemId={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]
                        ? this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId
                        : null}
                      portUrl={this.props.dsJsons[this.props.useDataSources[0].dataSourceId]
                        ? this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl
                        : null}
                      theme={this.props.theme}
                    />
                  </div>
                  <div
                    onClick={() => { this.setInitialMap(this.props.useDataSources[1].dataSourceId) }}
                    title={this.props.dsJsons[this.props.useDataSources[1].dataSourceId].sourceLabel}
                    className={classNames('webmap-thumbnail-multi', { 'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[1].dataSourceId })}
                    tabIndex={0} role='button' onKeyDown={e => { this.handleMapThumbKeyDown(e, 1) }}
                  >
                    <MapThumb
                      mapItemId={this.props.dsJsons[this.props.useDataSources[1].dataSourceId]
                        ? this.props.dsJsons[this.props.useDataSources[1].dataSourceId].itemId
                        : null}
                      portUrl={this.props.dsJsons[this.props.useDataSources[1].dataSourceId]
                        ? this.props.dsJsons[this.props.useDataSources[1].dataSourceId].portalUrl
                        : null}
                      theme={this.props.theme}
                    />
                  </div>
                </div>
              </SettingRow>
          }
        </SettingSection>

        <SettingSection title={this.props.intl.formatMessage({ id: 'initialMapView', defaultMessage: defaultMessages.initialMapView })}>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} onChange={() => { this.handleIsUseCustomMapState(false) }}
                  checked={!this.props.config.isUseCustomMapState}
                  title={this.props.intl.formatMessage({ id: 'defaultViewTip', defaultMessage: defaultMessages.defaultViewTip })}
                />
                <label
                  className='m-0 ml-2' style={{ cursor: 'pointer' }} onClick={() => { this.handleIsUseCustomMapState(false) }}
                  title={this.props.intl.formatMessage({ id: 'defaultViewTip', defaultMessage: defaultMessages.defaultViewTip })}
                >
                  {this.props.intl.formatMessage({ id: 'defaultView', defaultMessage: defaultMessages.defaultView })}
                </label>
              </div>
            </div>
          </SettingRow>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} onChange={() => { this.handleIsUseCustomMapState(true) }}
                  checked={this.props.config.isUseCustomMapState}
                  title={this.props.intl.formatMessage({ id: 'customViewTip', defaultMessage: defaultMessages.customViewTip })}
                />
                <label
                  className='m-0 ml-2' style={{ cursor: 'pointer' }} onClick={() => { this.handleIsUseCustomMapState(true) }}
                  title={this.props.intl.formatMessage({ id: 'customViewTip', defaultMessage: defaultMessages.customViewTip })}
                >
                  {this.props.intl.formatMessage({ id: 'customView', defaultMessage: defaultMessages.customView })}
                </label>
              </div>
            </div>
          </SettingRow>
          {this.props.config.isUseCustomMapState && <SettingRow>
            <div className='ml-5'>
              <MapStatesEditor
                title={this.props.intl.formatMessage({ id: 'setMapView', defaultMessage: defaultMessages.setMapView })}
                buttonLabel={this.props.intl.formatMessage({ id: 'customViewSet', defaultMessage: defaultMessages.customViewSet })}
                useDataSources={this.props.useDataSources}
                jimuMapConfig={this.props.config as IMJimuMapConfig} id={this.props.id}
                onConfigChanged={this.handleMapInitStateChanged} isUseWidgetSize
              />
            </div>
          </SettingRow>}
        </SettingSection>

        <SettingSection title={this.props.intl.formatMessage({ id: 'toolLabel', defaultMessage: defaultMessages.toolLabel })}>
          <SettingRow>
            <div className='w-100 webmap-tools'>
              {Object.keys(ToolModules).map((key, index) => {
                if (ToolModules[key].isNeedSetting) {
                  return (
                    <div className='webmap-tools-item' key={index}>
                      <span className='text-break' style={{ width: '80%' }}>{this.props.intl.formatMessage({ id: key + 'Label', defaultMessage: mapDefaultMessages[key + 'Label'] })}</span>
                      <Switch
                        className='can-x-switch' checked={(this.props.config.toolConfig && this.props.config.toolConfig[`can${key}`]) || false}
                        onChange={evt => { this.onMapToolsChanged(evt.target.checked, `can${key}`) }}
                        aria-label={this.props.intl.formatMessage({ id: key + 'Label', defaultMessage: mapDefaultMessages[key + 'Label'] })}
                      />
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection title={this.props.intl.formatMessage({ id: 'mapLayout', defaultMessage: defaultMessages.mapLayout })}>
          <SettingRow>
            <div className='source-descript' id='largeAndMediumLayout'>
              {this.props.intl.formatMessage({ id: 'mapLayout_LargeAndMedium', defaultMessage: defaultMessages.mapLayout_LargeAndMedium })}
            </div>
          </SettingRow>
          <SettingRow>
            <div className='w-100 d-flex justify-content-between'>
              <div
                onClick={() => { this.changeToolLaylout(0) }} className={classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                  'selected-item': !this.props.config.layoutIndex
                })}
                aria-labelledby='largeAndMediumLayout'
                tabIndex={0} role='button' onKeyDown={e => { this.handleLayoutThumbKeyDown(e, 0) }}
              >
                <ImageWithParam imageParam={{ url: require('./assets/pc-layout-0.svg') }} />
              </div>
              <div
                onClick={() => { this.changeToolLaylout(1) }} className={classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                  'selected-item': this.props.config.layoutIndex === 1
                })}
                aria-labelledby='largeAndMediumLayout'
                tabIndex={0} role='button' onKeyDown={e => { this.handleLayoutThumbKeyDown(e, 1) }}
              >
                <ImageWithParam imageParam={{ url: require('./assets/pc-layout-1.svg') }} />
              </div>
            </div>
          </SettingRow>
          <SettingRow>
            <div className='source-descript'>
              {this.props.intl.formatMessage({ id: 'mapLayout_Small', defaultMessage: defaultMessages.mapLayout_Small })}
            </div>
          </SettingRow>
          <SettingRow>
            <div className='w-100 d-flex justify-content-between'>
              <div
                className={classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                  'selected-item': false
                })} style={{ cursor: 'initial' }}
              >
                <ImageWithParam imageParam={{ url: require('./assets/mobile-layout-0.svg') }} />
              </div>
              <div />
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection title={this.props.intl.formatMessage({ id: 'options', defaultMessage: mapDefaultMessages.options })}>
          <SettingRow>
            <div className='w-100 webmap-tools'>
              <div className='webmap-tools-item'>
                <label>
                  <FormattedMessage id='featureSelectionColor' defaultMessage={defaultMessages.featureSelectionColor} />
                </label>
              </div>
              <div className='d-flex justify-content-between' style={{ marginBottom: '8px', color: `${this.props.theme.colors.palette.dark[400]}` }}>
                <label id='highlightFill'>
                  <FormattedMessage id='featureHighlightFill' defaultMessage={defaultMessages.featureHighlightFill} />
                </label>
                <div>
                  <ColorPicker
                    style={{ padding: '4' }} width={30} height={26}
                    color={this.props.config.selectionHighlightColor ? this.props.config.selectionHighlightColor : '#00FFFF'}
                    onChange={this.updateSelectionHighlightColor} presetColors={this.presetColors}
                    aria-label={this.props.intl.formatMessage({ id: 'featureHighlightFill', defaultMessage: defaultMessages.featureHighlightFill })}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-between' style={{ color: `${this.props.theme.colors.palette.dark[400]}` }}>
                <label>
                  <FormattedMessage id='featureHighlightOutline' defaultMessage={defaultMessages.featureHighlightOutline} />
                </label>
                <div>
                  <ColorPicker
                    style={{ padding: '4' }} width={30} height={26}
                    color={this.props.config.selectionHighlightHaloColor ? this.props.config.selectionHighlightHaloColor : '#00FFFF'}
                    onChange={this.updateSelectionHighlightHaloColor} presetColors={this.presetColors}
                    aria-label={this.props.intl.formatMessage({ id: 'featureHighlightOutline', defaultMessage: defaultMessages.featureHighlightOutline })}
                  />
                </div>
              </div>
            </div>
          </SettingRow>

          <SettingRow className='justify-content-between'>
            <label id='enableScrollZoomTool'>
              <FormattedMessage id='enableScrollZoom' defaultMessage={defaultMessages.enableScrollZoom} />
            </label>
            <Switch
              className='can-x-switch' checked={(this.props.config && this.props.config.disableScroll !== true) /* eslint-disable-line */}
              data-key='disableScroll' onChange={evt => { this.onMapOptionsChanged(!evt.target.checked, 'disableScroll') }}
              aria-labelledby='enableScrollZoomTool'
            />
          </SettingRow>

          <SettingRow className='justify-content-between'>
            <label id='enablePopupTool' className='text-break'>
              <FormattedMessage id='enablePopUp' defaultMessage={defaultMessages.enablePopUp} />
            </label>
            <Switch
              className='can-x-switch' checked={enablePopUp}
              data-key='disablePopUp' onChange={this.onEnablePopupSwitchChange}
              aria-labelledby='enablePopupTool'
            />
          </SettingRow>

          {
            enablePopUp && (
              <SettingRow>
                <Label>
                  <Checkbox
                    checked={showPopupUponSelection}
                    className='mr-1'
                    onChange={this.onShowPopupUponSelectionCheckboxChange}
                  />
                  <FormattedMessage id='showPopupUponSelection' defaultMessage={defaultMessages.showPopupUponSelection} />
                </Label>
                <Tooltip title={showPopupUponSelectionTooltip} showArrow placement='left'>
                  <span>
                    <InfoOutlined />
                  </span>
                </Tooltip>
              </SettingRow>
            )
          }

          {sceneQualityModeConten}

          {
            dsClientQueryInfos.length > 0 &&
            <React.Fragment>
              <SettingRow
                bottomLine={true}
              >
              </SettingRow>

              <SettingRow
                level={2}
                label={this.props.intl.formatMessage({ id: 'enableClientSideQuery', defaultMessage: defaultMessages.enableClientSideQuery })}
                flow='no-wrap'
                className='enable-client-query-header'
              >
                <Tooltip title={clientQueryHelpTip} showArrow placement='left' interactive={true} leaveDelay={1000}>
                  <span>
                    <InfoOutlined />
                  </span>
                </Tooltip>
              </SettingRow>

              {
                dsClientQueryInfos.map(clientQueryInfo => {
                  const {
                    dataSourceId,
                    dsLabel,
                    clientQueryEnabled,
                    switchEnabled
                  } = clientQueryInfo

                  const isSwitchDisabled = !switchEnabled

                  return (
                    <SettingRow
                      key={dataSourceId}
                      level={3}
                      label={dsLabel}
                      flow='no-wrap'
                      className='w-100'
                    >
                      {
                        isSwitchDisabled &&
                        <Tooltip title={clientQueryDisabledTip} showArrow placement='left'>
                          <span className='mr-2'>
                            <InfoOutlined />
                          </span>
                        </Tooltip>
                      }

                      <Switch
                        className='can-x-switch'
                        disabled={isSwitchDisabled}
                        checked={clientQueryEnabled}
                        onChange={evt => { this.onClientQueryChanged(dataSourceId, evt.target.checked) }}
                      />
                    </SettingRow>
                  )
                })
              }
            </React.Fragment>
          }
        </SettingSection>

      </div>
      </div>
    )
  }
}
