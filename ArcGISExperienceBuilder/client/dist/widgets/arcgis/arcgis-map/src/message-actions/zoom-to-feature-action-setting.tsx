/** @jsx jsx */
import {
  React, css, jsx, type ActionSettingProps, type SerializedStyles, type ImmutableObject,
  type IMThemeVariables, polished, getAppStore, Immutable, type UseDataSource, MessageType, CONSTANTS, AllDataSourceTypes
} from 'jimu-core'
import { Radio, NumericInput } from 'jimu-ui'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector, DEFAULT_DATA_VIEW_ID } from 'jimu-ui/advanced/data-source-selector'
import defaultMessages from '../setting/translations/default'
import { withTheme } from 'jimu-theme'
import { type ActionConfig, checkOutActionConfig, getUseDataSourceInfo, getDsByWidgetId, getAppConfig } from './action-utils'

interface ExtraProps {
  theme?: IMThemeVariables
}

interface States {
  isShowLayerList: boolean
  disableDataTrigger: boolean
}

interface Config extends ActionConfig {
  //useDataSource: UseDataSource
  //useDataSources?: UseDataSource[]
  isUseCustomZoomToOption?: boolean
  zoomToOption?: {
    scale: number
  }
}

export type IMConfig = ImmutableObject<Config>

const DSSelectorTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

class _ZoomToFeatureActionSetting extends React.PureComponent<ActionSettingProps<IMConfig> & ExtraProps, States> {
  NoLockTriggerLayerWidgets = ['Map']

