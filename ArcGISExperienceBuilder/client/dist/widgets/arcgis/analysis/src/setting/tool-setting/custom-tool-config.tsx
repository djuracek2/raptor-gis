/** @jsx jsx */
import { React, jsx, css, type ImmutableObject, hooks } from 'jimu-core'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { CollapsablePanel, defaultMessages as jimuiDefaultMessages, Switch, TextInput } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { type CustomToolOutput, type CustomToolConfig, type ToolConfig } from '../../config'
import CustomToolInputConfig from './custom-tool-input-config'
import CustomToolOutputConfig from './custom-tool-output-config'
import { type AnalysisToolParam } from 'analysis-ui-schema'

const style = css`
  >.jimu-widget-setting--section {
    padding: 0.375rem 1rem;
  }
  .config-section {
    >.collapse >.config-section-detail {
      padding-bottom: 0.375rem;
    }
  }
  .parameter-setting-collapse {
    margin-bottom: 0.5rem;
    &:first-of-type {
      margin-top: 0.5rem
    }
    &:last-child {
      margin-bottom: 0;
      .collapse {
        padding-bottom: 0;
      }
    }
  }
  .config-section-detail {
    .collapse-header {
      height: 1.625rem;
      padding: 0 0.5rem 0 0.375rem;
      background-color: var(--secondary);
      .title {
        font-size: 0.8125rem !important;
      }
    }

    .last-setting-row {
      padding-bottom: 0.25rem;
    }
    .dark-600 {
      color: var(--dark-600) !important;
    }
    .label-drak-400 .jimu-widget-setting--row-label {
      color: var(--dark-400) !important;
    }
  }
  .label-drak-800 .jimu-widget-setting--row-label {
    color: var(--dark-800) !important;
  }
  .first-option {
    padding-top: 0.75rem;
    padding-bottom: 0.5rem;
  }
`

interface Props {
  toolConfig: ImmutableObject<ToolConfig>
  onConfigChange: (setInArray: string[], value: any) => void
}

const CustomToolConfigPopperContent = (props: Props) => {
  const { toolConfig, onConfigChange } = props
  const { toolInfo, output, option, toolUrl } = toolConfig.config as ImmutableObject<CustomToolConfig>

  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)

  const handleParameterChange = (parameters: AnalysisToolParam[]) => {
    onConfigChange(['config', 'toolInfo', 'parameters'], parameters)
  }

  const handleOutputChange = (output: CustomToolOutput) => {
    onConfigChange(['config', 'output'], output)
  }

  return (
    <div css={style} onKeyDown={(e) => { e.stopPropagation() }}>
      <SettingSection>
        <CollapsablePanel className='config-section' label={translate('input')} type="default" defaultIsOpen={false} aria-label={translate('input')}>
          <CustomToolInputConfig className='config-section-detail' parameters={toolInfo.parameters} onChange={handleParameterChange} />
        </CollapsablePanel>
      </SettingSection>
      <SettingSection>
        <CollapsablePanel className='config-section' label={translate('output')} type="default" defaultIsOpen={false} aria-label={translate('output')}>
          <CustomToolOutputConfig className='config-section-detail' parameters={toolInfo.parameters} output={output} toolUrl={toolUrl} onParameterChange={handleParameterChange} onOuputChange={handleOutputChange} />
        </CollapsablePanel>
      </SettingSection>
      <SettingSection>
        <CollapsablePanel className='config-section' label={translate('option')} type="default" defaultIsOpen={false} aria-label={translate('option')}>
          <SettingRow className='label-drak-800 first-option' label={translate('showToolHelpLink')}>
            <Switch checked={option.showHelpLink} aria-label={translate('showToolHelpLink')} onChange={(e, checked) => { onConfigChange(['config', 'option', 'showHelpLink'], checked) }} />
          </SettingRow>
          {option.showHelpLink && <TextInput size='sm' className='w-100 mt-2' value={option.link} onChange={(e) => { onConfigChange(['config', 'option', 'link'], e.target.value) }} />}
        </CollapsablePanel>
      </SettingSection>
    </div>
  )
}

export default CustomToolConfigPopperContent
