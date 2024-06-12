/** @jsx jsx */
import {
  React,
  type IMState,
  classNames,
  css,
  jsx,
  type AllWidgetProps,
  AppMode,
  appActions,
  Immutable,
  type ImmutableObject,
  BrowserSizeMode
} from 'jimu-core'
import { type IMConfig, Direction, PointStyle, type Config } from '../config'
import { getNewDividerLineStyle, getDividerLinePositionStyle, getNewPointStyle } from './utils/util'
interface Props {
  appMode: AppMode
  browserSizeMode: BrowserSizeMode
  active: boolean
  showQuickStyle: boolean
  /**
   * Whether the widget has ever mounted.
   */
  hasEverMount: boolean
  uri: string
}

interface States {
  isMount: boolean

}

export class Widget extends React.PureComponent<
AllWidgetProps<IMConfig> & Props,
States
> {
  domNode: HTMLDivElement
  constructor (props) {
    super(props)
    this.state = {
      isMount: false
    }
  }

  static mapExtraStateProps = (
    state: IMState,
    props: AllWidgetProps<IMConfig>
  ): Props => {
    let selected = false
    const selection = state.appRuntimeInfo.selection
    if (selection && state.appConfig.layouts[selection.layoutId]) {
      const layoutItem =
        state.appConfig.layouts[selection.layoutId].content[
          selection.layoutItemId
        ]
      selected = layoutItem && layoutItem.widgetId === props.id
    }
    const isInBuilder = state.appContext.isInBuilder
    const active = isInBuilder && selected

    const widgetState = state.widgetsState[props.id] || Immutable({})
    const showQuickStyle = !!widgetState.showQuickStyle
    return {
      appMode: selection ? state?.appRuntimeInfo?.appMode : null,
      browserSizeMode: state?.browserSizeMode,
      active,
      showQuickStyle,
      hasEverMount: widgetState.hasEverMount,
      uri: state.appConfig.widgets?.[props.id]?.uri
    }
  }

  componentDidMount () {
    const { active, hasEverMount, id } = this.props
    const isShowQuickStyle = window.jimuConfig.isInBuilder && active && !hasEverMount
    if (isShowQuickStyle) {
      this.toggleQuickStyle(true)
    }
    if (!this.props.hasEverMount) {
      this.props.dispatch(appActions.widgetStatePropChange(id, 'hasEverMount', true))
    }
    this.setState({
      isMount: true
    })
  }

  componentDidUpdate (
    prevProps: AllWidgetProps<IMConfig> & Props,
    prevState: States
  ) {
    const { id, uri, appMode, active, showQuickStyle, browserSizeMode, builderSupportModules } = this.props
    if ((appMode !== prevProps.appMode && appMode === AppMode.Run) || active !== prevProps.active) {
      this.toggleQuickStyle()
    }

    const showPanelChange = showQuickStyle !== prevProps.showQuickStyle || active !== prevProps.active
    const isSmall = browserSizeMode === BrowserSizeMode.Small
    const isShowQuickStyle = showQuickStyle && active
    if (showPanelChange && isSmall) {
      builderSupportModules.widgetModules.appBuilderSync.publishSidePanelToApp({
        type: 'dividerQuickStyle',
        widgetId: id,
        uri,
        onChange: this.onQuickStyleChange,
        active: isShowQuickStyle
      })
    }
  }

  editWidgetConfig = newConfig => {
    if (!window.jimuConfig.isInBuilder) return

    const appConfigAction = this.props.builderSupportModules.jimuForBuilderLib.getAppConfigAction()
    appConfigAction.editWidgetConfig(this.props.id, newConfig).exec()
  }

  getStyle = () => {
    return css`
      & {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
      .divider-con {
        height: 100%;
        width: 100%;
      }
    `
  }

  onQuickStyleChange = (newConfig: ImmutableObject<Config>) => {
    const id = this.props.id
    const builderSupportModules = this.props.builderSupportModules
    const getAppConfigAction =
      builderSupportModules?.jimuForBuilderLib?.getAppConfigAction
    if (getAppConfigAction) {
      getAppConfigAction()
        .editWidgetProperty(id, 'config', newConfig)
        .exec()
    }
  }

  toggleQuickStyle = (isOpen = false) => {
    this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', isOpen))
  }

  getQuickStyleComponent = () => {
    const { showQuickStyle, active, id, browserSizeMode, onInitDragHandler, onInitResizeHandler } = this.props
    const { isMount } = this.state
    const QuickStyle = this?.props?.builderSupportModules?.widgetModules?.QuickStyle
    const isSmall = browserSizeMode === BrowserSizeMode.Small
    if (isSmall) return null
    return (!QuickStyle && isMount)
      ? null
      : (
        <QuickStyle
          isOpen={showQuickStyle && active}
          onSettingChange={this.onQuickStyleChange}
          reference={this?.domNode}
          id={id}
          usePopper
          onInitDragHandler={onInitDragHandler}
          onInitResizeHandler={onInitResizeHandler}
        />
        )
  }

  render () {
    const { config, id } = this.props
    const { direction, pointEnd, pointStart } = config
    const classes = classNames(
      'jimu-widget',
      'widget-divider',
      'position-relative',
      'divider-widget-' + id
    )

    const dividerLineClassName =
      direction === Direction.Horizontal ? 'horizontal' : 'vertical'
    const dividerLineStyle = getNewDividerLineStyle(config)
    const dividerLinePositionStyle = getDividerLinePositionStyle(config)

    const pointStartStyle = getNewPointStyle(config, true)
    const pointEndStyle = getNewPointStyle(config, false)
    const dividerLineClasses = classNames(
      'divider-line',
      'position-absolute',
      dividerLineClassName,
      `point-start-${pointStart.pointStyle}`,
      `point-end-${pointEnd.pointStyle}`
    )
    return (
      <div
        className={classes}
        css={this.getStyle()}
        ref={node => (this.domNode = node)}
      >
        <div className='position-relative divider-con'>
          <div className='point-con'>
            {pointStart.pointStyle !== PointStyle.None && (
              <span
                data-testid='divider-point-start'
                className='point-start position-absolute'
                css={pointStartStyle}
              />
            )}
            {pointEnd.pointStyle !== PointStyle.None && (
              <span
                data-testid='divider-point-end'
                className='point-end position-absolute'
                css={pointEndStyle}
              />
            )}
          </div>
          <div
            data-testid='divider-line'
            className={dividerLineClasses}
            css={[dividerLineStyle, dividerLinePositionStyle]}
          />
          {window.jimuConfig.isInBuilder && this.getQuickStyleComponent()}
        </div>
      </div>
    )
  }
}

export default Widget