  modalStyle: any = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '259px',
    height: 'auto',
    borderRight: '',
    borderBottom: '',
    paddingBottom: '1px'
  }

  constructor (props) {
    super(props)

    this.modalStyle.borderRight = '1px solid black'
    this.modalStyle.borderBottom = '1px solid black'

    this.state = {
      isShowLayerList: false,
      disableDataTrigger: props.messageType === MessageType.DataRecordSetChange
    }
  }

  static defaultProps = {
    config: Immutable({
      useDataSource: null
    })
  }

  componentDidMount () {
    //const initConfig = this.getInitConfig()
    const initConfig = checkOutActionConfig(this.props.config, this.props.messageWidgetId, this.props.messageType)

    let config = this.props.config.set('useDataSource', initConfig.useDataSource)
    config = config.set('useDataSources', initConfig.useDataSources)

    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: config
    })
  }

  getStyle (theme: IMThemeVariables): SerializedStyles {
    return css`
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .deleteIcon {
        cursor: pointer;
        opacity: .8;
      }

      .deleteIcon:hover {
        opacity: 1;
      }
    `
  }

  handleTriggerLayerChange = (useDataSources: UseDataSource[]) => {
    if (useDataSources && useDataSources.length > 0) {
      this.handleTriggerLayerSelected(useDataSources)
    } else {
      this.handleRemoveLayerForTriggerLayer()
    }
  }

  handleTriggerLayerSelected = (currentSelectedDs: UseDataSource[]) => {
    // messageWidgetUseDataSources is widgets.widget_2.useDataSources.
    const messageWidgetUseDataSources = getDsByWidgetId(this.props.messageWidgetId, this.props.messageType)

    let finalSelectedDs = null

    const appConfig = getAppConfig()
    const widgetsInfo = appConfig?.widgets
    const messageWidgetInfo = widgetsInfo && widgetsInfo[this.props.messageWidgetId]
    if (this.props.messageType === MessageType.DataRecordsSelectionChange && messageWidgetInfo && messageWidgetInfo.uri && messageWidgetInfo.uri.includes('arcgis-map')) {
      // Map widget supports publishing 'EXTENT_CHANGE' and 'DATA_RECORDS_SELECTION_CHANGE' messages and Map widget only stores WebMap or WebScene data sources in useDataSources.
      // So if the message widget is Map widget, we can't filter messageWidgetUseDataSources (WebMap or WebScene ds) by currentSelectedDs(layer ds).
      finalSelectedDs = currentSelectedDs
    } else {
      // The following code logic will filter messageWidgetUseDataSources by currentSelectedDs.
      // supports data view
      // finalSelectedDs is used to update appConfig.messageConfigs.messageConfig_1.actions[0].config.useDataSources and we must make sure finalSelectedDs is the subset of messageWidgetUseDataSources.
      // When the user selects a new data source from the DataSourceSelector, the DataSourceSelector.onChange(currentSelectedDs) event will be triggered.
      // currentSelectedDs contains the newly selected data source, but the newly selected data source must be the default view.
      // But the useDataSources configured in the widget may not be default view, so we can't use currentSelectedDs as finalSelectedDs directly.
      // To make sure finalSelectedDs is the subset of messageWidgetUseDataSources, it is necessary to filter messageWidgetUseDataSources by currentSelectedDs.
      finalSelectedDs = messageWidgetUseDataSources.filter(messageWidgetUseDataSource => {
        const dataSource = currentSelectedDs.find(ds => {
          if ((!ds.dataViewId || ds.dataViewId === CONSTANTS.OUTPUT_DATA_VIEW_ID) && !this.props.config.useDataSources?.find(preDs => ds.mainDataSourceId === preDs.mainDataSourceId)) {
            // select ds from ds list
            return ds.mainDataSourceId === messageWidgetUseDataSource.mainDataSourceId
          } else {
            // select ds from data view check box
            return ds.dataSourceId === messageWidgetUseDataSource.dataSourceId
          }
        })

        if (dataSource) {
          return true
        } else {
          return false
        }
      })
    }

    let config = this.props.config.set('useDataSource', finalSelectedDs[0])
    // supports multiple trigger
    config = config.set('useDataSources', finalSelectedDs)
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: config
    })
  }

  handleRemoveLayerForTriggerLayer = () => {
    let config = this.props.config.set('useDataSource', null)
    // supports multiple trigger
    config = config.set('useDataSources', [])
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: config
    })
  }

  handleIsUseCustomZoomToOption = (isUseCustomZoomToOption: boolean) => {
    if (isUseCustomZoomToOption) {
      if (!this.props.config.zoomToOption || !this.props.config.zoomToOption.scale) {
        this.props.onSettingChange({
          actionId: this.props.actionId,
          config: this.props.config.set('isUseCustomZoomToOption', isUseCustomZoomToOption).setIn(['zoomToOption', 'scale'], 5000)
        })
        return
      }
    }

    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('isUseCustomZoomToOption', isUseCustomZoomToOption)
    })
  }

  handleSetCustomZoomScale = (value) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.setIn(['zoomToOption', 'scale'], value)
    })
  }

  getTriggerLayerContent = () => {
    //const triggerDsSelectorSourceData = this.getDsSelectorSourceData(this.props.messageWidgetId, this.props.config.useDataSource, this.props.config.useDataSources)
    const triggerDsSelectorSourceData = getUseDataSourceInfo(this.props.messageWidgetId, this.props.config.useDataSource, this.props.config.useDataSources, this.props.messageType)

    let useDataSources
    if (this.checkIsSupportMultipleTriggerDataSources(this.props.messageWidgetId) || triggerDsSelectorSourceData.useDataSources) {
      useDataSources = Immutable(triggerDsSelectorSourceData.useDataSources)
    } else {
      useDataSources = triggerDsSelectorSourceData.useDataSource ? Immutable([triggerDsSelectorSourceData.useDataSource]) : Immutable([])
    }
    const isDisableDataView = this.checkIsDisableDataView(this.props.messageWidgetId)
    const isDisableDataSourceList = triggerDsSelectorSourceData.isReadOnly && isDisableDataView
    // if DataSourceSelector.props.disableDataSourceList is true, means DataSourceSelector's 'Select data' button is disabled.
    return (
      <DataSourceSelector
        types={DSSelectorTypes}
        useDataSources={useDataSources}
        fromRootDsIds={triggerDsSelectorSourceData.fromRootDsIds}
        fromDsIds={triggerDsSelectorSourceData.fromDsIds}
        hideAddDataButton
        hideTypeDropdown
        mustUseDataSource
        disableRemove={() => triggerDsSelectorSourceData.isReadOnly}
        disableDataSourceList={isDisableDataSourceList}
        onChange={this.handleTriggerLayerChange}
        widgetId={this.props.messageWidgetId}
        disableDataView={false}
        hideDataView={((dataViewJson, mainDataSourceId) => {
          const messageWidgetUseDataSources = getDsByWidgetId(this.props.messageWidgetId, this.props.messageType)
          const filteredMessageWidgetUseDataSources = messageWidgetUseDataSources.filter(messageWidgetUseDataSource => {
            return messageWidgetUseDataSource.mainDataSourceId === mainDataSourceId
          })
          const targetDsView = filteredMessageWidgetUseDataSources.find(messageWidgetUseDataSource => {
            let messageWidgetUseDataSourceDataViewId
            if (messageWidgetUseDataSource.dataViewId) {
              messageWidgetUseDataSourceDataViewId = messageWidgetUseDataSource.dataViewId
            } else {
              messageWidgetUseDataSourceDataViewId = DEFAULT_DATA_VIEW_ID
            }
            return messageWidgetUseDataSourceDataViewId === dataViewJson.id
          })
          return !targetDsView
        })}
        isMultiple={this.checkIsSupportMultipleTriggerDataSources(this.props.messageWidgetId)}
        isMultipleDataView={true}
        hideCreateViewButton
        enableToSelectOutputDsFromSelf={true}
      />
    )
  }

  checkIsSupportMultipleTriggerDataSources = (widgetId: string): boolean => {
    const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    const widgetJson = appConfig?.widgets?.[widgetId]
    const messageWidgetUseDataSources = getDsByWidgetId(this.props.messageWidgetId, this.props.messageType)
    const widgetLabel = widgetJson?.manifest?.label
    if (widgetLabel === 'Map') {
      return true
    } else {
      if (messageWidgetUseDataSources.length > 1) {
        return this.props.messageType === MessageType.DataSourceFilterChange || this.props.messageType === MessageType.DataRecordsSelectionChange
      } else {
        return false
      }
    }
  }

  checkIsDisableDataView = (widgetId: string): boolean => {
    if (this.props.messageType === MessageType.DataRecordsSelectionChange) {
      return true
    }
    //const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    //const widgetJson = appConfig?.widgets?.[widgetId]
    //if (widgetJson) {
    //  const widgetLabel = widgetJson?.manifest?.label
    //  if (widgetLabel === 'Map') {
    //    return true
    //  } else {
    //    return false
    //  }
    //} else {
    //  return false
    //}
  }

  render () {
    return (
      <div css={this.getStyle(this.props.theme)}>
        {!this.state.disableDataTrigger && <SettingSection title={this.props.intl.formatMessage({ id: 'mapAction_TriggerLayer', defaultMessage: defaultMessages.mapAction_TriggerLayer })}>
          {this.getTriggerLayerContent()}
        </SettingSection>}
        <SettingSection title={this.props.intl.formatMessage({ id: 'mapZoomToAction_ZoomScale', defaultMessage: defaultMessages.mapZoomToAction_ZoomScale })}>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} checked={!this.props.config.isUseCustomZoomToOption}
                  onChange={() => { this.handleIsUseCustomZoomToOption(false) }}
                />
                <label className='m-0 ml-2' style={{ cursor: 'pointer' }}>
                  {this.props.intl.formatMessage({ id: 'mapZoomToAction_Automatic', defaultMessage: defaultMessages.mapZoomToAction_Automatic })}
                </label>
              </div>
            </div>
          </SettingRow>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} checked={this.props.config.isUseCustomZoomToOption}
                  onChange={() => { this.handleIsUseCustomZoomToOption(true) }}
                />
                <label className='m-0 ml-2' style={{ cursor: 'pointer' }}>
                  {this.props.intl.formatMessage({ id: 'mapZoomToAction_Custom', defaultMessage: defaultMessages.mapZoomToAction_Custom })}
                </label>
              </div>
            </div>
          </SettingRow>
          {this.props.config.isUseCustomZoomToOption && <SettingRow>
            <NumericInput
              className='w-100' placeholder={this.props.intl.formatMessage({ id: 'mapZoomToAction_TypeScale', defaultMessage: defaultMessages.mapZoomToAction_TypeScale })}
              value={this.props.config.zoomToOption && this.props.config.zoomToOption.scale}
              onChange={this.handleSetCustomZoomScale}
            />
          </SettingRow>}
        </SettingSection>
      </div>
    )
  }
}

export default withTheme(_ZoomToFeatureActionSetting)
