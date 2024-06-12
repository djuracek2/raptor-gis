/** @jsx jsx */
import { React, jsx, classNames, hooks } from 'jimu-core'
import { useTheme } from 'jimu-theme'
import { WidgetPlaceholder, Tooltip, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { type Arrangement, ArrangementStyle, ArrangementDirection } from '../../../constraints'
import defaultMessages from '../../translations/default'
import { getStyle } from './style'

import WidgetIcon from '../../../../icon.svg'

export interface Props {
  widgetId: string
  arrangement: Arrangement
}

const MODIFIERS = [{
  name: 'preventOverflow',
  options: {
    altAxis: true
  }
}]

export const PlaceHolder = React.memo((props: Props) => {
  const translate = hooks.useTranslation(defaultMessages, jimuUIMessages)
  const theme = useTheme()

  const hint = translate('select3DMapHint')

  const isShowHintFlag = (props.arrangement.style === ArrangementStyle.List)
  const direction = (props.arrangement.direction === ArrangementDirection.Horizontal) ? 'bottom' : 'right'
  return (
    <React.Fragment>
      <Tooltip
        disableHoverListener={isShowHintFlag}
        disableTouchListener={isShowHintFlag}
        disableFocusListener={isShowHintFlag}
        placement={direction}
        modifiers={MODIFIERS}
        showArrow
        title={<div className="p-2" style={{ background: 'var(--light-200)', border: '1px solid var(--light-800)' }}>{hint}</div>}
        arrowStyle={{
          background: 'var(--light-200)',
          border: {
            color: 'var(--light-800)',
            width: '1px'
          }
        }}
      >
        <div className={classNames('h-100', { 'hide-msg': !isShowHintFlag })} css={getStyle(theme)}>
          <WidgetPlaceholder
            widgetId={props.widgetId}
            icon={WidgetIcon}
            title={hint}
            message={isShowHintFlag ? hint : null}
          />
        </div>
      </Tooltip>
    </React.Fragment>
  )
})
