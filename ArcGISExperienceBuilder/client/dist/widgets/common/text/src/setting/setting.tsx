import { React, Immutable, type IMState, type UseDataSource, ReactRedux, type Expression, getAppStore, AllDataSourceTypes, hooks } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { type Editor } from 'jimu-ui/advanced/rich-text-editor'
import { type IMConfig } from '../config'
import { Switch, defaultMessages as jimuUiMessage, richTextUtils, TextArea } from 'jimu-ui'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import defaultMessages from './translations/default'
import { ExpressionInput, ExpressionInputType } from 'jimu-ui/advanced/expression-builder'
import { replacePlaceholderTextContent } from '../utils'
import { RichFormatClear, RichTextFormats } from './editor-plugins'

type SettingProps = AllWidgetSettingProps<IMConfig>

const SUPPORTED_TYPES = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])
const defaultExpressionInputTypes = Immutable([ExpressionInputType.Static, ExpressionInputType.Attribute, ExpressionInputType.Statistics, ExpressionInputType.Expression])
const DefaultUseDataSources = Immutable([])
const Setting = (props: SettingProps): React.ReactElement => {
  const {
    id,
    config,
    useDataSources,
    useDataSourcesEnabled,
    onSettingChange
  } = props

  const placeholderEditable = getAppStore().getState().appStateInBuilder?.appInfo?.type === 'Web Experience Template'
  const wrap = config?.style?.wrap ?? true
  const text = config?.text
  const placeholder = config?.placeholder
  const placeholderText = React.useMemo(() => richTextUtils.getHTMLTextContent(placeholder) ?? '', [placeholder])
  const tooltip = config?.tooltip
  const appStateInBuilder = ReactRedux.useSelector((state: IMState) => state.appStateInBuilder)
  const mutableStateVersion = appStateInBuilder?.widgetsMutableStateVersion?.[id]?.editor
  const isInlineEditing = appStateInBuilder?.widgetsRuntimeInfo?.[id]?.isInlineEditing
  const hasDataSource = useDataSourcesEnabled && useDataSources?.length > 0
  const [editor, setEditor] = React.useState<Editor>(null)
  const [openTip, setOpenTip] = React.useState(false)

  React.useEffect(() => {
    const mutableStoreManager = window._appWindow._mutableStoreManager
    const editor = mutableStoreManager?.getStateValue([id, 'editor']) ?? null
    setEditor(editor)
  }, [mutableStateVersion, id])

  const translate = hooks.useTranslation(defaultMessages, jimuUiMessage)

  const handleDataSourceChange = (useDataSources: UseDataSource[]): void => {
    if (useDataSources == null) {
      return
    }

    onSettingChange({
      id,
      useDataSources: useDataSources
    })
  }

  const toggleUseDataEnabled = (): void => {
    const dataSourcesEnabled = !useDataSourcesEnabled
    if (tooltip && !dataSourcesEnabled) {
      onSettingChange({
        id,
        config: config.without('tooltip'),
        useDataSourcesEnabled: dataSourcesEnabled
      })
    } else {
      onSettingChange({ id, useDataSourcesEnabled: dataSourcesEnabled })
    }
  }

  const toggleWrap = (): void => {
    onSettingChange({
      id,
      config: config.setIn(['style', 'wrap'], !wrap)
    })
  }

  const handleTooltipChange = (expression: Expression): void => {
    if (expression == null) {
      return
    }

    onSettingChange({
      id,
      config: config.set('tooltip', expression)
    })
    setOpenTip(false)
  }

  const handlePlaceholderTextChange = (text: string) => {
    text = text.replace(/\n/mg, '')
    const newPlaceholder = replacePlaceholderTextContent(placeholder, text)
    onSettingChange({
      id,
      config: config.set('placeholder', newPlaceholder)
    })
  }

  const handleTextChange = (value: string): void => {
    const onlyPlaceholder = richTextUtils.isBlankRichText(text) && !!placeholder
    const key = !isInlineEditing && onlyPlaceholder ? 'placeholder' : 'text'
    onSettingChange({
      id,
      config: config.set(key, value)
    })
  }

  const expInputFroms = React.useMemo(() => hasDataSource ? defaultExpressionInputTypes : Immutable([ExpressionInputType.Static]), [hasDataSource])

  return (
    <div className='widget-setting-text jimu-widget-setting'>
      <SettingSection>
        <SettingRow>
          <DataSourceSelector
            isMultiple
            types={SUPPORTED_TYPES}
            useDataSources={useDataSources}
            useDataSourcesEnabled={useDataSourcesEnabled}
            onToggleUseDataEnabled={toggleUseDataEnabled}
            onChange={handleDataSourceChange}
            widgetId={id}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection>
        <SettingRow flow='no-wrap' label={translate('wrap')}>
          <Switch checked={wrap} onChange={toggleWrap} aria-label={translate('wrap')} />
        </SettingRow>
        <SettingRow label={translate('tooltip')} flow='wrap' role='group' aria-label={translate('tooltip')}>
          <div className='w-100'>
            <ExpressionInput
              aria-label={translate('tooltip')}
              autoHide useDataSources={hasDataSource ? useDataSources : DefaultUseDataSources} onChange={handleTooltipChange} openExpPopup={() => { setOpenTip(true) }}
              expression={typeof tooltip === 'object' ? tooltip : null} isExpPopupOpen={openTip} closeExpPopup={() => { setOpenTip(false) }}
              types={expInputFroms}
              widgetId={id}
            />
          </div>
        </SettingRow>
        {placeholderEditable && <SettingRow flow='wrap' label={translate('placeholder')}>
          <TextArea aria-label={translate('placeholder')} defaultValue={placeholderText} onAcceptValue={handlePlaceholderTextChange}></TextArea>
        </SettingRow>}

      </SettingSection>

      {editor != null && <SettingSection>
        <SettingRow flow='no-wrap' label={translate('textFormat')} role='group' aria-label={translate('textFormat')}>
          <RichFormatClear
            editor={editor}
            onChange={handleTextChange}
          />
        </SettingRow>

        <SettingRow>
          <RichTextFormats
            editor={editor}
            useDataSources={useDataSources}
            widgetId={id}
            onChange={handleTextChange}
          />
        </SettingRow>
      </SettingSection>}
    </div>
  )
}

export default Setting
