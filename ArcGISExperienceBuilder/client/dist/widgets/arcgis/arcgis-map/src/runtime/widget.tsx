/** @jsx jsx */
import {
  React, ReactDOM, css, jsx, getAppStore, type AllWidgetProps, SessionManager, type DataRecordSet, TimezoneConfig,
  utils, AppMode, type IMState, classNames, polished, ReactResizeDetector, MutableStoreManager, type IMUrlParameters
} from 'jimu-core'
import { type IMConfig } from '../config'
import MultiSourceMap from './components/multisourcemap'
import DefaultMap from './components/default-map'
import { type IFeature } from '@esri/arcgis-rest-types'
import { checkIsLive, type MapUrlHashParams } from './utils'
import {
  type JimuMapViewGroup, type ShowOnMapDatas, type AddToMapDatas, type JimuMapView, type JimuLayerView,
  DataChangeStatus, loadArcGISJSAPIModules, MapViewManager
} from 'jimu-arcgis'
import { ViewportVisibilityContext, PageVisibilityContext, ViewVisibilityContext } from 'jimu-layouts/layout-runtime'
import { versionManager } from '../version-manager'
import { Loading, LoadingType, Icon, DataActionList, DataActionListStyle } from 'jimu-ui'
import { type ZoomToFeatureActionValue } from '../message-actions/zoom-to-feature-action'
import { type PanToActionValue } from '../message-actions/pan-to-action'
import defaultMessages from './translations/default'

export interface ActionRelatedProps {
  zoomToFeatureActionValue?: ZoomToFeatureActionValue
  panToActionValue?: PanToActionValue
  newFeatureSetActionValue?: {
    value: { [layerID: string]: __esri.FeatureSet }
    promise?: Promise<any>
  }
  changedFeatureSetActionValue?: { [layerID: string]: __esri.FeatureSet }
  selectFeatureActionValue?: IFeature[] | __esri.Graphic[]
  flashActionValue?: {
    layerDataSourceId: string
    querySQL: string
  }
  filterActionValue?: {
    layerDataSourceId: string
    querySQL: string
  }
  showOnMapDatas?: ShowOnMapDatas
  addToMapDatas?: AddToMapDatas
}

interface ExtraMapWidgetProps {
  mutableStateProps?: ActionRelatedProps
  appMode: AppMode
  isPrintPreview: boolean
  queryObject: IMUrlParameters
  autoControlWidgetId: string
  isRunAppMode: boolean
  runtimeUrlHashParams: MapUrlHashParams
  mapTimeZone: string
}

export type MapWidgetProps = AllWidgetProps<IMConfig> & ExtraMapWidgetProps

interface State {
  startLoadModules: boolean
  widthBreakpoint: string
  widgetHeight: number
  isFullScreen: boolean
  dataActionDataSet: DataRecordSet
}

export default class Widget extends React.PureComponent<MapWidgetProps, State> {
  parentContainer: HTMLElement
  container: HTMLElement
  containerClientRect: ClientRect | DOMRect
  multiSourceMapInstance: MultiSourceMap = null
  activeJimuMapView: JimuMapView = null
  watchSelectedFeatureHandle: __esri.WatchHandle = null
  dataActionListContainer: HTMLElement = null
  reactiveUtils: typeof __esri.reactiveUtils = null
  popupDomNodeObserver: MutationObserver = null
  readonly warningIcon: string

