/** @jsx jsx */
import { jsx, css, polished, lodash, Immutable, type ImmutableArray, type WidgetInitResizeCallback, type WidgetInitDragCallback } from 'jimu-core'
import { NavQuickStyleItem, QuickStylePopper, type QuickStylePopperProps } from 'jimu-ui/advanced/setting-components'
import { type NavTemplate, generateDisplayKey } from './utils'
import { type IMViewNavigationDisplay, ViewNavigation } from './components/view-navigation'
import { type NavigationItem } from 'jimu-ui'

const dummyNavData = Immutable([{ name: 'v1', value: 'p1,v1' }, { name: 'v2' }, { name: 'v3' }, { name: 'v4' }]) as ImmutableArray<NavigationItem>

export interface NavQuickStyleProps extends Omit<QuickStylePopperProps, 'onChange'> {
  templates: NavTemplate[]
  display: IMViewNavigationDisplay
  usePopper?: boolean
  onChange: (template: NavTemplate) => void
  onInitResizeHandler?: WidgetInitResizeCallback
  onInitDragHandler?: WidgetInitDragCallback
}

const style = css`
  .body {
    display: flex;
    padding: ${polished.rem(10)} ${polished.rem(20)} ${polished.rem(20)} ${polished.rem(20)};
    width: ${polished.rem(260)};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .quick-style-item:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`

export const NavQuickStyle = (props: NavQuickStyleProps) => {
  const { templates, display, usePopper, onChange, children, ...others } = props

  const renderQuickStylecontent = () => {
    return <div className='body'>
      {
        templates.map((item, index) => {
          const template = { ...item }
          const title = template.label
          delete template.label

          const navBtnStandard = item.type === 'navButtonGroup'
            ? {
                current: 1,
                totalPage: 4,
                disablePrevious: true,
                disableNext: false
              }
            : {}

          const navStandard = item.type === 'nav'
            ? {
                scrollable: false
              }
            : {}

          const starndard = lodash.assign({}, template.standard, navBtnStandard, navStandard)

          return <NavQuickStyleItem key={index} title={title}
            selected={display?.advanced ? false : generateDisplayKey(template) === generateDisplayKey(display as any)}
            onClick={() => { onChange(template) }}>
            <ViewNavigation type={template.type} data={dummyNavData} navStyle={template.navStyle} activeView="v1" standard={starndard} />
          </NavQuickStyleItem>
        })
      }
    </div>
  }

  return usePopper
    ? <QuickStylePopper {...others} css={style} trapFocus={false} autoFocus={false}>
        {renderQuickStylecontent()}
      </QuickStylePopper>
    : <div css={style}>{renderQuickStylecontent()}</div>
}

export default { NavQuickStyle }
