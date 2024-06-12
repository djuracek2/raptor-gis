/** @jsx jsx */
import {
  jsx,
  React,
  DataSourceManager,
  defaultMessages as jimuCoreDefaultMessages,
  type DataSourceJson,
  DataSourceTypes,
  type DataSourceSchema,
  JimuFieldType,
  type FieldSchema,
  classNames,
  getAppStore,
  JimuMapViewStatus,
  type UseDataSource
} from 'jimu-core'
import { BaseWidgetSetting, type AllWidgetSettingProps } from 'jimu-for-builder'
import {
  Tooltip,
  Alert,
  Label,
  defaultMessages as jimuUIDefaultMessages
} from 'jimu-ui'
import {
  MapWidgetSelector,
  SettingSection,
  SettingRow,
  MultipleJimuMapConfig
} from 'jimu-ui/advanced/setting-components'
import { type IMConfig } from '../config'
import defaultMessages from './translations/default'
import { type JimuMapView, MapViewManager } from 'jimu-arcgis'
import { getStyle, getStyleForLI } from './lib/style'
import type WebMap from 'esri/WebMap'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { defaultConfiguration, traceInformation } from './constants'
import TraceResultArea from './components/trace-result-area'
import { getOutputDataSourceId, getPortalUnit, waitForChildDataSourcesReady } from '../common/utils'

