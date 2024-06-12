/** @jsx jsx */
/* eslint-disable prefer-const */
import {
  React,
  css,
  jsx,
  type IconResult,
  type IMThemeVariables,
  type ImmutableObject,
  type ThemePaper,
  Immutable,
  useIntl,
  hooks
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { type IMConfig, MenuType } from '../config'
import {
  Select,
  Radio,
  Label,
  Switch,
  type LinearUnit,
  type AnchorDirection,
  TextAlignValue,
  defaultMessages as jimuiDefaultMessage
} from 'jimu-ui'
import { type MenuNavigationStandard } from '../runtime/menu-navigation'
import { IconPicker } from 'jimu-ui/advanced/resource-selector'
import {
  InputUnit,
  NavStyleSettingByState,
  type ComponentState,
  TextAlignment
} from 'jimu-ui/advanced/style-setting-components'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { useMenuNavigationVariant, getMenuNavigationVariant, changeAutoSizeAndDefaultSize } from './utils'
import defaultMessage from './translations/default'
import { useTheme2 } from 'jimu-theme'

const getPaperFromTheme = (
  theme: IMThemeVariables
): ImmutableObject<ThemePaper> => {
  return theme?.components?.paper
}

type SettingProps = AllWidgetSettingProps<IMConfig>

const style = css`
  .radio-container {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    > span.jimu-radio {
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    > label {
      margin-bottom: 0;
    }
  }
`

const Setting = (props: SettingProps) => {
  const translate = hooks.useTranslation(defaultMessage, jimuiDefaultMessage)
  const appTheme = useTheme2()

  const { config: _config, id, onSettingChange } = props

  const {
    vertical,
    type,
    menuStyle,
    variant: cfVariant,
    advanced,
    standard
  } = _config
  const { anchor, textAlign, icon, submenuMode, gap, showIcon } =
    standard || ({} as MenuNavigationStandard)

  const variant = useMenuNavigationVariant(
    'nav',
    menuStyle,
    advanced,
    cfVariant
  )
  const paper = advanced ? _config?.paper : getPaperFromTheme(appTheme)

  const menuType =
    type === 'drawer'
      ? MenuType.Icon
      : vertical
        ? MenuType.Vertical
        : MenuType.Horizontal

  const defaultIcon = React.useMemo(() => {
    return {
      svg:
        // eslint-disable-next-line max-len
        '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="css-1i7frhi jimu-icon"><path d="M2 1a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4z" fill="currentColor" fill-rule="nonzero"></path></svg>',
      properties: {
        color: 'var(--dark-800)',
        size: 20,
        inlineSvg: true,
        filename: translate('menu')
      }
    } as IconResult
  }, [translate])

  const intl = useIntl()
  const iconCustomLabel = React.useMemo(() => {
    if (!icon?.properties?.filename) {
      return
    }
    const id = icon.properties.filename
    return intl.formatMessage({ id, defaultMessage: defaultMessage[id] || jimuiDefaultMessage[id] || id })
  }, [icon?.properties?.filename, intl])

  const generateNavTypes = () => {
    return [
      { label: translate('default'), value: 'default' },
      { label: translate('underline'), value: 'underline' },
      { label: translate('pills'), value: 'pills' }
    ]
  }

  const onSettingConfigChange = (key: string | string[], value: any) => {
    onSettingChange({
      id,
      config: Array.isArray(key)
        ? _config.setIn(key, value)
        : _config.set(key, value)
    })
  }

  const onAdvancedChange = () => {
    const advanced = !_config?.advanced

    let config = _config.set('advanced', advanced)
    if (advanced) {
      const variant = getMenuNavigationVariant('nav', menuStyle)
      const paper = getPaperFromTheme(appTheme)
      config = config.set('variant', variant).set('paper', paper)
    } else {
      config = config.without('variant').without('paper')
    }

    onSettingChange({ id, config })
  }

  const onTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const menuType = evt.target.value as MenuType
    const type = menuType === MenuType.Icon ? 'drawer' : 'nav'

    const anchor = menuType === MenuType.Icon ? 'left' : ('' as AnchorDirection)
    const vertical = menuType !== MenuType.Horizontal
    const submenuMode = !vertical ? 'dropdown' : 'foldable'
    const icon = menuType === MenuType.Icon ? Immutable(defaultIcon) : null
    const standard: Partial<MenuNavigationStandard> = {
      icon,
      anchor,
      submenuMode,
      textAlign: TextAlignValue.CENTER,
      gap: '0px'
    }

    const config = _config
      .set('type', type)
      .set('menuStyle', 'default')
      .set('standard', standard)
      .set('advanced', false)
      .without('variant')
      .without('paper')
      .set('vertical', vertical)

    onSettingChange({ id, config })

    changeAutoSizeAndDefaultSize(menuType)
  }

  const onNavTypeRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value
  ) => {
    const checked = e.currentTarget.checked
    if (!checked) {
      return
    }
    let config = _config
      .set('menuStyle', value)
      .set('advanced', false)
      .set('variant', null)

    onSettingChange({ id, config })
  }

  const handleVariantItemChange = (
    state: ComponentState,
    key: string,
    value: any
  ) => {
    onSettingConfigChange(['variant', 'item', state, key], value)
  }

  return (
    <div css={style} className='widget-setting-menu jimu-widget-setting'>
      <SettingSection>
        <SettingRow label={translate('type')}>
          <Select
            aria-label={translate('type')}
            size='sm'
            value={menuType}
            onChange={onTypeChange}
            style={{ width: '50%' }}
          >
            <option value={MenuType.Icon}>{translate('icon')}</option>
            <option value={MenuType.Vertical}>{translate('vertical')}</option>
            <option value={MenuType.Horizontal}>
              {translate('horizontal')}
            </option>
          </Select>
        </SettingRow>

        {type === 'drawer' && (
          <SettingRow label={translate('location')} flow='no-wrap'>
            <Select
              aria-label={translate('location')}
              size='sm'
              style={{ width: '50%' }}
              value={anchor}
              onChange={evt => { onSettingConfigChange(['standard', 'anchor'], evt.target.value) }
              }
            >
              <option value='left'>{translate('left')}</option>
              <option value='right'>{translate('right')}</option>
            </Select>
          </SettingRow>
        )}

        {vertical && (
          <SettingRow label={translate('subMenuExpandMode')} flow='wrap'>
            <Select
              aria-label={translate('subMenuExpandMode')}
              size='sm'
              value={submenuMode}
              onChange={evt => {
                onSettingConfigChange(
                  ['standard', 'submenuMode'],
                  evt.target.value
                )
              }
              }
            >
              <option value='foldable'>{translate('foldable')}</option>
              <option value='static'>{translate('expand')}</option>
            </Select>
          </SettingRow>
        )}

        {type === 'drawer' && (
          <React.Fragment>
            <SettingRow label={translate('icon')} flow='no-wrap' role="group" aria-label={translate('icon')}>
              <IconPicker
                hideRemove
                icon={icon as IconResult}
                customIcons={[defaultIcon]}
                customLabel={iconCustomLabel}
                previewOptions={{ color: true, size: false }}
                onChange={icon => { onSettingConfigChange(['standard', 'icon'], icon) }
                }
                setButtonUseColor={false}
              />
            </SettingRow>
            <SettingRow label={translate('iconSize')} flow='no-wrap'>
              <InputUnit
                aria-label={translate('iconSize')}
                size='sm'
                className="w-50"
                value={`${icon?.properties?.size ?? 0}px`}
                onChange={(value: LinearUnit) => {
                  onSettingConfigChange(
                    ['standard', 'icon', 'properties', 'size'],
                    value.distance
                  )
                }
                }
              />
            </SettingRow>
          </React.Fragment>
        )}
      </SettingSection>

      <SettingSection title={translate('appearance')} role="group" aria-label={translate('appearance')}>
        <SettingRow label={translate('style')} flow='wrap' role="radiogroup" aria-label={translate('style')}>
          {generateNavTypes().map((item, index) => (
            <div className='radio-container' key={index}>
              <Radio
                id={'nav-style-type' + index}
                style={{ cursor: 'pointer' }}
                name='style-type'
                onChange={e => { onNavTypeRadioChange(e, item.value) }}
                checked={menuStyle === item.value}
              />
              <Label
                style={{ cursor: 'pointer' }}
                for={'nav-style-type' + index}
                className='ml-2 text-break'
              >
                {item.label}
              </Label>
            </div>
          ))}
        </SettingRow>

        <SettingRow label={translate('space')} flow='no-wrap'>
          <InputUnit
            aria-label={translate('space')}
            size='sm'
            className='w-50'
            value={gap}
            onChange={value => {
              onSettingConfigChange(
                ['standard', 'gap'],
                `${value.distance}${value.unit}`
              )
            }
            }
          />
        </SettingRow>

        <SettingRow flow='no-wrap' label={translate('alignment')}>
          <TextAlignment
            aria-label={translate('alignment')}
            textAlign={textAlign}
            onChange={value => { onSettingConfigChange(['standard', 'textAlign'], value) }
            }
          />
        </SettingRow>

        <SettingRow flow='no-wrap' label={translate('showIcon')}>
          <Switch
            aria-label={translate('showIcon')}
            checked={showIcon}
            onChange={(_, value) => { onSettingConfigChange(['standard', 'showIcon'], value) }
            }
          />
        </SettingRow>
      </SettingSection>

      <SettingSection>
        <SettingRow flow='no-wrap' label={translate('advance')}>
          <Switch checked={advanced} onChange={onAdvancedChange} aria-label={translate('advance')} />
        </SettingRow>
        {advanced && (
          <React.Fragment>
            {type !== 'drawer' && (
              <SettingRow label={translate('background')} flow='no-wrap'>
                <ThemeColorPicker
                  aria-label={translate('background')}
                  specificTheme={appTheme}
                  value={variant?.root?.bg}
                  onChange={value => { onSettingConfigChange(['variant', 'root', 'bg'], value) }
                  }
                />
              </SettingRow>
            )}

            {type === 'drawer' && (
              <SettingRow label={translate('background')} flow='no-wrap'>
                <ThemeColorPicker
                  aria-label={translate('background')}
                  specificTheme={appTheme}
                  value={paper?.bg}
                  onChange={value => { onSettingConfigChange(['paper', 'bg'], value) }
                  }
                />
              </SettingRow>
            )}

            <NavStyleSettingByState
              variant={variant}
              onlyBorderColor={menuStyle === 'underline'}
              text
              icon={false}
              iconInText={showIcon}
              onChange={handleVariantItemChange}
            />
          </React.Fragment>
        )}
      </SettingSection>
    </div>
  )
}

export default Setting
