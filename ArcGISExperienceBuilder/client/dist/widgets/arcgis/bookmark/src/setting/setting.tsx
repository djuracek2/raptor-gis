/** @jsx jsx */
import {
  classNames, Immutable, type IMState, React, type IMAppConfig, jsx,
  type IMThemeVariables, type ImmutableArray, type BrowserSizeMode, LayoutType,
  defaultMessages as jimuCoreMessages, type LayoutInfo, type TransitionType, type TransitionDirection, getNextAnimationId, LayoutParentType
} from 'jimu-core'
import { defaultMessages as jimuLayoutsDefaultMessages, utils } from 'jimu-layouts/layout-runtime'
import { type AllWidgetSettingProps, getAppConfigAction, templateUtils, builderAppSync, widgetService } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { MarkPopper } from './components/mark-popper'
import {
  Checkbox, Icon, Button, defaultMessages as jimuUIDefaultMessages,
  NumericInput, AdvancedButtonGroup, Select, Slider, Tooltip, Switch, ConfirmDialog, CollapsablePanel
} from 'jimu-ui'
import { type IMConfig, TemplateType, type Bookmark, DirectionType, PageStyle, DisplayType, Status, type Transition } from '../config'
import defaultMessages from './translations/default'
import { Fragment } from 'react'
import { type Template } from 'jimu-for-builder/templates'
import { TransitionSetting } from 'jimu-ui/advanced/style-setting-components'
import { getStyle, getNextButtonStyle } from './style'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { ArrowRightOutlined } from 'jimu-icons/outlined/directional/arrow-right'
import { ArrowDownOutlined } from 'jimu-icons/outlined/directional/arrow-down'
import { BookmarkList } from './components/bookmark-list'

const prefix = 'jimu-widget-'

const defaultConfig = require('../../config.json')
const directions = [
  { icon: 'right', value: DirectionType.Horizon },
  { icon: 'down', value: DirectionType.Vertical }
]
const originAllStyles = {
  CUSTOM1: require('./template/mark-styleCustom1.json'),
  CUSTOM2: require('./template/mark-styleCustom2.json')
}

let AllStyles: { [key: string]: Template }

function initStyles (widgetId: string) {
  if (AllStyles) {
    return AllStyles
  }
  const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
  AllStyles = {}
  Object.keys(originAllStyles).forEach(style => {
    AllStyles[style] = templateUtils.processForTemplate(originAllStyles[style], widgetId, messages)
  })
}

interface State {
  activeId: number | string
  expandedId: number | string
  showSimple: boolean
  showAdvance: boolean
  showArrangement: boolean
  tempLayoutType: LayoutType
  changeCustomConfirmOpen: boolean
  isTemplateContainScroll: boolean
  templateConWidth: number
}

interface ExtraProps {
  appConfig: IMAppConfig
  browserSizeMode: BrowserSizeMode
  activeBookmarkId: number
  layoutInfo: LayoutInfo
  settingPanelChange: string
}

