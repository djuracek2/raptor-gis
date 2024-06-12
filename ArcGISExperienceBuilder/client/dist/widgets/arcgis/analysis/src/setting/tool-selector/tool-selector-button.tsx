/** @jsx jsx */
import { React, jsx, css } from 'jimu-core'
import { PlusCircleOutlined } from 'jimu-icons/outlined/editor/plus-circle'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'
import { Button, Icon, type ButtonProps, Tooltip } from 'jimu-ui'
import { getLimitLineContentStyle } from '../../utils/util'

interface Props extends ButtonProps {
  iconSvg: string
  text: string
  disabledWarningText?: string
}

const style = css`
  line-height: 1.3;
  padding: 7px 8px;
  text-align: left;
  border: none !important;
  border-radius: 0;
  background: var(--light-500);
  &:hover {
    background: var(--light-600);
  }
  &:disabled, .disabled:hover {
    background: var(--light-500) !important;
    color: var(--dark-400);
  }
  .text {
    flex: 1;
    ${getLimitLineContentStyle()}
  }
`

const ToolSelectorButton = React.forwardRef((props: Props & React.RefAttributes<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>): React.ReactElement => {
  const { text, iconSvg, disabled, disabledWarningText, ...rest } = props
  return (
    <Button
      ref={ref}
      css={style}
      type='primary'
      title={text}
      aria-label={text}
      className='w-100'
      disabled={disabled}
      {...rest}>
      <div className='d-flex align-items-center inner-box'>
        <Icon icon={iconSvg}></Icon>
        <span className='text'>{text}</span>
        {disabled && !!disabledWarningText && <Tooltip placement='bottom' showArrow interactive title={<span dangerouslySetInnerHTML={{ __html: disabledWarningText }}></span>} css={css`width: 230px; padding: 8px 10px 6px 8px;`}>
          <Button className='border-0 mr-2' size='sm' type='tertiary' icon >
            <WarningOutlined color='var(--warning-700)' />
          </Button>
        </Tooltip>}
        <PlusCircleOutlined size={16} />
      </div>
    </Button>
  )
})

export default ToolSelectorButton
