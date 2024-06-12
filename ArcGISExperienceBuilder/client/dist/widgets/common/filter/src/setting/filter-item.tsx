/** @jsx jsx */
import {
  React, jsx, type IMThemeVariables, Immutable, type IntlShape, DataSourceManager, type IMSqlExpression,
  type IMIconResult, defaultMessages as defaultMsgsCore, type UseDataSource, type DataSource, AllDataSourceTypes, type IconResult, type IMGroupSqlExpression, dataSourceUtils
} from 'jimu-core'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { TextInput, TextArea, Button, Switch, Tooltip } from 'jimu-ui'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { SqlExpressionBuilderPopup, GroupSqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder'
import { type filterItemConfig } from '../config'
import { getStyleForFI } from './style'
import { IconPicker } from 'jimu-ui/advanced/resource-selector'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'

interface FilterItemProps extends filterItemConfig {
  intl: IntlShape
  theme: IMThemeVariables
  customIcons: IconResult[]
  dataSources: { [dsId: string]: DataSource }
  optionChange: (prop: string, value: string | boolean | IMIconResult) => void
  dataSourceChange: (useDataSources: UseDataSource[]) => void
  onSqlExprBuilderChange: (sqlExprObj: IMSqlExpression) => void
  onGroupSqlExprBuilderChange: (sqlExprObj: IMGroupSqlExpression) => void
  i18nMessage: (id: string, values?: any) => string
}

interface State {
  isSqlExprShow: boolean
  itemLabel: string
}

export default class FilterItem extends React.PureComponent<FilterItemProps, State> {
  dsManager: DataSourceManager = window && window.jimuConfig && window.jimuConfig.isBuilder
    ? DataSourceManager.getInstance()
    : DataSourceManager.getInstance()

  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

  constructor (props) {
    super(props)

    this.state = {
      isSqlExprShow: false,
      itemLabel: this.props.name || ''
    }
  }

  componentDidUpdate (preProps: FilterItemProps, preState: State) {
    if (this.props.name !== preProps.name) {
      this.setState({ itemLabel: this.props.name || '' })
    }
  }

  showSqlExprPopup = () => {
    this.setState({ isSqlExprShow: true })
  }

  toggleSqlExprPopup = () => {
    this.setState({ isSqlExprShow: !this.state.isSqlExprShow })
  }

  nameChange = (event) => {
    const value = event.target.value
    this.setState({ itemLabel: value })
  }

  nameAccept = (value) => {
    value = value?.trim()
    value = value === '' ? this.props.name : value
    if (value !== this.state.itemLabel) {
      this.setState({ itemLabel: value })
    }
    this.props.optionChange('name', value)
  }

  autoApplyChange = () => {
    this.props.optionChange('autoApplyWhenWidgetOpen', !this.props.autoApplyWhenWidgetOpen)
  }

  collapseChange = () => {
    this.props.optionChange('collapseFilterExprs', !this.props.collapseFilterExprs)
  }

  getSelectedDss = (): DataSource[] => {
    const dss = []
    this.props.useDataSources?.forEach(useDs => {
      this.props.dataSources[useDs.dataSourceId] && dss.push(this.props.dataSources[useDs.dataSourceId])
    })
    return dss
  }

  getMainDsLabelTips = (mainDs: DataSource) => {
    const { sqlExprObjForGroup, i18nMessage } = this.props
    if (!sqlExprObjForGroup || !mainDs) {
      return null
    }
    let dsLabels = [
      mainDs.getLabel(),
      i18nMessage('default')
    ]
    if (mainDs.isDataView) {
      const viewLabel = mainDs.dataViewId === 'selection' ? i18nMessage('selectionDataView') : mainDs.getLabel()
      dsLabels = [
        mainDs.getMainDataSource().getLabel(),
        viewLabel
      ]
    }
    const label = i18nMessage('mainValue', { value: dsLabels.join(' | ') })
    return <SettingRow label={label} truncateLabel flow='wrap' className='font-italic' />
  }

  render () {
    const { useDataSources, isGroup, sqlExprObj, sqlExprObjForGroup, i18nMessage } = this.props
    const selectedDss = this.getSelectedDss()
    // useDss is undefined for an new added item. dataSources might be less than useDss when they're not ready.
    const isDisabled = useDataSources === undefined || selectedDss.length !== useDataSources?.length

    return (
      <div className='w-100 h-100' css={getStyleForFI(this.props.theme)}>
        <div className='w-100 h-100 filter-item-panel'>
          <div className='setting-container'>
            <SettingSection className="pt-0"
              title={
                <div className='d-flex justify-content-between'>
                  <div>{i18nMessage('data')}</div>
                  {
                    isGroup && <Tooltip showArrow={true} placement='bottom' title={i18nMessage('dsRemoveTips')}>
                      <Button icon type='tertiary' size='sm' className='ml-2 p-0'>
                        <InfoOutlined />
                      </Button>
                    </Tooltip>
                  }
                </div>
              }
            >
              <SettingRow>
                <DataSourceSelector
                  types={this.supportedDsTypes}
                  useDataSources={useDataSources?.length > 0 && selectedDss[0] ? Immutable(useDataSources.map(ds => ds.asMutable({ deep: true }))) : Immutable([])}
                  mustUseDataSource
                  onChange={this.props.dataSourceChange}
                  closeDataSourceListOnChange={!isGroup}
                  isMultiple={isGroup}
                  hideTabs={isGroup ? Immutable(['OUTPUT']) : null} // hide output tab for group item.
                  disableRemove={() => (isGroup ? useDataSources?.length === 1 || false : true)}
                />
              </SettingRow>
            </SettingSection>

            <SettingSection title={i18nMessage('label')}>
              <SettingRow>
                <TextInput
                  size='sm'
                  type='text' className='w-100'
                  value={this.state.itemLabel}
                  onChange={this.nameChange}
                  onAcceptValue={this.nameAccept}
                  aria-label={i18nMessage('label')}
                />
              </SettingRow>
            </SettingSection>

            <SettingSection>
              <SettingRow
                role='group'
                label={this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMsgsCore.icon })}
                aria-label={this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMsgsCore.icon })}
              >
                <IconPicker
                  icon={this.props.icon ? (this.props.icon as any) : null}
                  customIcons={this.props.customIcons}
                  onChange={(icon) => { this.props.optionChange('icon', icon) }} configurableOption='none'
                  setButtonUseColor={false}
                />
              </SettingRow>
            </SettingSection>

            <SettingSection title={i18nMessage('sqlExpr')} role='group' aria-label={i18nMessage('sqlExpr')}>
              <SettingRow label={i18nMessage(isGroup ? 'addSqlExprForGroup' : 'addSqlExprForFilter')} flow='wrap' />
              <div id='sql-expr-desc' className='sr-only'>{i18nMessage(isGroup ? 'addSqlExprForGroup' : 'addSqlExprForFilter')}</div>
              <SettingRow>
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <Button
                    className='w-100 text-dark set-link-btn'
                    type={isDisabled ? 'secondary' : 'primary'}
                    disabled={isDisabled}
                    onClick={this.showSqlExprPopup}
                    title={i18nMessage(isGroup ? 'sqlExpressionBuilderForGroup' : 'sqlExpressionBuilder')}
                    aria-describedby={'sql-expr-desc'}
                  >
                    <div className='w-100 px-2 text-truncate'>
                      {i18nMessage(isGroup ? 'sqlExpressionBuilderForGroup' : 'sqlExpressionBuilder')}
                    </div>
                  </Button>
                </div>
              </SettingRow>
              {
                isGroup
                  ? this.getMainDsLabelTips(selectedDss?.[0])
                  : <SettingRow>
                    <TextArea
                      height={80} className='w-100' spellCheck={false} placeholder={i18nMessage('addSqlExprFirst')}
                      value={dataSourceUtils.getArcGISSQL(sqlExprObj, selectedDss[0]).displaySQL}
                      onClick={e => { e.currentTarget.select() }} readOnly
                    />
                  </SettingRow>
              }
            </SettingSection>

            <SettingSection
              role='grpup'
              className='border-0'
              title={i18nMessage('options')}
              aria-label={i18nMessage('options')}
            >
              <SettingRow label={i18nMessage('autoApplyWhenWidgetOpen')}>
                <Switch
                  checked={!!this.props.autoApplyWhenWidgetOpen}
                  onChange={this.autoApplyChange}
                  aria-label={i18nMessage('autoApplyWhenWidgetOpen')}
                />
              </SettingRow>
              <SettingRow label={i18nMessage('collapseFilterExprs')}>
                <Switch
                  checked={!!this.props.collapseFilterExprs}
                  onChange={this.collapseChange}
                  aria-label={i18nMessage('collapseFilterExprs')}
                />
              </SettingRow>
            </SettingSection>

            {!isDisabled && !isGroup &&
              <SqlExpressionBuilderPopup
                dataSource={selectedDss[0]}
                isOpen={this.state.isSqlExprShow}
                toggle={this.toggleSqlExprPopup}
                expression={sqlExprObj}
                onChange={this.props.onSqlExprBuilderChange}
              />
              }
            {!isDisabled && isGroup &&
              <GroupSqlExpressionBuilderPopup
                dataSources={selectedDss}
                isOpen={this.state.isSqlExprShow}
                toggle={this.toggleSqlExprPopup}
                expression={sqlExprObjForGroup}
                onChange={this.props.onGroupSqlExprBuilderChange}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}