  constructor (props) {
    super(props)
    this.warningIcon = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.09926 5.37004C7.04598 4.83729 7.46434 4.375 7.99975 4.375C8.53516 4.375 8.95353 4.83728 8.90025 5.37004L8.5495 8.87748C8.52126 9.15992 8.2836 9.375 7.99975 9.375C7.71591 9.375 7.47825 9.15992 7.45 8.87748L7.09926 5.37004Z" fill="#938500"/>
                        <path d="M7.99975 12.375C8.55204 12.375 8.99975 11.9273 8.99975 11.375C8.99975 10.8227 8.55204 10.375 7.99975 10.375C7.44747 10.375 6.99975 10.8227 6.99975 11.375C6.99975 11.9273 7.44747 12.375 7.99975 12.375Z" fill="#938500"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66642 14.375C0.9115 14.375 0.428811 13.5705 0.784067 12.9044L7.1174 1.02941C7.49387 0.323529 8.50564 0.323529 8.88211 1.02941L15.2154 12.9044C15.5707 13.5705 15.088 14.375 14.3331 14.375H1.66642ZM1.66642 13.375L7.99975 1.5L14.3331 13.375H1.66642Z" fill="#938500"/>
                        </svg>`
    this.state = {
      widthBreakpoint: null,
      widgetHeight: null,
      isFullScreen: false,
      dataActionDataSet: null
    } as State

    this.dataActionListContainer = document.createElement('div')
    this.dataActionListContainer.className = 'data-action-list-wrapper'

    this.loadReactiveUtils()
  }

  getWidgetSyle () {
    return css`
      .map-loading-bar {
        z-index: 8;
      }

      .map-warning-bar {
        z-index: 8;
        position: absolute;
        bottom: 4px;
        left: 4px;
        right: 4px;
        height: 35px;
        background: #fffdeb;
        border: 1px solid #fff592;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .warning-icon {
          width: 14px;
          margin: 0 12px 0 12px;
        }
      }

      .map-fix-layout {
        position: absolute !important;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
        pointer-events: none;
      }

      .hide-map-tools-layout .map-tool-layout{
        display: none;
      }

      .esri-view-root > .esri-ui {
        z-index: unset;
      }

      .esri-ui-manual-container .esri-swipe {
        z-index: 0;
      }

      .esri-ui .esri-popup {
        z-index: 9;
      }

      .data-action-list-wrapper {
        margin: 3px;
      }
    `
  }

  getStyle () {
    const theme = this.props.theme

    return css`
      position: relative;

      .map-is-live-mode {
        .exbmap-ui {
          pointer-events: auto !important;
        }

        .is-widget {
          pointer-events: auto !important;
        }
      }

      .widget-map-usemask {
        pointer-events: auto !important;
      }

      .map-is-design-mode {
        .exbmap-ui,
        .exbmap-ui-tool {
          pointer-events: none !important;
        }

        .is-widget {
          pointer-events: auto !important;
        }
      }

      .widget-map{
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        .overview-container{
          position: absolute;
          top: 12px;
          right: 12px;
          width: 300px;
          height: 200px;
          border: 1px solid black;
          z-index: 1;
        }

        .extent-container{
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          z-index: 2;
        }

        .extent-btn-container{
          button{
            outline: none;
          }
          .previous-extent-btn{
            color: #111;
          }
          .next-extent-btn{
            color: #222;
          }
        }
      }

