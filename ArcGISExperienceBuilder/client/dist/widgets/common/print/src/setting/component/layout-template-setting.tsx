/** @jsx jsx */
import { type IMPrintTemplateProperties, type IMConfig, PrintTemplateType, LayoutTypes, type ActiveItem } from '../../config'
import { React, jsx, hooks, type AppInfo, css } from 'jimu-core'
import { getNewConfigByCustomLayoutItem, getPortaUrlByUtility } from '../../utils/service-util'
import { initTemplateLayout } from '../../utils/utils'
import { AppItemSelector } from 'jimu-ui/advanced/app-item-selector'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { type SettingChangeFunction } from 'jimu-for-builder'
import { Select, Option, Radio } from 'jimu-ui'

import defaultMessage from '../translations/default'

const { useState, useEffect } = React

const STYLE = css`
  .radio-con {
    cursor: pointer;
  }
`

interface Props {
  id: string
  template: IMPrintTemplateProperties
  config: IMConfig
  templateIndex: number
  handleLayoutChange?: (layoutName: string) => void
  onSettingChange?: SettingChangeFunction
  toggleLoading?: (showLoading?: boolean) => void
}

const LayoutTemplateSetting = (props: Props) => {
  const nls = hooks.useTranslation(defaultMessage)
  const { id, template, config, templateIndex, handleLayoutChange, onSettingChange, toggleLoading } = props

  const [layoutItem, setLayoutItem] = useState(null as ActiveItem)
  const [portalUrl, setPortalUrl] = useState(null)

  useEffect(() => {
    setLayoutItem(template?.customLayoutItem)
  }, [templateIndex])

  useEffect(() => {
    getPortaUrlByUtility(config.useUtility).then(portalUrl => {
      setPortalUrl(portalUrl)
    })
  }, [config.useUtility])

  const handleCustomLayoutChange = async (appInfo: AppInfo) => {
    const customLayoutId = appInfo.id
    const newLayoutItem = {
      id: customLayoutId,
      title: appInfo.title
    }
    setLayoutItem(newLayoutItem)
    toggleLoading(true)
    getNewConfigByCustomLayoutItem(config, newLayoutItem, templateIndex).then(newConfig => {
      toggleLoading(false)
      onSettingChange({
        id: id,
        config: newConfig
      })
    }, err => {
      setLayoutItem(template?.customLayoutItem || null)
      toggleLoading(false)
    })
  }

  const toUseCustomLayout = () => {
    const newTemplateItem = template.set('layoutTypes', LayoutTypes.CustomLayout).set('customLayoutItem', null)
    const printTemplate = config?.printTemplateType === PrintTemplateType.Customize ? config.printCustomTemplate?.asMutable({ deep: true }) : config.printOrgTemplate?.asMutable({ deep: true })

    printTemplate[templateIndex] = newTemplateItem?.asMutable({ deep: true })
    const newConfig = config?.printTemplateType === PrintTemplateType.Customize ? config.set('printCustomTemplate', printTemplate) : config.set('printOrgTemplate', printTemplate)
    setLayoutItem(null)
    onSettingChange({
      id: id,
      config: newConfig
    })
  }

  const handleUseServiceLayout = () => {
    const layoutName = config?.layoutChoiceList?.[templateIndex]?.layout
    handleLayoutChange(initTemplateLayout(layoutName))
  }

  const getLayoutSelection = () => {
    const supportCustomLayout = config.supportCustomLayout
    const useServiceLayout = !template?.layoutTypes || template?.layoutTypes === LayoutTypes.ServiceLayout || !supportCustomLayout
    return (
      <div role='group' aria-label={nls('printLayout')}>
        {supportCustomLayout && <SettingRow>
          <div className='d-flex radio-con align-items-center' title={nls('useServiceLayout')} onClick={handleUseServiceLayout}>
            <Radio className='mr-1' checked={useServiceLayout} title={nls('useServiceLayout')}/>
            <span>{nls('useServiceLayout')}</span>
          </div>
        </SettingRow>}

        {supportCustomLayout && <SettingRow>
            <div className='d-flex radio-con align-items-center' title={nls('useCustomLayout')} onClick={toUseCustomLayout}>
              <Radio checked={template?.layoutTypes === LayoutTypes.CustomLayout} className='mr-1' title={nls('useCustomLayout')}/>
              <span>{nls('useCustomLayout')}</span>
            </div>
          </SettingRow>}

        {useServiceLayout && <SettingRow>
          <Select
            value={initTemplateLayout(template?.layout)}
            onChange={(e) => { handleLayoutChange(e.target.value) }}
            size='sm'
            disabled={config?.printTemplateType === PrintTemplateType.OrganizationTemplate}
            aria-label={nls('printLayout')}
          >
            {config?.layoutChoiceList?.map((layout, index) => {
              return (<Option
                key={`layout${index}`}
                value={layout?.layoutTemplate}
                title={layout?.layoutTemplate}
              >
                {layout?.layoutTemplate}
              </Option>)
            })}
          </Select>
        </SettingRow>}

        {(template?.layoutTypes === LayoutTypes.CustomLayout && supportCustomLayout) && <SettingRow>
          <AppItemSelector
            portalUrl={portalUrl}
            activeItem={layoutItem}
            itemtype='Layout'
            size='sm'
            placeholder={nls('selectLayoutItemPlaceholder')}
            onChange={handleCustomLayoutChange}
          />
        </SettingRow>}
      </div>
    )
  }

  return (
    <div className='custom-layout-setting-con mt-2' css={STYLE}>
      <SettingRow flow='wrap' label={nls('printLayout')}/>
      {getLayoutSelection()}
    </div>
  )
}
export default LayoutTemplateSetting
