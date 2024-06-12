/** @jsx jsx */
import {
  React, jsx, classNames, type DataSource, type IMSqlExpression, type ClauseLogic,
  type IMThemeVariables, type IntlShape, defaultMessages as jimuCoreMessages,
  appConfigUtils, type IMUseDataSource, getAppStore, lodash, dataSourceUtils
} from 'jimu-core'
import { type filterItemConfig, FilterArrangeType, FilterTriggerType } from '../config'
import { Switch, Icon, Button, Popper, Card, defaultMessages as jimuUIMessages, Alert, FOCUSABLE_CONTAINER_CLASS } from 'jimu-ui'
import { SqlExpressionRuntime, getShownClauseNumberByExpression, getTotalClauseNumberByExpression } from 'jimu-ui/basic/sql-expression-runtime'
import { getStyles } from './style'
import { DownFilled } from 'jimu-icons/filled/directional/down'

const allDefaultMessages = Object.assign({}, jimuCoreMessages, jimuUIMessages)

interface Props {
  id: number
  widgetId: string
  arrangeType: FilterArrangeType
  triggerType: FilterTriggerType
  wrap: boolean
  omitInternalStyle: boolean
  filterNum: number
  config: filterItemConfig
  useDataSource: IMUseDataSource
  selectedDs: DataSource
  isNotReadyFromWidget?: boolean // Only for output ds
  logicalOperator: ClauseLogic
  onChange: (id: number, dataSource: DataSource, sqlExprObj: IMSqlExpression, applied: boolean) => void
  itemBgColor: string
  theme?: IMThemeVariables
  intl: IntlShape
}

interface State {
  isOpen: boolean
  applied: boolean
  collapsed: boolean
  sqlExprObj: IMSqlExpression
  sqlChanged: boolean // for applyBtn's state in button & !omit,
  outputWidgetLabel: string
  popperVersion: number
}

const modifiers = [
  {
    name: 'preventOverflow',
    options: {
      altAxis: true
    }
  }
]

export default class FilterItem extends React.PureComponent<Props, State> {
  pillButton: any
  endUserClausesNum: number
  clausesNumConfigured: number

  constructor (props) {
    super(props)
    const { collapseFilterExprs } = this.props.config
    const sqlExprObj = this.getSqlExprObjFromItem()
    this.endUserClausesNum = getShownClauseNumberByExpression(sqlExprObj)
    this.clausesNumConfigured = getTotalClauseNumberByExpression(sqlExprObj)
    this.state = {
      isOpen: false,
      applied: this.getAppliedState(),
      collapsed: collapseFilterExprs,
      sqlExprObj: sqlExprObj,
      sqlChanged: false,
      outputWidgetLabel: this.getOutPutWidgetLabel(),
      popperVersion: 1
    }
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    const { config, logicalOperator, omitInternalStyle, useDataSource, selectedDs } = this.props
    const sqlExprObj = this.getSqlExprObjFromItem()
    this.endUserClausesNum = getShownClauseNumberByExpression(sqlExprObj)
    this.clausesNumConfigured = getTotalClauseNumberByExpression(sqlExprObj)

    if (prevProps.config !== config || prevProps.selectedDs !== selectedDs) {
      this.setState({
        applied: this.getAppliedState(),
        collapsed: prevProps.config.collapseFilterExprs !== config.collapseFilterExprs ? config.collapseFilterExprs : this.state.collapsed,
        sqlExprObj: selectedDs ? sqlExprObj : null,
        outputWidgetLabel: useDataSource.dataSourceId === prevProps.useDataSource.dataSourceId ? this.state.outputWidgetLabel : this.getOutPutWidgetLabel()
      })
    } else if (prevProps.logicalOperator !== logicalOperator || prevProps.omitInternalStyle !== omitInternalStyle) { // update applied btn
      this.setState({
        applied: this.getAppliedState()
      })
    }
  }

  getSqlExprObjFromItem = () => {
    const { selectedDs, config } = this.props
    let sqlExpr = config.sqlExprObj
    if (config.isGroup) {
      sqlExpr = dataSourceUtils.getDisplayedSQLExpressionFromGroupSQLExpression(config.sqlExprObjForGroup, selectedDs, this.formatMessage)
    }
    return sqlExpr
  }