      .mapswitch-container {
        position: absolute;
        z-index: 7;
        width: 32px;
        height: 32px;
        bottom: 10px;
        left: 10px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3)
      }

      .mapswitch-icon {
        fill: black;
        left: 8px;
        top: 8px;
        position: absolute;
        display: block;
      }

      .widget-map-background {
        background-color: ${theme.colors.white};
        position: absolute;
        z-index: 1;
      }

      .widget-map-crashed {
        background-color: ${polished.rgba(theme.colors.white, 0.85)};
        position: absolute;
        z-index: 1;
        top: 0;

        .widget-map-crashed-label-padding {
          padding-left: ${polished.rem(24)};
          padding-right: ${polished.rem(24)};
        }

        .widget-map-crashed-label {
          font-size: ${polished.rem(13)};
          color: ${theme.colors.black};
          font-weight: bold;
          text-align: center;
        }
      }

      @keyframes appear {
        0%{opacity:0}
        25%{opacity:.25}
        50%{opacity:.5;}
        75%{opacity:.75}
        100%{opacity:1;}
      }

      @keyframes disappear {
        0%{opacity:1}
        25%{opacity:.75}
        50%{opacity:.5;}
        75%{opacity:.25}
        100%{opacity:0;}
      }

      .multisourcemap-item-appear {
        animation: appear 300ms;
        -webkit-animation: appear 300ms;
        -moz-animation: appear 300ms;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
      }

      .multisourcemap-item-disappear {
        animation: disappear 300ms;
        -webkit-animation: disappear 300ms;
        -moz-animation: disappear 300ms;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
      }

      .multisourcemap-item-appear-noanimate {
        opacity: 1;
      }

      .multisourcemap-item-disappear-noanimate {
        opacity: 0;
      }
      `
  }

  static versionManager = versionManager

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): ExtraMapWidgetProps => {
    let autoControlWidgetId = ''

    const mapWidgetId = props.id

    if (state.mapWidgetsInfo && mapWidgetId) {
      autoControlWidgetId = state.mapWidgetsInfo[mapWidgetId]?.autoControlWidgetId || ''
    }

    const appMode = state && state.appRuntimeInfo && state.appRuntimeInfo.appMode
    const isRunAppMode = appMode === AppMode.Run

    let runtimeUrlHashParams: MapUrlHashParams = null

    if (isRunAppMode && state.urlHashObject) {
      runtimeUrlHashParams = state.urlHashObject[mapWidgetId]
    }

    // MapView.timeZone
    let mapTimeZone: string = ''

    const timeZoneInfo = state.appConfig?.attributes?.timezone

    if (timeZoneInfo) {
      // user sets timeZone info in ExB
      if (timeZoneInfo.type === TimezoneConfig.Device) {
        mapTimeZone = 'system'
      } else if (timeZoneInfo.type === TimezoneConfig.Specific) {
        mapTimeZone = timeZoneInfo.value
      } else if (timeZoneInfo.type === TimezoneConfig.Data) {
        // set mapTimeZone to empty, means we need to uses MapViewer's timeZone
        mapTimeZone = ''
      }
    } else {
      // if user doesn't set timeZone info in ExB, we should use 'system' for compatibility
      mapTimeZone = 'system'
    }

    return {
      appMode: appMode,
      isPrintPreview: state.appRuntimeInfo.isPrintPreview,
      queryObject: state.queryObject,
      autoControlWidgetId,
      isRunAppMode,
      runtimeUrlHashParams,
      mapTimeZone
    }
  }

  startRenderMap = () => {
    setTimeout(() => {
      this.setState({
        startLoadModules: true
      })
    }, 100)
  }

  componentDidMount () {
    if (!this.state.startLoadModules) {
      if (window.jimuConfig.isInBuilder || !this.props.config.canPlaceHolder) {
        this.startRenderMap()
      }
    }
  }

  componentDidUpdate (prevProps: MapWidgetProps, prevState: State) {
    // check if props.state changed or not
    const preWidgetState = prevProps.state
    const currWidgetState = this.props.state
    if (preWidgetState !== currWidgetState) {
      const jimuMapViews = this.getJimuMapViews()
      jimuMapViews.forEach((jimuMapView) => {
        jimuMapView.setMapWidgetState(currWidgetState)
      })
    }

    // check if props.config.showPopupUponSelection changed or not
    const preShowPopupUponSelection = !!(prevProps?.config?.showPopupUponSelection)
    const curShowPopupUponSelection = !!(this.props?.config?.showPopupUponSelection)

    if (preShowPopupUponSelection !== curShowPopupUponSelection) {
      const jimuMapViews = this.getJimuMapViews()
      jimuMapViews.forEach((jimuMapView) => {
        this.setShowPopupUponSelectionForJimuMapView(jimuMapView)
      })
    }

    // check if props.enableDataAction changed or not
    const preEnableDataAction = prevProps?.enableDataAction
    const currEnableDataAction = this.props.enableDataAction

    if (preEnableDataAction !== currEnableDataAction) {
      console.log('enableDataAction changed')
      this.handleDataActionWhenPopupSelectedFeatureChange(this.activeJimuMapView)
    }
  }

  componentWillUnmount () {
    const widgets = getAppStore().getState().appConfig.widgets
    document.removeEventListener('webkitfullscreenchange', this.fullScreenHanlder)
    document.removeEventListener('fullscreenchange', this.fullScreenHanlder)
    if (!widgets[this.props.id]) {
      MutableStoreManager.getInstance().updateStateValue(this.props.id, 'restoreData', null)
    }
  }

  getJimuMapViews (): JimuMapView[] {
    let jimuMapViews: JimuMapView[] = []

    const jimuMapViewGroup = MapViewManager.getInstance().getJimuMapViewGroup(this.props.id)

    if (jimuMapViewGroup) {
      jimuMapViews = jimuMapViewGroup.getAllJimuMapViews()
    }

    return jimuMapViews
  }

  getPlaceHolderImage = () => {
    let placeHolderImage = this.props.config.placeholderImage
    const session = SessionManager.getInstance().getMainSession()
    if (placeHolderImage) {
      // eslint-disable-next-line
      const isPortalThumbExp = new RegExp('^(.)+/sharing/rest/content/items/(.)+/info/(.)+')

      if (isPortalThumbExp.test(placeHolderImage)) {
        if (session) {
          placeHolderImage = placeHolderImage + `?token=${session.token}`
        } else {
          // eslint-disable-next-line no-self-assign
          placeHolderImage = placeHolderImage
        }
      }
    }

    return placeHolderImage
  }

  fullScreenHanlder = (event) => {
    if (!(document as any).fullscreenElement && !(document as any).webkitFullscreenElement) {
      this.setState({
        isFullScreen: false
      })
    }
  }

  fullScreenMap = () => {
    if (utils.isTouchDevice()) {
      // is touch device
      if (this.container.style.position === 'fixed') {
        this.container.style.height = `${this.containerClientRect.height}px`
        this.container.style.width = `${this.containerClientRect.width}px`
        this.container.style.top = `${this.containerClientRect.top}px`
        this.container.style.left = `${this.containerClientRect.left}px`

        setTimeout(() => {
          this.container.style.transition = null
          this.container.style.position = 'relative'
          this.container.style.height = '100%'
          this.container.style.width = '100%'
          this.container.style.top = '0'
          this.container.style.left = '0'
          this.container.style.backgroundColor = 'none'
          this.parentContainer.appendChild(this.container)
          this.setState({
            isFullScreen: false
          })
        }, 100)
      } else {
        const clientRect = this.container.getBoundingClientRect()
        this.containerClientRect = clientRect
        this.container.style.height = `${clientRect.height}px`
        this.container.style.width = `${clientRect.width}px`
        this.container.style.position = 'fixed'
        this.container.style.top = `${clientRect.top}px`
        this.container.style.left = `${clientRect.left}px`
        this.container.style.zIndex = '1'

        document && document.body.appendChild(this.container)

        setTimeout(() => {
          this.container.style.transition = 'top 0.3s, bottom 0.3s, left 0.3s, right 0.3s, height 0.3s, width 0.3s'
          this.container.style.top = '0px'
          this.container.style.left = '0px'
          this.container.style.right = '0px'
          this.container.style.bottom = '0px'
          this.container.style.height = null
          this.container.style.width = null
          this.container.style.backgroundColor = '#fff'
          this.setState({
            isFullScreen: true
          })
        }, 100)
      }
    } else {
      const element = this.container as any

      if (!document) {
        return
      }

      document.addEventListener('webkitfullscreenchange', this.fullScreenHanlder)
      document.addEventListener('fullscreenchange', this.fullScreenHanlder)

      if ((document as any).fullscreenElement === element) {
        (document as any).exitFullscreen()
        this.setState({
          isFullScreen: false
        })
        return
      }

      if ((document as any).webkitFullscreenElement === element) {
        (document as any).webkitCancelFullScreen()
        this.setState({
          isFullScreen: false
        })
        return
      }

      const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen
      if (requestMethod) {
        this.setState({
          isFullScreen: true
        })
        requestMethod.call(element)
      } else if (typeof (window as any).ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }

  handleViewGroupCreate = (viewGroup: JimuMapViewGroup) => {
    if (viewGroup) {
      viewGroup.setMapWidgetInstance(this)
    }
  }

  onJimuMapViewCreated = (jimuMapView: JimuMapView) => {
    jimuMapView.setMapWidgetState(this.props.state)
    this.setShowPopupUponSelectionForJimuMapView(jimuMapView)
  }

  onActiveJimuMapViewChange = (jimuMapView: JimuMapView) => {
    this.activeJimuMapView = jimuMapView
    this.watchPopupSelectedFeatureChange()
  }

  setShowPopupUponSelectionForJimuMapView (jimuMapView: JimuMapView) {
    if (jimuMapView) {
      jimuMapView.setShowPopupUponSelection(!!this.props.config.showPopupUponSelection)
    }
  }

  switchMap = async (ignoreSwitchAnimation = false): Promise<any> => {
    if (this.multiSourceMapInstance) {
      return await this.multiSourceMapInstance.switchMap(ignoreSwitchAnimation)
    } else {
      await Promise.resolve()
    }
  }

  setMultiSourceMapInstance = (instance: MultiSourceMap) => {
    this.multiSourceMapInstance = instance
  }

  onResize = (width, height) => {
    if (!width || !height) {
      return
    }

    if (width <= 545 && width > 0) {
      this.setState({
        widthBreakpoint: 'xsmall',
        widgetHeight: height
      })
    } else {
      this.setState({
        widthBreakpoint: 'other',
        widgetHeight: height
      })
    }
  }

  isLoadingDisplayed = () => {
    const addToMapDatas: AddToMapDatas = this.props.mutableStateProps?.addToMapDatas || {}
    return Object.values(addToMapDatas).some(value => value?.dataChangeStatus === DataChangeStatus.Pending)
  }

  isWarningDisplayed = () => {
    const addToMapDatas: AddToMapDatas = this.props.mutableStateProps?.addToMapDatas || {}
    return Object.values(addToMapDatas).some(value => value?.dataChangeStatus === DataChangeStatus.Rejected)
  }

  getInnerContent = (isMapInVisibleArea: boolean) => {
    if (!this.state.startLoadModules) {
      return (
        <div css={this.getStyle()} className='w-100 h-100'>
          <div className='widget-map w-100 h-100'>
            <div style={{ position: 'absolute', left: '50%', top: '50%' }} className='jimu-secondary-loading' />
          </div>
        </div>
      )
    } else {
      if (!(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId)) {
        return (
          <div className='w-100 h-100' ref={ref => { this.parentContainer = ref }}>
            <div
              css={this.getStyle()} className='w-100 h-100'
              ref={ref => { this.container = ref }}
            >
              <div className={classNames('w-100 h-100', { 'map-is-design-mode': !checkIsLive(this.props.appMode) })}>
                <DefaultMap
                  fullScreenMap={this.fullScreenMap} baseWidgetProps={this.props} startLoadModules={this.state.startLoadModules}
                  isDefaultMap setMultiSourceMapInstance={this.setMultiSourceMapInstance}
                  onViewGroupCreate={this.handleViewGroupCreate}
                  onJimuMapViewCreated={this.onJimuMapViewCreated}
                  onActiveJimuMapViewChange={this.onActiveJimuMapViewChange}
                  widgetHeight={this.state.widgetHeight} widthBreakpoint={this.state.widthBreakpoint} isFullScreen={this.state.isFullScreen} isMapInVisibleArea={isMapInVisibleArea}
                  autoControlWidgetId={this.props.autoControlWidgetId}
                >
                </DefaultMap>
              </div>
              <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
            </div>
          </div>
        )
      } else {
        return (
          <div className='w-100 h-100' ref={ref => { this.parentContainer = ref }}>
            <div
              css={this.getStyle()} className='w-100 h-100'
              ref={ref => { this.container = ref }}
            >
              <div className={classNames('w-100 h-100', { 'map-is-design-mode': !checkIsLive(this.props.appMode) })}>
                {this.props.useDataSources.length >= 1 &&
                  <MultiSourceMap
                    key={1} fullScreenMap={this.fullScreenMap} baseWidgetProps={this.props} startLoadModules={this.state.startLoadModules}
                    ref={this.setMultiSourceMapInstance}
                    onViewGroupCreate={this.handleViewGroupCreate}
                    onJimuMapViewCreated={this.onJimuMapViewCreated}
                    onActiveJimuMapViewChange={this.onActiveJimuMapViewChange}
                    widgetHeight={this.state.widgetHeight} widthBreakpoint={this.state.widthBreakpoint}
                    isFullScreen={this.state.isFullScreen} isMapInVisibleArea={isMapInVisibleArea}
                    autoControlWidgetId={this.props.autoControlWidgetId}
                  />}
              </div>
              <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
            </div>
          </div>
        )
      }
    }
  }

  getCurrentPopupSelectedFeature (): __esri.Graphic {
    return this.activeJimuMapView?.view?.popup?.selectedFeature
  }

  async loadReactiveUtils () {
    [this.reactiveUtils] = await loadArcGISJSAPIModules(['esri/core/reactiveUtils']) as [typeof __esri.reactiveUtils]
    this.watchPopupSelectedFeatureChange()
  }

  async watchPopupSelectedFeatureChange () {
    if (this.watchSelectedFeatureHandle) {
      this.watchSelectedFeatureHandle.remove()
      this.watchSelectedFeatureHandle = null
    }

    const activeJimuMapView = this.activeJimuMapView

    if (!activeJimuMapView || !this.reactiveUtils) {
      return
    }

    if (this.getCurrentPopupSelectedFeature()) {
      this.handleDataActionWhenPopupSelectedFeatureChange(activeJimuMapView)
    }

    this.watchSelectedFeatureHandle = this.reactiveUtils.watch(() => activeJimuMapView?.view?.popup?.selectedFeature, async () => {
      this.handleDataActionWhenPopupSelectedFeatureChange(activeJimuMapView)
    })
  }

  async handleDataActionWhenPopupSelectedFeatureChange (activeJimuMapView: JimuMapView) {
    const popup = activeJimuMapView?.view?.popup
    const originalSelectedFeature = popup?.selectedFeature

    // firstly, we need to remove dataActionListContainer from popup domNode,
    // when state.dataActionDataSet is ready, we can add dataActionListContainer to popup domNode
    if (this.dataActionListContainer.parentNode) {
      this.dataActionListContainer.parentNode.removeChild(this.dataActionListContainer)
    }

    this.releasePopupDomNodeObserver()

    await this.updateDataActionDataSet(null)

    const isDataActionEnabled = this.isDataActionEnabled()

    if (isDataActionEnabled && originalSelectedFeature) {
      const dataActionDataSet = await this.getDataActionDataSet(activeJimuMapView, originalSelectedFeature)

      // getDataActionDataSet may take a long time, so we need to check should we go on or not
      if (this.getCurrentPopupSelectedFeature() !== originalSelectedFeature) {
        return
      }

      await this.updateDataActionDataSet(dataActionDataSet)

      if (this.getCurrentPopupSelectedFeature() !== originalSelectedFeature) {
        return
      }

      this.watchPopupDomNodeChange(popup)
    }
  }

  updateDataActionDataSet (dataActionDataSet: DataRecordSet): Promise<void> {
    return new Promise((resolve) => {
      this.setState({
        dataActionDataSet
      }, () => {
        resolve()
      })
    })
  }

  releasePopupDomNodeObserver () {
    if (this.popupDomNodeObserver) {
      this.popupDomNodeObserver.disconnect()
      this.popupDomNodeObserver = null
    }
  }

  watchPopupDomNodeChange (popup: __esri.Popup) {
    this.releasePopupDomNodeObserver()

    const popupDomNode = ((popup as any).domNode || (popup as any).container) as HTMLElement

    this.tryAppendDataActionListDomNodeToPopup(popupDomNode)

    const config = {
      childList: true,
      subtree: true
    }

    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.tryAppendDataActionListDomNodeToPopup(popupDomNode)
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(popupDomNode, config)
    this.popupDomNodeObserver = observer
  }

  tryAppendDataActionListDomNodeToPopup (popupDomNode: HTMLElement) {
    const selector = 'calcite-action-bar[slot="action-bar"]'
    const popupActionsContainer = popupDomNode.querySelector(selector)

    if (popupActionsContainer && !popupActionsContainer.contains(this.dataActionListContainer)) {
      // this.dataActionListContainer is not in popup
      if (this.state.dataActionDataSet) {
        // DataActionList domNode is ready, we can add it to popup domNode now
        if (this.dataActionListContainer.parentNode) {
          this.dataActionListContainer.parentNode.removeChild(this.dataActionListContainer)
        }

        // append this.dataActionListContainer into popupActionsContainer as the first child
        if (popupActionsContainer.firstChild) {
          popupActionsContainer.insertBefore(this.dataActionListContainer, popupActionsContainer.firstChild)
        } else {
          popupActionsContainer.appendChild(this.dataActionListContainer)
        }
      }
    }
  }

  async getDataActionDataSet (jimuMapView: JimuMapView, selectedFeature: __esri.Graphic) {
    let jimuLayerView: JimuLayerView = null

    // If the selectedFeature is from JimuLayerView selection, we can get the jimuLayerViewId.
    // See JimuFeatureLayerView.getSelectedFeatures() for more details.
    const jimuLayerViewId = (selectedFeature as any).jimuLayerViewId

    if (jimuLayerViewId) {
      jimuLayerView = jimuMapView.jimuLayerViews[jimuLayerViewId]
    }

    // If jimuLayerView is still null, means the selectedFeature comes from clicking map, we can try to find the jimuLayerView by layer.
    if (!jimuLayerView) {
      const allJimuLayerViews = Object.values(jimuMapView.jimuLayerViews)

      if (selectedFeature.layer) {
        jimuLayerView = allJimuLayerViews.find(item => item.layer === selectedFeature.layer)
      }

      if (!jimuLayerView) {
        // If the selected feature commes from esri.layers.support.Sublayer, then the selectedFeature.layer is null and selectedFeature.sourceLayer is not null.
        const sourceLayer = (selectedFeature as any).sourceLayer

        if (sourceLayer) {
          jimuLayerView = allJimuLayerViews.find(item => item.layer === sourceLayer)
        }
      }
    }

    if (!jimuLayerView) {
      return null
    }

    let layerDataSource = jimuLayerView.getLayerDataSource()

    if (!layerDataSource) {
      layerDataSource = await jimuLayerView.createLayerDataSource()
    }

    if (layerDataSource) {
      const sourceLabel = layerDataSource.getLabel() || ''
      const stringKey = 'mapCurrentRecord'
      const dataSetName = this.props.intl.formatMessage({ id: stringKey, defaultMessage: defaultMessages[stringKey] }, { layerName: sourceLabel })
      const record = layerDataSource.buildRecord(selectedFeature)
      const dataSet: DataRecordSet = {
        dataSource: layerDataSource,
        name: dataSetName,
        type: 'current',
        records: [record]
      }

      return dataSet
    }

    return null
  }

  isDataActionEnabled () {
    // By default, this.props.enableDataAction is undefined, which means enabled.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return this.props.enableDataAction !== false
  }

  renderDataActionList () {
    const isDataActionEnabled = this.isDataActionEnabled()

    if (isDataActionEnabled && this.state.dataActionDataSet) {
      // render the DataActionList into this.dataActionListContainer, so we can append it to popup domNode
      return ReactDOM.createPortal(
        <DataActionList widgetId={this.props.id} dataSets={[this.state.dataActionDataSet]}
          disableDataSourceLevelActions={true} listStyle={DataActionListStyle.Dropdown} hideGroupTitle={true}
        />,
        this.dataActionListContainer
      )
    }

    return null
  }

  render () {
    const dataActionList = this.renderDataActionList()

    return (
      <div className='jimu-widget arcgis-map' css={this.getWidgetSyle()}>
        {this.isLoadingDisplayed() && <Loading className='map-loading-bar' type={LoadingType.Bar}/>}
        {this.isWarningDisplayed() && <div className='map-warning-bar'>
          <Icon className='warning-icon' icon={this.warningIcon} size={26} currentColor={false} />
          <span>{this.props.intl.formatMessage({ id: 'failToAddTheDataOnMap', defaultMessage: 'Fail to add the data.' })}</span>
        </div>}
        { dataActionList }
        <PageVisibilityContext.Consumer>
          {(isPageVisible) => {
            return (
              <ViewportVisibilityContext.Consumer>
                {(isVisibleInViewPort) => {
                  return (
                    <ViewVisibilityContext.Consumer>
                      {(viewVisibilityContextProps) => {
                        // isPageVisible:
                        // App can have page1, page2, isPageVisible is used to judge whether the current page is visible.

                        // isVisibleInViewPort:
                        // When scrolling the scroll page, the widget may be scrolled out of the current viewport,
                        // isVisibleInViewPort is used to determine whether the current widget is in the viewport of the browser.

                        // isPrintPreview
                        // isPrintPreview is used to determine whether it is currently in browser printing mode.

                        // isVisibleInView:
                        // The widget is ultimately placed in a view in a layout. It is possible that we have a section with multiple views in it, similar to tabs.
                        // isVisibleInView is used to determine whether the widget is in the currently visible view.

                        const isVisibleInView = viewVisibilityContextProps.isInView ? viewVisibilityContextProps.isInCurrentView : true

                        // isMapInVisibleArea:
                        // isMapInVisibleArea is used to finally determine whether the dom of the map is visible to the user.

                        // Here we use (isVisibleInViewPort || this.props.isPrintPreview), not only isVisibleInViewPort, consider the following case.
                        // Case:
                        // We create a scroll page with map. We scroll the page and the map is not visible for user.
                        // User wants to print the scroll page, including the map (even the map is not visible).
                        // Then the user enables print view mode by a button. Now, isVisibleInViewPort is false and this.props.isPrintPreview is true.
                        // We need to make sure the map widget is visible (let isMapInVisibleArea be true) when in print view mode, otherwise the print result will lose map.
                        // So we use (isVisibleInViewPort || this.props.isPrintPreview), instead of this.props.isPrintPreview.
                        const isMapInVisibleArea = isPageVisible && (isVisibleInViewPort || this.props.isPrintPreview) && isVisibleInView

                        return this.getInnerContent(isMapInVisibleArea)
                      }}
                    </ViewVisibilityContext.Consumer>

                  )
                }}
              </ViewportVisibilityContext.Consumer>
            )
          }}
        </PageVisibilityContext.Consumer>
      </div>
    )
  }
}