interface CustomeProps {
  theme: IMThemeVariables
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  markPopper = null
  templatesContainer: any
  updatePositionTimeout: any
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      browserSizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      activeBookmarkId: state && state.appStateInBuilder?.widgetsState[props.id]?.activeBookmarkId,
      layoutInfo: state && state.appStateInBuilder?.widgetsState[props.id]?.layoutInfo,
      settingPanelChange: state?.widgetsState?.[props.id]?.settingPanelChange
    }
  }

  constructor (props) {
    super(props)
    initStyles(props.id)
    this.state = {
      activeId: 0,
      expandedId: 0,
      showSimple: true,
      showAdvance: true,
      showArrangement: false,
      tempLayoutType: LayoutType.FixedLayout,
      changeCustomConfirmOpen: false,
      isTemplateContainScroll: false,
      templateConWidth: 260
    }
    this.templatesContainer = React.createRef()
  }

  componentDidMount () {
    this.getIsScrollAndWidthOfTemplateCon()
    window.addEventListener('resize', this.updateNextButtonPosition)
  }

  componentDidUpdate (prevProps: AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps) {
    const { activeId } = this.state
    const { settingPanelChange, activeBookmarkId = 0 } = this.props
    if (this.props.activeBookmarkId !== prevProps.activeBookmarkId) {
      if (activeBookmarkId !== activeId) {
        this.setState({ activeId: activeBookmarkId })
      }
    }
    if (settingPanelChange !== prevProps.settingPanelChange) {
      this.markPopper?.handleCloseOk()
    }
    if (settingPanelChange === 'content' && prevProps.settingPanelChange !== 'content') {
      this.updateNextButtonPosition()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.updatePositionTimeout)
  }

  getIsScrollAndWidthOfTemplateCon = () => {
    const templateConHeight = this.templatesContainer?.current?.clientHeight || 0
    const templateConWidth = this.templatesContainer?.current?.clientWidth || 260
    const templateConParentHeight =
      this.templatesContainer?.current?.parentElement?.parentElement?.clientHeight || 0
    const isStartButtonAbsolute = templateConParentHeight < templateConHeight
    this.setState({
      isTemplateContainScroll: isStartButtonAbsolute,
      templateConWidth: templateConWidth
    })
  }

  onPropertyChange = (name, value) => {
    const { config } = this.props
    if (value === config[name]) {
      return
    }
    const newConfig = config.set(name, value)
    const alterProps = {
      id: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps)
  }

  onConfigChange = (key, value) => {
    const { config } = this.props
    const newConfig = config.setIn(key, value)
    const alterProps = {
      id: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps)
  }

  onTemplateTypeChanged = (style: TemplateType, updatedAppConfig = undefined) => {
    const { id, browserSizeMode } = this.props
    let { appConfig } = this.props
    if (updatedAppConfig) {
      appConfig = updatedAppConfig
    }
    if (style === TemplateType.Custom1 || style === TemplateType.Custom2) {
      const styleTemplate = AllStyles[style]
      widgetService.updateWidgetByTemplate(
        appConfig,
        styleTemplate,
        id,
        styleTemplate.widgetId,
        [browserSizeMode],
        {}
      ).then(newAppConfig => {
        this._onItemStyleChange(newAppConfig, style)
      })
    } else {
      this._onItemStyleChange(appConfig, style)
    }
  }

  handleFormChange = (evt) => {
    const target = evt.currentTarget
    if (!target) return
    const field = target.dataset.field
    const type = target.type
    let value
    switch (type) {
      case 'checkbox':
        value = target.checked
        break
      case 'select':
        value = target.value
        break
      case 'range':
        value = parseFloat(target.value)
        break
      case 'number':
        const numbertype = target.dataset.numbertype
        const parseNumber = numbertype === 'float' ? parseFloat : parseInt
        const minValue = !!target.min && parseNumber(target.min)
        const maxValue = !!target.max && parseNumber(target.max)
        value = evt.target.value
        if (!value || value === '') return
        value = parseNumber(evt.target.value)
        if (!!minValue && value < minValue) { value = minValue }
        if (!!maxValue && value > maxValue) { value = maxValue }
        break
      default:
        value = target.value
        break
    }
    this.onPropertyChange(field, value)
  }

  handleCheckboxChange = (evt) => {
    const target = evt.currentTarget
    if (!target) return
    this.onPropertyChange(target.dataset.field, target.checked)
  }

  handleAutoInterval = (valueInt: number) => {
    this.onPropertyChange('autoInterval', valueInt)
  }

  onSwitchChanged = (checked: boolean, name: string) => {
    this.onPropertyChange(name, checked)
  }

  private readonly _onItemStyleChange = (newAppConfig, style) => {
    const { id, config: oldConfig, layoutInfo } = this.props
    const { tempLayoutType } = this.state
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    const tempWidgetSize = {
      CARD: { width: 516, height: 210 },
      LIST: { width: 300, height: 360 },
      SLIDE1: { width: 320, height: 380 },
      SLIDE2: { width: 320, height: 380 },
      SLIDE3: { width: 320, height: 380 },
      GALLERY: { width: 680, height: 230 },
      CUSTOM1: { width: 320, height: 380 },
      CUSTOM2: { width: 320, height: 380 }
    }
    let config = Immutable(defaultConfig)
    const wJson = newAppConfig.widgets[id]
    let newBookmarks
    let nextAppConfig = newAppConfig
    if (customType.includes(style)) {
      let newOriginLayoutId = newAppConfig.widgets[id].layouts[Status.Default][newAppConfig.mainSizeMode]
      newBookmarks = oldConfig.bookmarks.map(item => {
        const { newLayoutId, eachAppConfig } = this.duplicateLayoutsEach(newOriginLayoutId, id, `Bookmark-${item.id}`, `Bookmark-${item.id}-label`, tempLayoutType, nextAppConfig)
        nextAppConfig = eachAppConfig
        newOriginLayoutId = newLayoutId
        item = item.set('layoutName', `Bookmark-${item.id}`).set('layoutId', newLayoutId)
        return item
      })
    }
    if (customType.includes(oldConfig.templateType) && !customType.includes(style)) {
      newBookmarks = newAppConfig.widgets[id].config.bookmarks
    }
    config = config.set('templateType', style).set('bookmarks', newBookmarks || oldConfig.bookmarks).set('isTemplateConfirm', false)
    config = config.set('isInitialed', true)
    const appConfigAction = getAppConfigAction(nextAppConfig)
    const layoutType = this.getLayoutType()
    if (layoutType === LayoutType.FixedLayout) {
      appConfigAction.editLayoutItemSize(layoutInfo, tempWidgetSize[style].width, tempWidgetSize[style].height)
    }
    appConfigAction.editWidgetProperty(wJson.id, 'config', config).exec()
  }

  getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props
    const layoutId = layoutInfo.layoutId
    const layoutType = appConfig?.layouts?.[layoutId]?.type
    return layoutType
  }

  duplicateLayoutsEach = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props
    if (newAppConfig) appConfig = newAppConfig
    const appConfigAction = getAppConfigAction(appConfig)
    const newLayoutJson = appConfigAction.duplicateLayout(originLayoutId, true)
    appConfigAction
      .editLayoutProperty(newLayoutJson.id, 'parent', { type: LayoutParentType.Widget, id: widgetId })
      .editLayoutProperty(newLayoutJson.id, 'label', layoutLabel)
      .editWidgetProperty(widgetId, `layouts.${layoutName}.${utils.getCurrentSizeMode()}`, newLayoutJson.id)

    return { newLayoutId: newLayoutJson.id, eachAppConfig: appConfigAction.appConfig }
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages, jimuLayoutsDefaultMessages)
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values)
  }

  handleTemplateTypeImageClick = evt => {
    const style = evt.currentTarget.dataset.value
    const { id, config, appConfig } = this.props
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    if (config.templateType === style) return
    if (customType.includes(config.templateType)) { // origin type is advanced
      let nextAppConfig = appConfig
      const newBookmarks = config.bookmarks.map(item => {
        const { layoutName } = item
        const appConfigAction = getAppConfigAction(nextAppConfig)
        const newAction = appConfigAction.removeLayoutFromWidget(id, layoutName)
        nextAppConfig = newAction.appConfig
        return item.set('layoutId', '').set('layoutName', '')
      })
      const newConfig = config.set('bookmarks', newBookmarks).set('templateType', style)
      const appConfigAction = getAppConfigAction(nextAppConfig)
      appConfigAction.removeLayoutFromWidget(id, 'DEFAULT')
      appConfigAction.editWidgetProperty(id, 'config', newConfig).exec()
      this.onTemplateTypeChanged(style, appConfigAction.appConfig)
    } else { // origin type is simple
      this.onTemplateTypeChanged(style)
    }
  }

  handleTemplateConfirmClick = () => {
    this.onPropertyChange('isTemplateConfirm', true)
  }

  handleResetTemplateClick = () => {
    const { config } = this.props
    if (config.templateType === TemplateType.Custom1 || config.templateType === TemplateType.Custom2) {
      this.setState({ changeCustomConfirmOpen: true })
    } else {
      this.onPropertyChange('isTemplateConfirm', false)
    }
    this.updateNextButtonPosition()
  }

  handleChangeOk = () => {
    this.onPropertyChange('isTemplateConfirm', false)
    this.updateNextButtonPosition()
    this.setState({ changeCustomConfirmOpen: false })
  }

  handleChangeClose = () => {
    this.setState({ changeCustomConfirmOpen: false })
  }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.onPropertyChange('bookmarks', [])
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
    this.markPopper?.handleCloseOk()
  }

  showBookmarkConfiger = (ref) => {
    this.markPopper = ref
  }

  onBookmarkUpdated = (updateBookmark: Bookmark) => {
    const { config } = this.props
    const oriBookmarks = config.bookmarks
    const fixIndex = oriBookmarks.findIndex(x => x.id === updateBookmark.id)
    const newBookmark = oriBookmarks.map((item, index) => {
      if (fixIndex === index) {
        return updateBookmark
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  addNewBookmark = (bookmark: Bookmark) => {
    const { config } = this.props
    this.setState({ activeId: bookmark.id })
    this.onPropertyChange('bookmarks', config.bookmarks.concat(bookmark))
  }

  handleClosePopper = () => {
    const { activeId, expandedId } = this.state
    activeId !== expandedId && this.setState({ activeId: 0 })
  }

  getArrayMaxId (arr: ImmutableArray<Bookmark>): number {
    const numbers = arr.map(p => p.id)
    return numbers.length > 0 ? Math.max.apply(null, numbers) : 0
  }

  handleSort = (curIndex, newIndex) => {
    const bookmarks = this.props.config?.bookmarks?.asMutable() || []
    const sortBookmark = bookmarks.splice(curIndex, 1)?.[0]
    sortBookmark && bookmarks.splice(newIndex, 0, sortBookmark)
    this.onPropertyChange('bookmarks', Immutable(bookmarks))
  }

  handleSelect = (bookmark: Bookmark) => {
    const { expandedId } = this.state
    const dialogStatus = this.markPopper.getDialogStatus()
    if (expandedId === bookmark.id) {
      !dialogStatus && this.setState({ activeId: 0 })
      this.setState({ expandedId: 0 })
      return
    }
    this.setState({ activeId: bookmark.id, expandedId: bookmark.id })
    this.markPopper.handleEditWhenOpen(bookmark)
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'activeBookmarkId', value: bookmark.id })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true })
  }

  handleEditBookmark = (bookmark: Bookmark) => {
    this.setState({ activeId: bookmark.id })
    this.markPopper.handleNewOrEdit(bookmark)
  }

  handleDelete = (bookmark: Bookmark) => {
    const { id } = bookmark
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    const { activeId } = this.state
    const { id: widgetId, appConfig } = this.props
    let { config } = this.props
    const oriBookmarks = config.bookmarks
    const index = oriBookmarks.findIndex(x => x.id === id)
    if (index === -1) return
    const newBookmark = oriBookmarks.asMutable({ deep: true })
    const dialogStatus = this.markPopper.getDialogStatus()
    let newEditActiveBookmark
    if (activeId === newBookmark[index].id) {
      if (index !== 0) {
        newEditActiveBookmark = newBookmark[index - 1]
      } else { // delete the first one
        if (newBookmark.length > 1) {
          newEditActiveBookmark = newBookmark[index + 1]
        } else { // delete the only one
          this.markPopper.handleClickClose(null, true)
          newEditActiveBookmark = undefined
          builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'lastFlag', value: true })
        }
      }
      newEditActiveBookmark && dialogStatus && this.handleEditBookmark(Immutable(newEditActiveBookmark))
    }
    if (customType.includes(config.templateType)) {
      // delete bookmark layouts and bookmark
      const { layoutName } = newBookmark[index]
      const appConfigAction = getAppConfigAction(appConfig)
      appConfigAction.removeLayoutFromWidget(widgetId, layoutName)
      newBookmark.splice(index, 1)
      if (activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0]
      }
      const newImmutableArray = Immutable(newBookmark)
      config = config.set('bookmarks', newImmutableArray)
      appConfigAction.editWidgetProperty(widgetId, 'config', config).exec()
    } else {
      // only delete bookmark
      newBookmark.splice(index, 1)
      if (activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0]
      }
      const newImmutableArray = Immutable(newBookmark)
      this.onPropertyChange('bookmarks', newImmutableArray)
    }
    const newActiveId = (newEditActiveBookmark && newEditActiveBookmark.id) || activeId
    this.setState({
      activeId: newActiveId
    })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'activeBookmarkId', value: newActiveId })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true })
  }

  handleShowSimpleClick = () => {
    const { showSimple } = this.state
    this.setState({ showSimple: !showSimple })
  }

  handleShowAdvanceClick = () => {
    const { showAdvance } = this.state
    this.setState({ showAdvance: !showAdvance })
  }

  handleShowArrangementClick = () => {
    const { showArrangement } = this.state
    this.setState({ showArrangement: !showArrangement })
  }

  handlePageStyleChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('pageStyle', value)
  }

  handleDisplayTypeChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('displayType', value)
  }

  onTransitionTypeChange = (type: TransitionType) => {
    this.onPropertyChange('transition', type)
  }

  onTransitionDirectionChange = (dir: TransitionDirection) => {
    this.onPropertyChange('transitionDirection', dir)
  }

  getPageStyleOptions = (): JSX.Element[] => {
    return [
      <option key={PageStyle.Scroll} value={PageStyle.Scroll}>{this.formatMessage('scroll')}</option>,
      <option key={PageStyle.Paging} value={PageStyle.Paging}>{this.formatMessage('paging')}</option>
    ]
  }

  handleDirectionClick = (evt) => {
    const direction = evt.currentTarget.dataset.value
    this.onPropertyChange('direction', direction)
  }

  handleSpaceChange = (valueFloat: number) => {
    this.onPropertyChange('space', valueFloat)
  }

  handleItemSizeChange = (value: number, isVertical: boolean) => {
    isVertical ? this.onPropertyChange('itemHeight', value) : this.onPropertyChange('itemWidth', value)
  }

  duplicateNewLayouts = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props
    if (newAppConfig) appConfig = newAppConfig
    const appConfigAction = getAppConfigAction(appConfig)
    const newLayoutJson = appConfigAction.duplicateLayout(originLayoutId, true)
    appConfigAction
      .editLayoutProperty(newLayoutJson.id, 'parent', { type: LayoutParentType.Widget, id: widgetId })
      .editLayoutProperty(newLayoutJson.id, 'label', layoutLabel)
      .editWidgetProperty(widgetId, `layouts.${layoutName}.${utils.getCurrentSizeMode()}`, newLayoutJson.id)

    appConfigAction.exec()
    return newLayoutJson.id
  }

  updateNextButtonPosition = () => {
    clearTimeout(this.updatePositionTimeout)
    this.updatePositionTimeout = setTimeout(() => {
      this.getIsScrollAndWidthOfTemplateCon()
    }, 500)
  }

  renderTemplate = () => {
    const { config, theme } = this.props
    const { showSimple, showAdvance, isTemplateContainScroll, templateConWidth } = this.state
    const nextBtnClass = isTemplateContainScroll
      ? 'position-absolute position-absolute-con'
      : 'position-relative-con'
    const simpleTemplateTip = (
      <div className='w-100 d-flex'>
        <div className='text-truncate p-1'>
          {this.formatMessage('simple')}
        </div>
        <Tooltip title={this.formatMessage('simpleTemplateTip')} showArrow placement='left'>
          <span className='mt-1 ml-2'>
            <InfoOutlined />
          </span>
        </Tooltip>
      </div>
    )
    const advancedTemplateTip = (
      <div className='w-100 d-flex'>
        <div className='text-truncate p-1'>
          {this.formatMessage('advance')}
        </div>
        <Tooltip title={this.formatMessage('advancedTemplateTip')} showArrow placement='left'>
          <span className='mt-1 ml-2'>
            <InfoOutlined />
          </span>
        </Tooltip>
      </div>
    )

    return (
      <div ref={this.templatesContainer}>
        <SettingSection role='group' aria-label={this.formatMessage('chooseTemplateTip')} title={this.formatMessage('chooseTemplateTip')}>
          <CollapsablePanel
            label={simpleTemplateTip}
            isOpen={showSimple}
            onRequestOpen={this.handleShowSimpleClick}
            onRequestClose={this.handleShowSimpleClick}
            role='group'
            aria-label={this.formatMessage('simple')}
          >
            <div className='template-group w-100 mt-1'>
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Card}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeCard')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Card && 'active'}`}
                    icon={require('./assets/tradition_card.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.List}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeList')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.List && 'active'}`}
                    icon={require('./assets/tradition_list.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Gallery}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeGallery')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-gallery ${config.templateType === TemplateType.Gallery && 'active'}`}
                    icon={require('./assets/presentation_gallery_h.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Slide1}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideOne')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide1 && 'active'}`}
                    icon={require('./assets/presentation_slide1.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.Slide2}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideTwo')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide2 && 'active'}`}
                    icon={require('./assets/presentation_slide2.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Slide3}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideThree')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide3 && 'active'}`}
                    icon={require('./assets/presentation_slide3.svg')}
                  />
                </Button>
              </div>
              {/* <div className="vertical-space" /> */}
              {/* <div data-value={TemplateType.Navigator} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title="Navigator">
                <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Navigator && 'active'}`}
                  icon={require('./assets/presentation_navigator.svg')} />
              </div> */}
            </div>
          </CollapsablePanel>

          <CollapsablePanel
            label={advancedTemplateTip}
            isOpen={showAdvance}
            onRequestOpen={this.handleShowAdvanceClick}
            onRequestClose={this.handleShowAdvanceClick}
            role='group'
            aria-label={this.formatMessage('advance')}
            className='mt-2 mb-2'
          >
            <div className='template-group w-100 mt-1'>
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Custom1}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('customOne')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Custom1 && 'active'}`}
                    icon={require('./assets/custom_template1.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.Custom2}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('customTwo')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Custom2 && 'active'}`}
                    icon={require('./assets/custom_template2.svg')}
                  />
                </Button>
              </div>
              <div className="vertical-space" />
            </div>
          </CollapsablePanel>

          <SettingRow>
            <div className='next-con w-100' css={getNextButtonStyle(theme, templateConWidth)}>
              <div className={nextBtnClass}>
                <Button type='primary' className='w-100' onClick={this.handleTemplateConfirmClick}>
                  {this.formatMessage('start')}
                </Button>
              </div>
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }

  onTransitionSettingChange = (transition: Transition) => {
    const transitionInfo = this.props.config.transitionInfo.asMutable({ deep: true })
    transitionInfo.transition = transition
    this.onConfigChange(['transitionInfo'], Immutable(transitionInfo))
  }

  previewTransitionAndOnebyOne = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], getNextAnimationId())
  }

  renderArrangementSetting = () => {
    const { config } = this.props
    const { transitionInfo } = config
    const { showArrangement } = this.state
    const isVertical = config.direction === DirectionType.Vertical

    return (
      <SettingRow>
        <CollapsablePanel
          label={this.formatMessage('arrangement')}
          isOpen={showArrangement}
          onRequestOpen={this.handleShowArrangementClick}
          onRequestClose={this.handleShowArrangementClick}
          role='group'
          aria-label={this.formatMessage('arrangement')}
        >
          <SettingRow className='mt-2' label={this.formatMessage('pagingStyle')} flow='wrap'>
            <Select value={config.pageStyle} onChange={this.handlePageStyleChange} size='sm' aria-label={this.formatMessage('pagingStyle')}>
              {this.getPageStyleOptions()}
            </Select>
          </SettingRow>
          {config.pageStyle !== PageStyle.Scroll &&
            <Fragment>
              <SettingRow>
                <div className='d-flex w-100'>
                  <Checkbox
                    data-field='initBookmark'
                    onClick={this.handleCheckboxChange}
                    checked={config.initBookmark}
                    aria-label={this.formatMessage('initBookmark')}
                  />
                  <div className='text-truncate ml-2' title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
                  <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow placement='left'>
                    <span className='inline-block ml-2 tips-pos'>
                      <InfoOutlined />
                    </span>
                  </Tooltip>
                </div>
              </SettingRow>
              <SettingRow>
                <div className='d-flex justify-content-between w-100'>
                  <label className='w-75 text-truncate d-inline-block font-dark-600'>{this.formatMessage('playEnable')}</label>
                  <Switch
                    className='can-x-switch' checked={(config && config.autoPlayAllow) || false}
                    data-key='autoRefresh' onChange={evt => { this.onSwitchChanged(evt.target.checked, 'autoPlayAllow') }} aria-label={this.formatMessage('playEnable')}
                  />
                </div>
              </SettingRow>
              {config.autoPlayAllow &&
                <Fragment>
                  <SettingRow
                    flow='wrap'
                    label={`${this.formatMessage('autoInterval')} (${this.formatMessage('second')})`}
                    role='group'
                    aria-label={`${this.formatMessage('autoInterval')} (${this.formatMessage('second')})`}
                  >
                    <NumericInput
                      style={{ width: '100%' }}
                      value={config.autoInterval || 3}
                      min={2}
                      max={60}
                      onChange={this.handleAutoInterval}
                    />
                  </SettingRow>
                  <SettingRow>
                    <div className='d-flex w-100'>
                      <Checkbox
                        data-field='autoLoopAllow'
                        onClick={this.handleCheckboxChange}
                        checked={config.autoLoopAllow}
                        aria-label={this.formatMessage('autoLoopAllow')}
                      />
                      <div className='text-truncate ml-2'>{this.formatMessage('autoLoopAllow')}</div>
                    </div>
                  </SettingRow>
                </Fragment>}
            </Fragment>
          }
          {config.pageStyle !== PageStyle.Paging &&
            <SettingRow label={this.formatMessage('direction')} role='group' aria-label={this.formatMessage('direction')}>
              <AdvancedButtonGroup size='sm'>
                {
                  directions.map((data, i) => {
                    return (
                      <Button
                        key={i} icon active={config.direction === data.value}
                        data-value={data.value}
                        onClick={this.handleDirectionClick}
                        aria-label={data.icon === 'right' ? this.formatMessage('horizontal') : this.formatMessage('vertical')}
                      >
                        {data.icon === 'right' ? <ArrowRightOutlined size='s' /> : <ArrowDownOutlined size='s' />}
                      </Button>
                    )
                  })
                }
              </AdvancedButtonGroup>
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Paging &&
            <SettingRow label={this.formatMessage('transition')} flow='wrap' role='group' aria-label={this.formatMessage('transition')}>
              <TransitionSetting
                transition={transitionInfo?.transition}
                onTransitionChange={this.onTransitionSettingChange}
                onPreviewAsAWhoneClicked={this.previewTransitionAndOnebyOne}
                formatMessage={this.formatMessage}
                showOneByOne={false}
              />
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Scroll &&
            <Fragment>
              <SettingRow
                flow='wrap'
                role='group'
                label={`${isVertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}
                aria-label={`${isVertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}
              >
                <NumericInput
                  style={{ width: '100%' }}
                  value={(isVertical ? config.itemHeight : config.itemWidth) || 240}
                  onChange={(value) => { this.handleItemSizeChange(value, isVertical) }}
                />
              </SettingRow>
              <SettingRow
                flow='wrap'
                role='group'
                label={(isVertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}
                aria-label={(isVertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}
              >
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <Slider
                    style={{ width: '60%' }}
                    data-field='space'
                    onChange={this.handleFormChange}
                    value={config.space}
                    title='0-50'
                    size='sm'
                    min={0}
                    max={50}
                  />
                  <NumericInput
                    style={{ width: '25%' }}
                    value={config.space}
                    min={0}
                    max={50}
                    title='0-50'
                    onChange={this.handleSpaceChange}
                  />
                </div>
              </SettingRow>
            </Fragment>
          }
        </CollapsablePanel>
      </SettingRow>
    )
  }

  renderDataSetting = () => {
    const { id, theme, useDataSources, useMapWidgetIds, config } = this.props
    const { activeId, expandedId, tempLayoutType } = this.state
    const activeBookmark = config.bookmarks.find(x => x.id === activeId)
    const activeName = (activeBookmark && activeBookmark.name) ? activeBookmark.name : '---'
    const runtimeType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3, TemplateType.Custom1, TemplateType.Custom2]
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    const displayAllTip = this.formatMessage('displayAll')
    const displaySelectedTip = this.formatMessage('displaySelected')
    const displayTypeTip = config.displayType === DisplayType.All ? displayAllTip : displaySelectedTip

    return (
      <div className='bookmark-setting'>
        <SettingSection>
          <SettingRow flow='wrap'>
            <div className='w-100 overflow-hidden'>
              <Button
                type='tertiary'
                className='resetting-template jimu-outline-inside'
                onClick={this.handleResetTemplateClick}
                title={this.formatMessage('resettingTheTemplate')}
              >
                {this.formatMessage('resettingTheTemplate')}
              </Button>
              {customType.includes(config.templateType) &&
                <Fragment>
                  {this.formatMessage('customBookmarkDesign')}
                  <Tooltip title={this.formatMessage('customTips')} showArrow placement='left'>
                    <span className='inline-block ml-2'>
                      <InfoOutlined />
                    </span>
                  </Tooltip>
                </Fragment>}
            </div>
          </SettingRow>
          <SettingRow flow='wrap' label={this.formatMessage('selectMapWidget')}>
            <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={useMapWidgetIds} isNeedConfirmBeforeChange confirmMessage={this.formatMessage('switchRemind')}/>
          </SettingRow>
          {this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 &&
            <SettingRow>
              <MarkPopper
                id={id}
                theme={theme}
                title={`${this.formatMessage('setBookmarkView')}: ${activeName}`}
                buttonLabel={this.formatMessage('addBookmark')}
                useDataSources={useDataSources}
                useMapWidgetIds={useMapWidgetIds}
                jimuMapConfig={config}
                onBookmarkUpdated={this.onBookmarkUpdated}
                onShowBookmarkConfiger={(ref) => { this.showBookmarkConfiger(ref) }}
                maxBookmarkId={this.getArrayMaxId(config.bookmarks)}
                activeBookmarkId={activeId}
                onAddNewBookmark={this.addNewBookmark}
                onClose={this.handleClosePopper}
                formatMessage={this.formatMessage}
                duplicateNewLayouts={this.duplicateNewLayouts}
                tempLayoutType={tempLayoutType}
                isUseWidgetSize
              />
            </SettingRow>}
          {this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 && config.bookmarks && config.bookmarks.length !== 0 &&
            <SettingRow>
              <BookmarkList
                bookmarks={config.bookmarks}
                templateType={config.templateType}
                activeId={activeId}
                expandedId={expandedId}
                widgetId={this.props.id}
                onSelect={this.handleSelect}
                onEdit={this.handleEditBookmark}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onPropertyChange={this.onPropertyChange}
                formatMessage={this.formatMessage}
              />
            </SettingRow>}
        </SettingSection>

        <SettingSection>
          <SettingRow flow='wrap' label={this.formatMessage('drawingDisplay')}>
            <Select value={config.displayType} title={displayTypeTip} aria-label={this.formatMessage('drawingDisplay')} onChange={this.handleDisplayTypeChange} size='sm'>
              <option key='all' value={DisplayType.All} title={displayAllTip}>
                <div className='text-truncate'>{displayAllTip}</div>
              </option>
              <option key='selected' value={DisplayType.Selected} title={displaySelectedTip}>
                <div className='text-truncate'>{displaySelectedTip}</div>
              </option>
            </Select>
          </SettingRow>
          {config.templateType === TemplateType.Gallery &&
            <Fragment>
              <SettingRow label={this.formatMessage('galleryDirection')} role='group' aria-label={this.formatMessage('galleryDirection')}>
                <AdvancedButtonGroup size='sm'>
                  {
                    directions.map((data, i) => {
                      return (
                        <Button
                          key={i} icon active={config.direction === data.value}
                          data-value={data.value}
                          onClick={this.handleDirectionClick}
                          aria-label={data.icon === 'right' ? this.formatMessage('horizontal') : this.formatMessage('vertical')}
                        >
                          {data.icon === 'right' ? <ArrowRightOutlined autoFlip size='s' /> : <ArrowDownOutlined autoFlip size='s' />}
                        </Button>
                      )
                    })
                  }
                </AdvancedButtonGroup>
              </SettingRow>
            </Fragment>}
          {/* <SettingRow>
            <div className="d-flex w-100">
              <Checkbox
                data-field="initBookmark"
                onClick={this.handleCheckboxChange}
                checked={config.initBookmark}
              />
              <div className="text-truncate ml-2" title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
              <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow={true} placement="left">
                <span className="inline-block ml-2 tips-pos">
                  <InfoOutlined />
                </span>
              </Tooltip>
            </div>
          </SettingRow> */}
          {(!runtimeType.includes(config.templateType)) &&
            <SettingRow>
              <div className='d-flex w-100'>
                <Checkbox
                  data-field='runtimeAddAllow'
                  onClick={this.handleCheckboxChange}
                  checked={config.runtimeAddAllow}
                  aria-label={this.formatMessage('runtimeAddAllow')}
                />
                <div className='text-truncate ml-2' title={this.formatMessage('runtimeAddAllow')}>{this.formatMessage('runtimeAddAllow')}</div>
              </div>
            </SettingRow>}
          {(!customType.includes(config.templateType)) &&
            <SettingRow>
              <div className='d-flex w-100'>
                <Checkbox
                  data-field='displayFromWeb'
                  onClick={this.handleCheckboxChange}
                  checked={config.displayFromWeb}
                  aria-label={this.formatMessage('displayFromWeb')}
                />
                <div className='text-truncate ml-2' title={this.formatMessage('displayFromWeb')}>{this.formatMessage('displayFromWeb')}</div>
              </div>
            </SettingRow>}
          {(runtimeType.includes(config.templateType)) && this.renderArrangementSetting()}
        </SettingSection>
      </div>
    )
  }

  render () {
    const { config, theme } = this.props
    const { changeCustomConfirmOpen } = this.state

    return (
      <Fragment>
        <div className={classNames(`${prefix}bookmark-setting`, `${prefix}setting`)} css={getStyle(theme)}>
          {config.isTemplateConfirm ? this.renderDataSetting() : this.renderTemplate()}
        </div>
        {
          changeCustomConfirmOpen &&
            <ConfirmDialog
              level='warning'
              title={this.formatMessage('changeConfirmTitle')}
              hasNotShowAgainOption={false}
              content={this.formatMessage('changeRemind')}
              onConfirm={this.handleChangeOk}
              onClose={this.handleChangeClose}
            />
        }
      </Fragment>
    )
  }
}