  formatMessage = (id, values?: any) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: allDefaultMessages[id] }, values)
  }

  getOutPutWidgetLabel = () => {
    const widgets = getAppStore().getState().appConfig.widgets
    const wId = appConfigUtils.getWidgetIdByOutputDataSource(this.props.useDataSource)
    return widgets[wId]?.label
  }

  getAppliedState = () => {
    let applied = this.props.config.autoApplyWhenWidgetOpen
    if (this.props.omitInternalStyle && this.endUserClausesNum === 1 && this.clausesNumConfigured === 1) {
      applied = true
    }
    return applied
  }

  oncollapsedChange = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  onApplyChange = (checked) => {
    this.setState({ sqlChanged: false })
    this.props.onChange(this.props.id, this.props.selectedDs, this.state.sqlExprObj, checked)
  }

  onToggleChange = (checked) => {
    this.setState({ applied: checked })
    this.onApplyChange(checked)
  }

  onPillClick = (hasPopper, pillTarget) => {
    if (hasPopper) {
      this.setState({
        popperVersion: !this.state.isOpen ? this.state.popperVersion + 1 : this.state.popperVersion
      })
      this.onTogglePopper()
    } else {
      const willActive = pillTarget.className.indexOf('active') < 0
      this.onToggleChange(!!willActive)
    }
  }

  onSqlExpressionChange = (sqlExprObj: IMSqlExpression) => {
    const { omitInternalStyle, id, selectedDs, triggerType, onChange } = this.props
    const isSqlChanged = this.getSqlExprObjFromItem().sql !== sqlExprObj?.sql
    this.setState({
      sqlExprObj: sqlExprObj,
      sqlChanged: !!(triggerType === FilterTriggerType.Button && !omitInternalStyle && isSqlChanged)
    })
    if (triggerType === FilterTriggerType.Toggle || omitInternalStyle) {
      onChange(id, selectedDs, sqlExprObj, this.state.applied)
    }
  }

  onTogglePopper = () => {
    if (this.state.isOpen) {
      lodash.defer(() => {
        this.pillButton.focus()
      })
    }
    this.setState({ isOpen: !this.state.isOpen })
  }

  getFilterItem = (hasEndUserClauses: boolean, isTitleHidden = false) => {
    const { icon, name } = this.props.config
    return (
      <div className='h-100'>
        <div className={classNames('d-flex justify-content-between w-100 pr-2 align-items-center', FOCUSABLE_CONTAINER_CLASS, isTitleHidden ? 'flex-row-reverse' : '')}>
          {
            !isTitleHidden && hasEndUserClauses && <Button size='sm' icon type='tertiary' onClick={this.oncollapsedChange} className='jimu-outline-inside'>
              <DownFilled className={this.state.collapsed ? 'filter-item-arrow' : ''} size='s' />
            </Button>
          }
          {
            !isTitleHidden && icon && <div className={classNames('filter-item-icon', hasEndUserClauses ? '' : 'no-arrow')}>
              <Icon icon={icon.svg} size={icon.properties.size} />
            </div>
          }
          {
            !isTitleHidden && <div className={classNames('filter-item-name flex-grow-1', !hasEndUserClauses && !icon ? 'no-icons' : '')}>{name}

            </div>
          }
          {
            this.props.triggerType === FilterTriggerType.Toggle && <div className='ml-1 d-flex align-items-center'>
              {this.getToggle()}
            </div>
          }
        </div>
        {
          this.state.sqlExprObj && <div
            style={{ display: this.state.collapsed ? 'none' : 'block' }}
            className={classNames('w-100 pl-6 pr-6',
              this.state.collapsed ? '' : FOCUSABLE_CONTAINER_CLASS,
              this.props.arrangeType === FilterArrangeType.Inline && this.props.filterNum === 1 && this.props.omitInternalStyle ? 'sql-expression-inline' : '',
              this.props.arrangeType === FilterArrangeType.Inline && this.props.filterNum === 1 && this.props.wrap ? 'sql-expression-wrap' : '')}
          >
            {this.getSqlExpression()}
          </div>
        }
        {
          this.props.triggerType === FilterTriggerType.Button && <div className='d-flex justify-content-end pl-5 pr-5 pt-2 pb-2'>
            {this.getApplyButtons()}
          </div>
        }
      </div>
    )
  }

  isDataSourceError = () => {
    return this.props.selectedDs === null
  }

  isOutputFromWidget = () => {
    return this.props.selectedDs?.getDataSourceJson().isOutputFromWidget
  }

  isOutputDataSourceValid = () => {
    return this.isOutputFromWidget() && !this.props.isNotReadyFromWidget
  }

  isOutputDataSourceInvalid = () => {
    return this.isOutputFromWidget() && this.props.isNotReadyFromWidget
  }

  // valid: for display all clauses of current filter.
  isDataSourceValid = () => {
    return this.props.selectedDs && ((this.isOutputFromWidget() && !this.props.isNotReadyFromWidget) || !this.isOutputDataSourceInvalid())
  }

  // loading or invalid: for the enabled/disabled state of Swith and Button.
  isDataSourceLoadingOrInvalid = () => {
    return !this.isDataSourceValid()
  }

  getErrorIcon = () => {
    if (this.isDataSourceError()) {
      return (
        <Alert
          buttonType='tertiary'
          form='tooltip'
          size='small'
          type='error'
          text={this.formatMessage('dataSourceCreateError')}
        >
        </Alert>
      )
    } else if (this.isOutputDataSourceInvalid()) {
      const warningLabel = this.formatMessage('outputDataIsNotGenerated', { outputDsLabel: this.props.selectedDs.getLabel(), sourceWidgetName: this.state.outputWidgetLabel })
      return (
        <Alert
          buttonType='tertiary'
          form='tooltip'
          size='small'
          type='warning'
          text={warningLabel}
        >
        </Alert>
      )
    } else {
      return null
    }
  }

  getToggle = () => {
    // bind error icon with toggle
    // return <Switch checked={this.state.applied} disabled={!this.props.selectedDs} onChange={evt => this.onToggleChange(evt.target.checked)} />
    return (
      <React.Fragment>
        {this.getErrorIcon()}
        <Switch
          checked={this.state.applied}
          disabled={this.isDataSourceLoadingOrInvalid()}
          aria-label={this.props.config.name}
          onChange={evt => { this.onToggleChange(evt.target.checked) }}
        />
      </React.Fragment>
    )
  }

  getApplyButtons = () => {
    return (
      <div className='w-100 d-flex justify-content-end apply-cancel-group'>
        {this.getErrorIcon()}
        <Button
          type='primary' className='filter-apply-button wrap'
          disabled={this.isDataSourceLoadingOrInvalid() || !!(this.state.applied && !this.state.sqlChanged)}
          onClick={() => { this.onApplyChange(true) }}
        >
          {this.formatMessage('apply')}
        </Button>
        <Button
          type='default' className='filter-cancel-button ml-2'
          disabled={this.isDataSourceLoadingOrInvalid() || !this.state.applied}
          onClick={() => { this.onApplyChange(false) }}
          >
          {this.formatMessage('cancel')}
        </Button>
      </div>
    )
  }

  getTriggerNodeForClauses = (triggerType = this.props.triggerType) => {
    let Trigger = null
    switch (triggerType) {
      case FilterTriggerType.Toggle:
        Trigger = this.getToggle()
        break
      case FilterTriggerType.Button:
        Trigger = this.getApplyButtons()
        break

      default:
        break
    }
    return Trigger
  }

  getSqlExpression = () => {
    return this.isDataSourceValid()
      ? <SqlExpressionRuntime
        widgetId={this.props.widgetId}
        dataSource={this.props.selectedDs}
        expression={this.state.sqlExprObj}
        onChange={this.onSqlExpressionChange}
      />
      : null
  }

  /* toggle(TR) or button(BR): for wrap multiple clauses */
  getTirggerNodeForWrapClauses = (triggerType) => {
    return triggerType === this.props.triggerType && this.isSingleFilterAndMultipleClauses() && this.props.wrap && <div className='d-flex flex-row-reverse'>
      {this.getTriggerNodeForClauses(triggerType)}
    </div>
  }

  /* toggle or button (Right) for no-wrap multiple clauses */
  getTriggerNodeForNoWrapClause = () => {
    return this.isSingleFilterAndMultipleClauses() && !this.props.wrap && <div className='ml-4'>
      {this.getTriggerNodeForClauses()}
    </div>
  }

  // 1 filter, multiple clause configured, and visible clauses exists
  isSingleFilterAndMultipleClauses () {
    return this.props.filterNum === 1 && this.clausesNumConfigured > 1 && this.endUserClausesNum >= 1
  }

  // 1 filter, 1 clause configured, and it's visible for endUser.
  isSingleFilterAndSingleShownClause () {
    return this.props.filterNum === 1 && this.clausesNumConfigured === 1 && this.endUserClausesNum === 1
  }

  // multiple filters, current filter has only 1 sinlge clause & it's visible for endUser.
  isMultipleFiltersAndSingleShownClause () {
    return this.props.filterNum > 1 && this.clausesNumConfigured === 1 && this.endUserClausesNum === 1
  }

  // Render block ( & popup-block), or inline.
  render () {
    const { config, arrangeType, triggerType, omitInternalStyle, wrap, theme } = this.props
    const { name, icon } = config
    return (
      <div className='filter-item' role='group' aria-label={name}>
        <Card className='filter-item-inline'>
          {
            arrangeType === FilterArrangeType.Block
              ? <div className='w-100'>
                {
                  omitInternalStyle &&
                  (this.isSingleFilterAndSingleShownClause() || this.isMultipleFiltersAndSingleShownClause())
                    ? <div className='w-100 pl-6 pr-6'>{this.getSqlExpression()}</div>
                    : <div className='filter-expanded-container'>{this.getFilterItem(this.endUserClausesNum >= 1)}</div>
                }
              </div>
              : <React.Fragment>
                {
                  // single filter, single clause, single shown
                  this.isSingleFilterAndSingleShownClause()
                    ? <div className='sql-expression-inline d-flex'>
                      {this.getSqlExpression()}
                      {
                        !omitInternalStyle && <div className='ml-4'>
                          {this.getTriggerNodeForClauses()}
                        </div>
                      }
                    </div>
                    : <React.Fragment>
                      {
                        (this.isSingleFilterAndMultipleClauses() ||
                          (this.isMultipleFiltersAndSingleShownClause() && omitInternalStyle))
                          ? <div className={classNames('sql-expression-inline d-flex', {
                            'sql-expression-wrap': wrap,
                            'filter-item-pill': this.isMultipleFiltersAndSingleShownClause()
                          })}
                          >
                            {this.getTirggerNodeForWrapClauses(FilterTriggerType.Toggle)}
                            {this.getSqlExpression()}
                            {this.getTirggerNodeForWrapClauses(FilterTriggerType.Button)}
                            {this.getTriggerNodeForNoWrapClause()}
                          </div>
                          : <div className='filter-popper-container'>
                            {
                              triggerType === FilterTriggerType.Toggle && this.endUserClausesNum === 0
                                ? <Card className='filter-item-pill filter-item-toggle-pill'>
                                  {icon && <Icon icon={icon.svg} size={icon.properties.size} className='mr-1' />}
                                  <div className='filter-item-name toggle-name'>{name}</div>
                                  {this.getToggle()}
                                </Card>
                                : <div className="filter-item-pill h-100 nowrap">
                                  <Button
                                    className={classNames('', { 'frame-active': this.state.applied })} title={name}
                                    ref={ref => { this.pillButton = ref }}
                                    type='default'
                                    aria-pressed={this.state.applied}
                                    onClick={evt => { this.onPillClick(this.endUserClausesNum >= 1, this.pillButton) }}
                                  >
                                    {icon && <Icon icon={icon.svg} size={icon.properties.size} />}
                                    {name}
                                  </Button>
                                </div>
                            }
                            {
                              this.endUserClausesNum >= 1 && <Popper
                                open={this.state.isOpen}
                                toggle={this.onTogglePopper}
                                modifiers={modifiers}
                                showArrow
                                reference={this.pillButton}
                                version={this.state.popperVersion}
                                autoFocus={this.state.popperVersion > 1}
                                forceLatestFocusElements={triggerType === FilterTriggerType.Button} // cancel button could be enabled or disabled
                              >
                                <div className='filter-items-container' css={getStyles(theme)}>
                                  <div className='filter-item filter-item-popper overflow-auto' style={{ maxHeight: 'calc(100vh - 20px)' }}>
                                    <Card className='filter-item-inline'>
                                      {this.getFilterItem(this.endUserClausesNum >= 1, arrangeType !== FilterArrangeType.Popper)}
                                    </Card>
                                  </div>
                                </div>
                              </Popper>
                            }
                          </div>
                      }
                    </React.Fragment>
                }
              </React.Fragment>
          }
        </Card>
      </div>
    )
  }
}
