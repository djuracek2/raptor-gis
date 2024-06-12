import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { versionManager } from '../version-manager'
import { MenuNavigation, type MenuNavigationProps } from './menu-navigation'

type MenuProps = AllWidgetProps<IMConfig>

const Widget = (props: MenuProps) => {
  const { config } = props

  return (
    <div className='widget-menu jimu-widget'>
      <MenuNavigation {...(config as MenuNavigationProps)} />
    </div>
  )
}

Widget.versionManager = versionManager

export default Widget
