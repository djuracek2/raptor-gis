/** @jsx jsx */
import {
  React, Immutable, type ImmutableObject, type DataSourceJson, type IMState, FormattedMessage, jsx, getAppStore,
  type UseDataSource, type SqlExpression, type OrderByOption, DataSourceComponent, type FeatureLayerDataSource, type SceneLayerDataSource
} from 'jimu-core'
import { Button, ButtonGroup, Dropdown, DropdownButton, DropdownMenu, DropdownItem, Checkbox, TextArea, DistanceUnits, type LinearUnit, Select, defaultMessages as jimuDefaultMessages } from 'jimu-ui'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { type IMConfig, StyleType, FontSizeType } from '../config'
import defaultMessages from './translations/default'
import { getStyle } from './lib/style'
import { InputUnit } from 'jimu-ui/advanced/style-setting-components'
import { getFeatureLayer } from '../utils'

interface ExtraProps {
  dsJsons: ImmutableObject<{ [dsId: string]: DataSourceJson }>
}

export interface WidgetSettingState {
  useMapWidget: boolean
  popupHasTextContent: boolean
  popupHasMediaContent: boolean
  popupHasAttachmentsContent: boolean
  popupHasTitle: boolean
  popupHasChangeTracking: boolean
  layerHasAttachment: boolean
  layerHasChangeTracking: boolean
}