interface State {
  activeDataSource: string
  isNoMapSelected: boolean
  mapWidgetExists: boolean
  showTraceItemPanel: boolean
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, State> {
  dsRef = React.createRef<HTMLDivElement>()
  readonly mvManager: MapViewManager = MapViewManager.getInstance()
  private dataSourceOptions = []
  private _mapLoadedTimer = null
  constructor (props) {
    super(props)
    this.state = {
      activeDataSource: null,
      isNoMapSelected: !this.props.config.useMapWidget,
      mapWidgetExists: true,
      showTraceItemPanel: false
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  resetConfig = () => {
    //Reset config parameters
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('configInfo', {}),
      useDataSources: []
    }, [])
  }

  componentDidMount () {
    //Compare the saved data with current map view data sources
    //and filter out the data sources which are not available in the map view
    //this will make sure to remove the data sources which are not available in the map view
    //populate configured data sources for map
    let isNoneMapSelected: boolean
    if (this.props.useMapWidgetIds && this.props.useMapWidgetIds.length > 0) {
      const useMapWidget = this.props.useMapWidgetIds?.[0]
      const appConfig = getAppStore().getState().appStateInBuilder.appConfig
      const mapWidgetAvailable = appConfig.widgets?.[useMapWidget]
      if (!mapWidgetAvailable) {
        this.resetConfig()
        isNoneMapSelected = true
      } else {
        isNoneMapSelected = false
        this.getAvailableDataSources(this.props.useMapWidgetIds)
        //expose trace result area ouput statistics datasource in case of backward compatibility
        const outputDsJsons: DataSourceJson[] = [this.getInitOutDataSource()]
        setTimeout(() => {
          this.props.onSettingChange({
            id: this.props.id,
            config: this.props.config
          }, outputDsJsons)
        }, 100)
      }
    } else { //display the warning message to select the webmap or webscene
      isNoneMapSelected = true
    }
    this.updateConfigForMapWidget(isNoneMapSelected)
  }

  componentDidUpdate = (prevProps) => {
    //check if the widget label is changed from the config
    if (prevProps.label !== this.props.label) {
      const outputDsJsons: DataSourceJson[] = [this.getInitOutDataSource()]
      setTimeout(() => {
        this.props.onSettingChange({
          id: this.props.id
        }, outputDsJsons)
      }, 100)
    }
  }

  onMapWidgetSelected = async (useMapWidgetIds: string[]) => {
    this.resetConfig()
    setTimeout(() => {
      this.props.onSettingChange({
        id: this.props.id,
        useMapWidgetIds: useMapWidgetIds
      })
    }, 100)

    let isNoneMapSelected: boolean
    if (useMapWidgetIds.length > 0) {
      isNoneMapSelected = false
      await this.getAvailableDataSources(useMapWidgetIds)
      // Let framework know which data source current widget is using and which data source current widget is outputing.
      const outputDsJsons: DataSourceJson[] = [this.getInitOutDataSource()]
      this.props.onSettingChange({
        id: this.props.id
      }, outputDsJsons)
    } else {
      //display the warning message to select the webmap or webscene
      isNoneMapSelected = true
    }
    this.updateConfigForMapWidget(isNoneMapSelected)
  }

  /**
   * Get initial schema for the trace result area
   * @param label initially set empty string label
   * @param updatedConfigInfo updated config info
   * @returns DataSourceSchema of the trace result area
   */
  getInitSchema = (label: string = '', updatedConfigInfo: IMConfig): DataSourceSchema => {
    const fields: any = {}
    const traceFields: FieldSchema[] = []
    traceFields.push({
      alias: 'OBJECTID',
      type: JimuFieldType.Number,
      jimuName: 'OBJECTID',
      name: 'OBJECTID'
    })

    traceInformation.forEach((trace) => {
      const areaUnit = updatedConfigInfo?.configInfo?.[this.state.activeDataSource]?.traceResultAreaSettings?.resultAreaProperties?.areaUnit || 'square-feet'
      if (trace.value === 'areaStatistic') {
        if (areaUnit === 'square-miles') {
          traceFields.push({
            alias: this.nls(trace.value) + '(' + this.nls('unitsLabelSquareMiles') + ')',
            type: JimuFieldType.Number,
            jimuName: trace.value,
            name: trace.value
          })
        } else if (areaUnit === 'square-meters') {
          traceFields.push({
            alias: this.nls(trace.value) + '(' + this.nls('unitsLabelSquareMeters') + ')',
            type: JimuFieldType.Number,
            jimuName: trace.value,
            name: trace.value
          })
        } else if (areaUnit === 'square-feet') {
          traceFields.push({
            alias: this.nls(trace.value) + '(' + this.nls('unitsLabelSquareFeet') + ')',
            type: JimuFieldType.Number,
            jimuName: trace.value,
            name: trace.value
          })
        } else if (areaUnit === 'square-kilometers') {
          traceFields.push({
            alias: this.nls(trace.value) + '(' + this.nls('unitsLabelSquareKilometers') + ')',
            type: JimuFieldType.Number,
            jimuName: trace.value,
            name: trace.value
          })
        }
      } else if (trace.value === 'version' || trace.value === 'elementCount') {
        traceFields.push({
          alias: this.nls(trace.value),
          type: JimuFieldType.Number,
          jimuName: trace.value,
          name: trace.value
        })
      } else {
        traceFields.push({
          alias: this.nls(trace.value),
          type: JimuFieldType.String,
          jimuName: trace.value,
          name: trace.value
        })
      }
    })

    traceFields?.forEach((fieldSchema, index) => {
      fields[fieldSchema?.jimuName] = fieldSchema
      if (index === 0) {
        fields.OBJECTID = fieldSchema
      }
    })

    return {
      label,
      idField: 'OBJECTID',
      fields: fields
    } as DataSourceSchema
  }

  /**
   * Get the output data sources for trace result area
   * @param updatedConfigInfo updated config info
   * @returns output data sources json
   */
  getInitOutDataSource = (updatedConfigInfo?: IMConfig) => {
    const messages = Object.assign({}, jimuUIDefaultMessages)
    const dsLabel = this.props.intl.formatMessage({ id: 'outputStatistics', defaultMessage: messages.outputStatistics },
      { name: this.props.label + ' ' + this.nls('resultAreaLabel') })
    const dsId = getOutputDataSourceId(this.props.widgetId)
    const schema = this.getInitSchema(dsLabel, updatedConfigInfo || this.props.config)

    const outputDsJson: DataSourceJson = {
      id: dsId,
      type: DataSourceTypes.FeatureLayer,
      label: dsLabel,
      geometryType: 'esriGeometryPolygon',
      originDataSources: [],
      isOutputFromWidget: true,
      isDataInDataSourceInstance: false,
      schema
    }

    return outputDsJson
  }

  updateConfigForMapWidget = (isMapWidgetAvailable: boolean) => {
    this.setState(
      {
        mapWidgetExists: !isMapWidgetAvailable,
        isNoMapSelected: isMapWidgetAvailable
      },
      () => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('useMapWidget', !isMapWidgetAvailable)
        })
      }
    )
  }

  getAvailableDataSources = async (useMapWidgetIds) => {
    const mapViewGroups = this.mvManager.getJimuMapViewGroup(useMapWidgetIds)
    this.dataSourceOptions = []
    //Create data sources on the basis of active webmap/webscene
    if (mapViewGroups && mapViewGroups.jimuMapViews) {
      if (this._mapLoadedTimer) {
        clearTimeout(this._mapLoadedTimer)
      }
      for (const id in mapViewGroups.jimuMapViews) {
        if (mapViewGroups.jimuMapViews[id].dataSourceId) {
          if (mapViewGroups.jimuMapViews[id].status === JimuMapViewStatus.Loaded) {
            if (
              mapViewGroups.jimuMapViews[id].isActive ||
              mapViewGroups.jimuMapViews[id].isActive === undefined
            ) {
              this.setState({
                activeDataSource: mapViewGroups.jimuMapViews[id].dataSourceId
              })
            }
            const jimuMapView = MapViewManager.getInstance().getJimuMapViewById(mapViewGroups.jimuMapViews[id].id)
            await waitForChildDataSourcesReady(jimuMapView).finally(async () => {
              //check if each view has valid traces
              const valid = await this.checkIfMapViewHasTraces(
                mapViewGroups.jimuMapViews[id]
              )

              this.dataSourceOptions.push({
                label: this.getDataSourceLabel(
                  mapViewGroups.jimuMapViews[id].dataSourceId
                ),
                value: mapViewGroups.jimuMapViews[id].dataSourceId,
                isValid: valid,
                dataSource: mapViewGroups.jimuMapViews[id]
              })

              //get traces if valid
              if (valid) {
                const dsManager = DataSourceManager.getInstance()
                const dataSources = dsManager?.getDataSource(mapViewGroups.jimuMapViews[id].dataSourceId)?.getChildDataSources()
                const allLayerSources: UseDataSource[] = []
                dataSources?.forEach((layer: any) => {
                  let createUseDs: UseDataSource
                  if (layer.type === 'GROUP_LAYER') {
                    const subLayers = layer.getChildDataSources()
                    if (subLayers) {
                      subLayers.forEach((subLayer: any) => {
                        if (subLayer.layerDefinition?.type !== 'Table') {
                          createUseDs = {
                            dataSourceId: subLayer?.id,
                            mainDataSourceId: subLayer?.id,
                            rootDataSourceId: mapViewGroups.jimuMapViews[id].dataSourceId
                          }
                          allLayerSources.push(createUseDs)
                        }
                      })
                    }
                  } else {
                    if (layer.layerDefinition?.type !== 'Table') {
                      createUseDs = {
                        dataSourceId: layer?.id,
                        mainDataSourceId: layer?.id,
                        rootDataSourceId: mapViewGroups.jimuMapViews[id].dataSourceId
                      }
                      allLayerSources.push(createUseDs)
                    }
                  }
                })
                //save the created usedatasources array in the config
                this.props.onSettingChange({
                  id: this.props.id,
                  useDataSources: allLayerSources
                })

                const traces = await this.getTracesInMapView(
                  mapViewGroups.jimuMapViews[id]
                )
                if (traces.length > 0) {
                  this.setConfigForSelectedDs(mapViewGroups.jimuMapViews[id].dataSourceId)
                }
              }
            })
          } else {
            this._mapLoadedTimer = setTimeout(() => {
              this.getAvailableDataSources(useMapWidgetIds)
            }, 50)
          }
        }
      }
    } else {
      this._mapLoadedTimer = setTimeout(() => {
        this.getAvailableDataSources(useMapWidgetIds)
      }, 50)
    }
  }

  // public support functions
  checkIfMapViewHasTraces = (jmv: JimuMapView) => {
    let valid: boolean = false
    let UNloaded = true
    const view = jmv.view
    return view.when().then(() => {
      const map = view.map as WebMap
      // eslint-disable-next-line
      if (map.hasOwnProperty('utilityNetworks')) {
        if (map.utilityNetworks !== null) {
          const un = map.utilityNetworks.getItemAt(0)
          un.load().catch(() => { UNloaded = false })
          if (UNloaded) {
            // eslint-disable-next-line
            if (un.hasOwnProperty('sharedNamedTraceConfigurations')) {
              if (un.sharedNamedTraceConfigurations.length > 0) {
                valid = true
              }
            }
          }
        }
      }
      return valid
    })
  }

  getTracesInMapView = async (jmv: JimuMapView) => {
    const view = jmv.view
    let traces = []
    return view.when().then(async () => {
      const map = view.map as WebMap
      // eslint-disable-next-line
      if (map.hasOwnProperty('utilityNetworks')) {
        if (map.utilityNetworks !== null) {
          const un = map.utilityNetworks.getItemAt(0)
          await un.load()
          // eslint-disable-next-line
          if (un.hasOwnProperty('sharedNamedTraceConfigurations')) {
            traces = un.sharedNamedTraceConfigurations
          }
          return traces
        }
      }
      return traces
    })
  }

  getDataSourceLabel = (dataSourceId: string): string => {
    if (!dataSourceId) {
      return ''
    }
    const dsObj = DataSourceManager.getInstance().getDataSource(dataSourceId)
    const label = dsObj.getLabel()
    return label || dataSourceId
  }

  /**
   * Set default config for selected active datasource
   * @param activeDataSource active datasource
   */
  setConfigForSelectedDs = (activeDataSource: string) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.props.config.configInfo.hasOwnProperty(activeDataSource)) {
      const config = defaultConfiguration
      config.traceResultAreaSettings.resultAreaProperties.unit = getPortalUnit()
      config.traceResultAreaSettings.resultAreaProperties.areaUnit = 'square-' + getPortalUnit()
      //If config is open for the first time then create the default config
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.setIn(['configInfo', activeDataSource], config)
      })
    }
  }

  /**
   * Check if the added datasource is valid for the further functionality
   * @param dataSourceId added datasource id
   * @returns validity of datasources
   */
  isDataSourceValid = (dataSourceId: string): boolean => {
    if (this.dataSourceOptions.length === 0) return false
    if (this.dataSourceOptions[0]?.value === dataSourceId) return this.dataSourceOptions[0]?.isValid
    if (this.dataSourceOptions.length > 0) {
      if (this.dataSourceOptions[1]?.value === dataSourceId) return this.dataSourceOptions[1]?.isValid
    }
  }

  /**
  Show data source settings in sidepopper
  */
  showDsPanel = (dataSourceId: string) => {
    this.setState({
      activeDataSource: dataSourceId,
      showTraceItemPanel: false
    }, () => {
      this.setState({
        showTraceItemPanel: true
      })
    })
  }

  /**
   * On change of settings, update the trace result area settings
   * @param property trace result properties
   * @param value values of each property
   */
  updateResultAreaSettings = (property: string, value: boolean | __esri.ResultAreaPropertiesExtend) => {
    const updatedConfigInfo = this.props.config.setIn(['configInfo', this.state.activeDataSource, 'traceResultAreaSettings', property], value)
    //update output datasource json according to new config json
    const outputDsJsons: DataSourceJson[] = [this.getInitOutDataSource(updatedConfigInfo)]
    this.props.onSettingChange({
      id: this.props.id,
      config: updatedConfigInfo
    }, outputDsJsons)
  }

  render () {
    return (
      <div css={getStyle(this.props.theme)}>
        <div className={'widget-setting-utility-trace'}>
          <SettingSection
            className={classNames('map-selector-section', { 'border-0': this.state.isNoMapSelected })}
            title={this.nls('sourceLabel')}>
            <SettingRow>
              <Label
                tabIndex={0}
                aria-label={this.nls('selectMapWidget')}
                title={this.nls('selectMapWidget')}
                className="w-100 d-flex">
                <div className="text-truncate flex-grow-1 setting-text-level-3">
                  {this.nls('selectMapWidget')}
                </div>
              </Label>
              <Tooltip
                role={'tooltip'}
                tabIndex={0}
                aria-label={this.nls('selectMapWidgetHint')}
                title={this.nls('selectMapWidgetHint')}
                showArrow
                placement="top">
                <div className="ml-2 d-inline ep-tooltip">
                  <InfoOutlined size="m" />
                </div>
              </Tooltip>
            </SettingRow>
            <SettingRow>
              <MapWidgetSelector
                onSelect={this.onMapWidgetSelected.bind(this)}
                useMapWidgetIds={this.props.useMapWidgetIds}
              />
            </SettingRow>
          </SettingSection>

          {this.props.useMapWidgetIds && this.props.useMapWidgetIds.length > 0 && this.state.mapWidgetExists &&
            <SettingSection>
              <SettingRow>
                <Label tabIndex={0} aria-label={this.nls('dataConfigLabel')} title={this.nls('dataConfigLabel')}
                  className='w-100 d-flex'>
                  <div className='text-truncate flex-grow-1 color-label setting-text-level-0'>
                    {this.nls('dataConfigLabel')}
                  </div>
                </Label>
              </SettingRow>
              <SettingRow>
                <Label tabIndex={0} aria-label={this.nls('mapSettingsHintMsg')} className='w-100 d-flex'>
                  <div className='flex-grow-1 text-break setting-text-level-3'>
                    {this.nls('mapSettingsHintMsg')}
                  </div>
                </Label>
              </SettingRow>
              <SettingRow>
                {this.dataSourceOptions.length > 0 &&
                  <div className='w-100'>
                    <MultipleJimuMapConfig
                      mapWidgetId={this.props.useMapWidgetIds?.[0]}
                      onClick={this.showDsPanel}
                      disableSwitchMap={true}
                      isDataSourceValid={this.isDataSourceValid}
                      sidePopperContent={this.state.showTraceItemPanel &&
                        <React.Fragment>
                          {this.state.activeDataSource && this.props.config.configInfo[this.state.activeDataSource] &&
                            <div className="w-100 h-100" css={getStyleForLI(this.props.theme)}>
                              <div className='setting-container'>
                                  <SettingRow flow='wrap'>
                                    <TraceResultArea
                                      intl={this.props.intl}
                                      theme={this.props.theme}
                                      config={this.props.config.configInfo[this.state.activeDataSource].traceResultAreaSettings}
                                      onResultAreaSettingsUpdated={this.updateResultAreaSettings}
                                    />
                                  </SettingRow>
                              </div>
                            </div>
                          }
                        </React.Fragment>
                      }
                    />
                  </div>
                }
              </SettingRow>
              {this.props.config.useMapWidget && (this.dataSourceOptions.length <= 0) && (
                <SettingRow>
                  <Alert
                    tabIndex={0}
                    className={'warningMsg'}
                    onClose={function noRefCheck () { }}
                    open={true}
                    text={this.nls('warningNoMap')}
                    type={'warning'}
                  />
                </SettingRow>
              )}
            </SettingSection>
          }
        </div>
      </div>
    )
  }
}
