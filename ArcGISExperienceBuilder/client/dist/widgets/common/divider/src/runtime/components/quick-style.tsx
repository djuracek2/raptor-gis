/** @jsx jsx */
import {
  React,
  jsx,
  type IntlShape,
  injectIntl,
  css,
  type SerializedStyles,
  type ImmutableObject,
  classNames,
  polished,
  Immutable,
  type WidgetInitResizeCallback,
  type WidgetInitDragCallback,
  ReactRedux,
  type IMState,
  hooks,
  appActions,
  getAppStore
} from 'jimu-core'
import { getQuickStyleConfig } from './quick-style-config'
import { PointStyle, type Config, Direction } from '../../config'
import {
  QuickStylePopper,
  type QuickStylePopperProps
} from 'jimu-ui/advanced/setting-components'
import { Button } from 'jimu-ui'
import { useTheme2, useTheme } from 'jimu-theme'
import defaultMessages from '../translations/default'
import { getNewDividerLineStyle, getDividerLinePositionStyle, getNewPointStyle } from '../utils/util'
interface OwnProps extends Omit<QuickStylePopperProps, 'reference'> {
  id: string
  onSettingChange: (config: ImmutableObject<Config>) => void
  usePopper?: boolean

  isOpen?: boolean
  reference?: HTMLDivElement
  onInitResizeHandler?: WidgetInitResizeCallback
  onInitDragHandler?: WidgetInitDragCallback
}

interface ExtraProps {
  intl: IntlShape
}

const _QuickStyle = (props: OwnProps & ExtraProps) => {
  const { isOpen, reference, id, usePopper, onInitResizeHandler, onInitDragHandler, onSettingChange } = props
  const widgetConfigRef = React.useRef(null)
  const widgetConfig = ReactRedux.useSelector((state: IMState) => {
    const appConfig = state?.appStateInBuilder?.appConfig || state.appConfig
    const newWidgetConfig = appConfig?.widgets?.[id]?.config
    widgetConfigRef.current = newWidgetConfig
    return newWidgetConfig
  })
  const nls = hooks.useTranslation(defaultMessages)
  const defaultTheme = useTheme()
  const theme2 = useTheme2()

  const getStyle = (): SerializedStyles => {
    const theme = defaultTheme
    return css`
      width: ${polished.rem(360)};
      z-index: 1001 !important;
      .quick-style-title {
        color: ${theme2.colors?.palette?.dark?.[600]};
        cursor: pointer;
        font-size: ${polished.rem(16)};
        div,
        svg {
          color: ${theme2.colors?.palette?.dark?.[600]};
        }
      }
      .button-item {
        width: 100%;
        font-size: ${polished.rem(13)};
      }
      button {
        border-radius: 0;
      }
      .quick-style-item-container {
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 8px;
      }
      .quick-style-item {
        border: 2px solid transparent;
        &.quick-style-item-selected {
          border: 2px solid ${theme.colors.palette.primary[700]};
        }
        .quick-style-item-inner {
          background-color: ${theme.colors.palette.light[200]};
          cursor: pointer;
        }
      }
    `
  }

  const toggleQuickStyle = (isOpen = false) => {
    getAppStore().dispatch(
      appActions.widgetStatePropChange(id, 'showQuickStyle', isOpen)
    )
  }

  const quickStyleComponent = () => {
    const selectedType = widgetConfig?.themeStyle?.quickStyleType
    const quickStyleComponent = []
    const QuickStyleConfig = getQuickStyleConfig(defaultTheme)
    let index = 0
    for (const key in QuickStyleConfig) {
      index += 1
      const config = QuickStyleConfig[key]
      const { pointStart, pointEnd, themeStyle } = config
      const dividerLineStyle = getNewDividerLineStyle(config)
      const dividerLinePositionStyle = getDividerLinePositionStyle(config)
      const pointStartStyle = getNewPointStyle(config, true)
      const pointEndStyle = getNewPointStyle(config, false)
      const dividerLineClasses = classNames(
        'divider-line',
        'position-absolute',
        `point-start-${pointStart.pointStyle}`,
        `point-end-${pointEnd.pointStyle}`
      )
      const ele = (
        <div key={key} className='col-6 quick-style-item-container'>
          <div
            className={classNames('quick-style-item', {
              'quick-style-item-selected':
                selectedType === themeStyle.quickStyleType
            })}
          >
            <Button
              className='quick-style-item-inner p-2 w-100'
              onClick={() => { onConfirm(config) }}
              title={nls('quickStyleItem', { index: index })}
            >
              <div className='quick-style-item-inner p-2 position-relative'>
                {pointStart.pointStyle !== PointStyle.None && (
                  <span
                    className='point-start position-absolute'
                    css={pointStartStyle}
                  />
                )}
                <div
                  className={dividerLineClasses}
                  css={[dividerLineStyle, dividerLinePositionStyle]}
                />
                {pointEnd.pointStyle !== PointStyle.None && (
                  <span
                    className='point-end position-absolute'
                    css={pointEndStyle}
                  />
                )}
              </div>
            </Button>
          </div>
        </div>
      )
      quickStyleComponent.push(ele)
    }
    return quickStyleComponent
  }

  const onConfirm = hooks.useEventCallback(config => {
    config.direction = widgetConfigRef.current?.direction || Direction.Horizontal
    onSettingChange(Immutable(config))
  })

  const renderQuickStyleContent = () => {
    return usePopper
      ? (
          <QuickStylePopper
            reference={reference}
            open={isOpen}
            placement='right-start'
            css={getStyle()}
            trapFocus={false}
            autoFocus={false}
            onClose={() => {
              toggleQuickStyle(false)
            }}
            onInitResizeHandler={onInitResizeHandler}
            onInitDragHandler={onInitDragHandler}
          >
            <div className='container-fluid mb-2'>
              <div className='row no-gutters'>{quickStyleComponent()}</div>
            </div>
          </QuickStylePopper>
        )
      : (
          <div className='container-fluid mb-2' css={getStyle()}>
            <div className='row no-gutters'>{quickStyleComponent()}</div>
          </div>
        )
  }

  return (
    <div>
      {renderQuickStyleContent()}
    </div>
  )
}

export const QuickStyle = injectIntl(_QuickStyle)