const MESSAGES = Object.assign({}, defaultMessages, jimuDefaultMessages)

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, WidgetSettingState> {
  private dataSource: FeatureLayerDataSource | SceneLayerDataSource
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      dsJsons: state.appStateInBuilder.appConfig.dataSources
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      useMapWidget: this.props.config.useMapWidget || false,
      popupHasTextContent: true,
      popupHasMediaContent: false,
      popupHasAttachmentsContent: false,
      popupHasTitle: false,
      popupHasChangeTracking: false,
      layerHasAttachment: false,
      layerHasChangeTracking: false
    }
  }

  getPortUrl = (): string => {
    const portUrl = getAppStore().getState().portalUrl
    return portUrl
  }

  getStyleConfig () {
    if (this.props.config.style) {
      return this.props.config.style
    } else {
      return {
        textColor: '',
        fontSize: {
          distance: 0,
          unit: DistanceUnits.PIXEL
        },
        backgroundColor: ''
      }
    }
  }

  getCapabilities () {
    return {
      supportsTitle: this.state.popupHasTitle,
      supportsMedia: this.state.popupHasMediaContent,
      supportsAttachment: this.state.popupHasAttachmentsContent && this.state.layerHasAttachment,
      supportsChangeTracking: this.state.popupHasChangeTracking && this.state.layerHasChangeTracking
    }
  }

  setDisplayFieldsToConfig (dataSource: FeatureLayerDataSource | SceneLayerDataSource) {
    const useDataSource = this.props.useDataSources?.[0]
    if (!useDataSource || !dataSource) {
      return
    }
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [useDataSource.set('useFieldsInPopupInfo', true).asMutable({ deep: true })]
    })
  }

  onRadioChange = (useMapWidget) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('useMapWidget', useMapWidget)
    })

    this.setState({
      useMapWidget: useMapWidget
    })
  }

  onPropertyChange = (name, value) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(name, value)
    })
  }

  onOptionsChanged = (checked, name): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(name, checked)
    })
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    })
  }

  onStyleTypeChanged = (event) => {
    const styleType = event.target.value
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('styleType', styleType)
    })
  }

  onStyleChanged = (key, value) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', key], value)
    })
  }

  onSelectAutoFontSizeType = () => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'fontSizeType'], FontSizeType.auto)
    })
  }

  onSelectCustomFontSizeType = () => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'fontSizeType'], FontSizeType.custom)
    })
  }

  onFontSizeChanged = (value) => {
    // let fontSize = this.getStyleConfig().fontSize || {};
    // fontSize = {...fontSize, ...value};
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'fontSize'], value)
    })
  }

  onFilterChange = (sqlExprObj: SqlExpression, dsId: string) => {
    const useDataSources = this.props.useDataSources
    if (!useDataSources || !useDataSources[0] || useDataSources[0].dataSourceId !== dsId) return
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [useDataSources[0].setIn(['query', 'where'], sqlExprObj).asMutable({ deep: true })]
    })
  }

  onSortChange = (sortData: OrderByOption[], dsId: string) => {
    const { useDataSources } = this.props
    if (!useDataSources || !useDataSources[0] || useDataSources[0].dataSourceId !== dsId) return
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [useDataSources[0].setIn(['query', 'orderBy'], sortData).asMutable({ deep: true })]
    })
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    })
  }

  onDataSourceCreated = (dataSource: FeatureLayerDataSource | SceneLayerDataSource): void => {
    this.dataSource = dataSource
    this.setDisplayFieldsToConfig(dataSource)
    getFeatureLayer(dataSource).then(featureLayer => {
      // popup capabilities
      const popupContent = featureLayer?.popupTemplate?.content
      let popupHasTextContent = false
      let popupHasMediaContent = false
      let popupHasAttachmentsContent = false
      let popupHasTitle = !!featureLayer?.popupTemplate?.title
      let popupHasChangeTracking = featureLayer?.popupTemplate?.lastEditInfoEnabled
      if (popupContent && popupContent.length) {
        popupContent.forEach(content => {
          switch (content.type) {
            case 'text':
              popupHasTextContent = true
              break
            case 'media':
              popupHasMediaContent = true
              break
            case 'attachments':
              popupHasAttachmentsContent = true
              break
          }
        })
      } else {
        popupHasTextContent = true
        popupHasTitle = true
        popupHasMediaContent = false
        popupHasAttachmentsContent = false
        popupHasChangeTracking = false
      }

      if (!popupHasTextContent) {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('styleType', StyleType.custom)
        })
      }

      // layer capabilities
      const layerHasAttachment = featureLayer?.capabilities?.data?.supportsAttachment
      const layerHasChangeTracking = !!(featureLayer?.editingInfo && featureLayer?.editFieldsInfo)

      this.setState({
        popupHasTextContent: popupHasTextContent,
        popupHasMediaContent: popupHasMediaContent,
        popupHasAttachmentsContent: popupHasAttachmentsContent,
        popupHasTitle: popupHasTitle,
        popupHasChangeTracking: popupHasChangeTracking,
        layerHasAttachment: layerHasAttachment,
        layerHasChangeTracking: layerHasChangeTracking
      })
    })
  }

  onDataSourceRemoved = () => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: []
    })
  }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  i18nMessage = (id: string, defaultMessage?: string) => {
    const { intl } = this.props
    return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessage || MESSAGES[id] }) : ''
  }

  render () {
    const mapDsIds = []
    if (this.props.useDataSources) {
      for (let i = 0; i < this.props.useDataSources.length; i++) {
        mapDsIds.push(this.props.useDataSources[i].dataSourceId)
      }
    }

    // const filterConfig = {};
    // const sortConfig = {};
    const useDataSource = this.props.useDataSources && this.props.useDataSources[0]
    // if(useDataSource && useDataSource.dataSourceId) {
    //   filterConfig[useDataSource.dataSourceId] = useDataSource.query && useDataSource.query.where;
    //   sortConfig[useDataSource.dataSourceId] = useDataSource.query && useDataSource.query.orderBy;
    // }

    let setDataContent = null
    let dataSourceSelectorContent = null
    let dataSourceComponentContent = null
    let mapSelectorContent = null
    const optionsContent = null

    if (useDataSource && useDataSource.dataSourceId) {
      dataSourceComponentContent = (
        <DataSourceComponent
          useDataSource={useDataSource}
          onDataSourceCreated={this.onDataSourceCreated}
          query={null}
        />
      )
    }

    dataSourceSelectorContent = (
      <SettingSection title={this.i18nMessage('sourceLabel')}>
        {/* <SettingRow flow="wrap">
          <div className="second-header">{this.props.intl.formatMessage({id: 'sourceDescript', defaultMessage: defaultMessages.sourceDescript})}</div>
        </SettingRow> */}
        <SettingRow>
          <DataSourceSelector
            types={this.supportedDsTypes}
            useDataSourcesEnabled mustUseDataSource
            useDataSources={this.props.useDataSources}
            onChange={this.onDataSourceChange} widgetId={this.props.id}
          />
          {dataSourceComponentContent}
        </SettingRow>

        {/* <SettingRow label={<FormattedMessage id="maxFeauresDisplayed" defaultMessage={defaultMessages.maxFeauresDisplayed}/>}>
          <Switch className="can-x-switch" checked={(this.props.config && this.props.config.limitGraphics) || false}
            data-key="limitGraphics" onChange={evt => {this.onOptionsChanged(evt.target.checked, 'limitGraphics')}} />
        </SettingRow> */}

        {/* this.props.config.limitGraphics &&
          <SettingRow >
            <div className="d-flex w-100">
              <NumericInput className="w-100" value={this.props.config.maxGraphics || 1000} min={1} showHandlers={false} onBlur={evt =>
              {
                let value = evt.target.value;
                if(!value || value === ''){ value = '0'; }
                let valueInt = parseInt(value);
                if(valueInt < 0) valueInt = 0;
                this.onPropertyChange('maxGraphics', valueInt)
              }
              } />
            </div>
          </SettingRow>
        */}

      </SettingSection>
    )

    mapSelectorContent = (
      <SettingSection className='map-selector-section' title={this.i18nMessage('sourceDescript', 'map widget **')}>
        <SettingRow>
          <div className='map-selector-descript'>{this.i18nMessage('sourceDescript', 'set an interactive map **')}</div>
        </SettingRow>
        <SettingRow>
          <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.props.useMapWidgetIds} />
        </SettingRow>
      </SettingSection>
    )

    if (this.state.useMapWidget) {
      setDataContent = mapSelectorContent
    } else {
      setDataContent = dataSourceSelectorContent
    }

    let styleContent
    let styleTypeContent
    let unitContent
    if (this.state.popupHasTextContent) {
      styleTypeContent = (
        <Select size='sm' value={this.props.config && this.props.config.styleType} onChange={this.onStyleTypeChanged} className=''>
          {/* <option key={1} value={StyleType.syncWithTheme}><FormattedMessage id="syncWithTheme" defaultMessage={defaultMessages.syncWithTheme}/></option> */}
          <option key={2} value={StyleType.usePopupDefined}><FormattedMessage id='respectTheSource' defaultMessage={defaultMessages.respectTheSource} /></option>
          <option key={3} value={StyleType.custom}><FormattedMessage id='custom' defaultMessage='abc' /></option>
        </Select>
      )
    }
    if (this.props.config.styleType === 'custom') {
      if (this.props.config.style.fontSizeType === FontSizeType.custom) {
        unitContent = (
          <InputUnit
            style={{ width: '6.5rem' }} units={[DistanceUnits.PIXEL, DistanceUnits.PERCENTAGE]} className='item' min={1} value={this.getStyleConfig().fontSize as LinearUnit}
            onChange={this.onFontSizeChanged}
          />
        )
      } else {
        unitContent = (
          <Button style={{ width: '6.5rem' }} disabled size='sm'>
            <FormattedMessage id='auto' defaultMessage='Auto' />
          </Button>
        )
      }

      styleContent = (
        <div>
          <SettingRow
            className='mt-4'
            label={<FormattedMessage id='textSize' defaultMessage={defaultMessages.textSize} />}
            aria-label={this.i18nMessage('textSize')}
            role="group"
          >
            <ButtonGroup>
              <Dropdown activeIcon className='dropdown'>
                <DropdownButton size='sm' style={{ width: 'auto' }} icon aria-haspopup="menu" />
                <DropdownMenu className='dropdown-menu' zIndex='55' alignment='start'>
                  <DropdownItem
                    key={1} active={this.props.config.style.fontSizeType === FontSizeType.auto}
                    onClick={this.onSelectAutoFontSizeType}
                  >
                    <FormattedMessage id='auto' defaultMessage='Auto' />
                  </DropdownItem>
                  <DropdownItem
                    key={2} active={this.props.config.style.fontSizeType === FontSizeType.custom}
                    onClick={this.onSelectCustomFontSizeType}
                  >
                    <FormattedMessage id='custom' defaultMessage='Custom' />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {unitContent}
            </ButtonGroup>

          </SettingRow>
          <SettingRow label={<FormattedMessage id='textColor' defaultMessage='Text color' />}>
            <ThemeColorPicker specificTheme={this.props.theme2} value={this.getStyleConfig().textColor} onChange={value => { this.onStyleChanged('textColor', value) }} aria-label={this.i18nMessage('textColor')}/>
          </SettingRow>
        </div>
      )
    }

    return (
      <div css={getStyle(this.props.theme)}>
        <div className='widget-setting-featureInfo'>

          {setDataContent}

          <SettingSection title={this.i18nMessage('detailOptions')} aria-label={this.i18nMessage('detailOptions')} role="group">
            <div className='featureInfo-options-part'>
              <SettingRow label={<FormattedMessage id='title' defaultMessage='Title' />}>
                <Checkbox
                  className='can-x-switch' disabled={!this.getCapabilities().supportsTitle} checked={this.props.config && this.props.config.title}
                  data-key='title' onChange={evt => { this.onOptionsChanged(evt.target.checked, 'title') }}
                  aria-label={this.i18nMessage('title')}
                />
              </SettingRow>
              <SettingRow label={<FormattedMessage id='content' defaultMessage={defaultMessages.content} />}>
                <Checkbox
                  className='can-x-switch' checked={this.props.config && this.props.config.fields}
                  data-key='content' onChange={evt => { this.onOptionsChanged(evt.target.checked, 'fields') }}
                  aria-label={this.i18nMessage('content')}
                />
              </SettingRow>
              <SettingRow label={<FormattedMessage id='media' defaultMessage={defaultMessages.media} />}>
                <Checkbox
                  className='can-x-switch' disabled={!this.getCapabilities().supportsMedia} checked={this.props.config && this.props.config.media}
                  data-key='media' onChange={evt => { this.onOptionsChanged(evt.target.checked, 'media') }}
                  aria-label={this.i18nMessage('media')}
                />
              </SettingRow>
              <SettingRow label={<FormattedMessage id='attachments' defaultMessage={defaultMessages.attachments} />}>
                <Checkbox
                  className='can-x-switch' disabled={!this.getCapabilities().supportsAttachment} checked={this.props.config && this.props.config.attachments}
                  data-key='attachments' onChange={evt => { this.onOptionsChanged(evt.target.checked, 'attachments') }}
                  aria-label={this.i18nMessage('attachments')}
                />
              </SettingRow>
              <SettingRow label={<FormattedMessage id='lastEditInfo' defaultMessage={defaultMessages.lastEditInfo} />}>
                <Checkbox
                  className='can-x-switch' disabled={!this.getCapabilities().supportsChangeTracking} checked={this.props.config && this.props.config.lastEditInfo}
                  data-key='lastEditInfo' onChange={evt => { this.onOptionsChanged(evt.target.checked, 'lastEditInfo') }}
                  aria-label={this.i18nMessage('lastEditInfo')}
                />
              </SettingRow>
            </div>
          </SettingSection>

          <SettingSection title={this.i18nMessage('style')} aria-label={this.i18nMessage('style')} role="group">
            {styleTypeContent}
            {styleContent}
            {/* <SettingRow label={<FormattedMessage id="background" defaultMessage={'Background'}/>}>
              <ThemeColorPicker specificTheme={this.props.theme2} value={this.getStyleConfig().backgroundColor} onChange={value => this.onStyleChanged('backgroundColor', value)} ></ThemeColorPicker>
            </SettingRow> */}
          </SettingSection>

          <SettingSection title={this.i18nMessage('general')} aria-label={this.i18nMessage('general')} role="group">
            <label className='second-header'><FormattedMessage id='noDataMessage' defaultMessage={defaultMessages.noDataMessage} /></label>
            <TextArea
              aria-label={this.i18nMessage('noDataMessage')}
              className='w-100' name='text' id='noDeataMessageDefaultText'
              defaultValue={this.props.config.noDataMessage || this.i18nMessage('noDeataMessageDefaultText')}
              onBlur={evt => { this.onPropertyChange('noDataMessage', evt.target.value) }}
            />
          </SettingSection>

          {optionsContent}
        </div>
      </div>
    )
  }
}
