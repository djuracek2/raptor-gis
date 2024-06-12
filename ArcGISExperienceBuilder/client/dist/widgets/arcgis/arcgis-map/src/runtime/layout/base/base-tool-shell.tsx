/** @jsx jsx */
import { jsx, classNames, type IntlShape } from 'jimu-core'
import { UIComponent, type UIComponentProps } from './ui-component'
import { type ToolConfig } from '../../../config'
import { type ActiveToolInfo } from './base-tool'
import { type LayoutJson, type ToolJson } from '../config'
import ToolModules from '../tool-modules'

export interface ToolShellProps extends UIComponentProps {
  mapWidgetId: string
  layoutConfig: LayoutJson
  toolConfig: ToolConfig
  toolName: string
  isMobile?: boolean
  isHidden?: boolean
  intl?: IntlShape
  isLastElement?: boolean

  className?: string
  activeToolInfo: ActiveToolInfo
  onActiveToolInfoChange: (activeToolInfo: ActiveToolInfo) => void
  autoControlWidgetId: string
}

export default class BaseToolShell extends UIComponent<ToolShellProps, unknown> {
  render () {
    const ToolClass = ToolModules[this.props.toolName]

    let isAvailable = true

    if (ToolClass) {
      if (ToolClass.isAvailable) {
        isAvailable = ToolClass.isAvailable(this.props)
      } else {
        isAvailable = true
      }
    } else {
      isAvailable = false
    }

    if (isAvailable) {
      const className = `exbmap-ui exbmap-ui-tool-shell divitem exbmap-ui-tool-shell-${this.props.toolName}`
      const styleObj = this.props.layoutConfig.elements[this.props.toolName].style || {}

      return (
        <div
          className={classNames(this.props.className, className, (this.props.layoutConfig.elements[this.props.toolName] as ToolJson).className,
            {
              'exbmap-ui-hidden-element': this.props.isHidden,
              'rounded-pill': ['Compass'].includes(this.props.toolName)
            })}
          style={styleObj}
        >
          <ToolClass
            mapWidgetId={this.props.mapWidgetId}
            ref='baseToolInstance' toolJson={this.props.layoutConfig.elements[this.props.toolName]} toolName={this.props.toolName} isMobile={this.props.isMobile}
            jimuMapView={this.props.jimuMapView} activeToolInfo={this.props.activeToolInfo} onActiveToolInfoChange={this.props.onActiveToolInfoChange}
            intl={this.props.intl} theme={this.props.theme} autoControlWidgetId={this.props.autoControlWidgetId}
          />
        </div>
      )
    } else {
      if (this.props.isMobile) {
        return <span />
      } else {
        return null
      }
    }
  }
}
