/** @jsx jsx */
import { React, jsx, css, hooks, dataSourceUtils, useIntl, dateUtils, type EsriDateFormats } from 'jimu-core'
import { Alert, CollapsablePanel, DataActionList, DataActionListStyle, Link, defaultMessages as jimuiDefaultMessages } from 'jimu-ui'
import { List, TreeItemActionType, TreeStyle } from 'jimu-ui/basic/list-tree'
import { type ToolConfig, type HistoryItemWithDs, type CustomToolConfig } from '../../config'
import defaultMessages from '../translations/default'
import { type AnalysisToolData } from 'analysis-ui-schema'
import { depthTraversalProcessingValue, getCustomToolParamDisplayName, getEnumerableObjectFromAccessor, resultValueIsFeatureSet } from '../../utils/util'
import { canDisplayAsLink, urlIsMapServiceLayerOutput } from '../utils'
import { useWebToolsUnits } from '../../utils/strings'

interface Props {
  history: HistoryItemWithDs
  toolInfo: ToolConfig
  widgetId: string
}

interface OutputConfig {
  decimalPlace?: number
  allowExport?: boolean
  dateFormat?: string
  timeFormat?: string
}

const listStyle = css`
  color: var(--dark-800);
  &.jimu-tree {
    overflow-x: hidden;
  }
  .jimu-tree-item__body {
    width: 100%;
    padding: 0.1875rem 0.75rem;
    .content {
      flex: 1;
      word-break: break-all;
      user-select: text;
      max-width: 100%;
      .name {
        font-weight: 500;
      }
    }
  }
  .jimu-tree-item_template .jimu-tree-item__body:focus {
    outline: auto;
  }
  .value-table {
    td {
      white-space: nowrap;
      .td-content {
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
      }
    }
  }
  .table-container {
    overflow-x: auto;
  }
  .has-indent {
    padding-left: 0.75rem;
  }
  .ds-label {
    flex: 1;
  }
`
const innerListStyle = css`
  &.jimu-tree_template-basic .jimu-tree-item__body.jimu-tree-item_selectable_true {
    border: none;
    padding: 0.1875rem 0;
  }
`

const { useEffect } = React

const HistoryResultForCustomTool = (props: Props) => {
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)
  const { history, toolInfo, widgetId } = props
  const { results, dsMap, dsCreateError } = history
  const config = toolInfo.config as CustomToolConfig
  const { output } = config

  const intl = useIntl()

  const webToolsUnits = useWebToolsUnits()

  const getResultItem = (value: __esri.ParameterValue['value'], type: __esri.ParameterValue['dataType'], output: OutputConfig) => {
    const { decimalPlace, dateFormat, timeFormat } = output
    // for long and double
    if (typeof value === 'number' && decimalPlace !== undefined) {
      return decimalPlace !== undefined ? value.toFixed(decimalPlace) : value
    }
    if (typeof value === 'boolean') {
      return translate(value ? 'trueKey' : 'falseKey')
    }
    // for linear unit
    if (typeof value === 'object' && (value as __esri.LinearUnit).distance) {
      const units = (value as __esri.LinearUnit).units
      return `${(value as __esri.LinearUnit).distance} ${webToolsUnits[units] || units}`
    }
    // for raster data
    if (typeof value === 'object' && (value as __esri.RasterData).url && (value as __esri.RasterData).format) {
      return (value as __esri.RasterData).url
    }
    // for data file
    if (typeof value === 'object' && (value as __esri.DataFile).url) {
      return (value as __esri.DataFile).url
    }
    // for field
    if (typeof value === 'object' && (value as __esri.Field).name) {
      return (value as __esri.Field).name
    }
    // for date
    if ((value as any) instanceof Date || (type === 'date' && (typeof value === 'string' || typeof value === 'number'))) {
      const date = typeof value === 'string' ? new Date(value) : value as Date
      const esriDateFormat = `${dateFormat || 'shortDate'}${timeFormat || ''}` as EsriDateFormats
      return dateUtils.formatDateField(date, esriDateFormat, intl)
    }
    // for other cases
    if (typeof value === 'object' && value !== null) {
      return value as __esri.DataFile | __esri.FeatureSet | Array<__esri.DataFile | __esri.FeatureSet>
    }
    return value as string
  }

  const updateDsDisableExport = (id: string, paramName: string) => {
    const ds = dsMap?.get(id)
    if (ds) {
      const allowExport = output.allowExport[paramName]
      const disableExport = allowExport === undefined ? false : !allowExport
      const dsJson = ds.getDataSourceJson()
      if (dsJson.disableExport !== disableExport) {
        const newDsJson = dsJson.setIn(['disableExport'], disableExport)

        ds.setDataSourceJson(newDsJson)
      }
    }
  }

  useEffect(() => {
    results.forEach((result, index) => {
      depthTraversalProcessingValue(result.value, `${index}`, (id: string) => {
        updateDsDisableExport(id, result.paramName)
      })
    })
  }, [config?.output])

  const resultIsIgnored = (result: __esri.ParameterValue) => {
    return output.ignored[result.paramName]
  }

  // use analysis-json-table to display json
  const getDisplayResult = (id: string, value: __esri.ParameterValue['value'], type: __esri.ParameterValue['dataType'], outputOfCurrentResultItem: OutputConfig) => {
    const displayLink = canDisplayAsLink(value)
    // if has dataSource, show dataSource label
    const ds = dsMap?.get(id)
    if (ds) {
      const label = ds.getDataSourceJson().label || ds.getDataSourceJson().sourceLabel
      const resultUrl = (value as __esri.DataFile)?.url
      const serviceUrl = dataSourceUtils.getFullArcGISServiceUrl(resultUrl, false)

      const isMapServiceOutput = urlIsMapServiceLayerOutput(resultUrl)

      return <div className='d-flex align-items-center'>
        <span className='ds-label'>{displayLink
          ? <Link to={isMapServiceOutput ? resultUrl : serviceUrl || resultUrl} type='link' target='_blank' style={{ padding: 0, textAlign: 'left' }}>{label}</Link>
          : label}</span>
        <DataActionList hideGroupTitle widgetId={widgetId} dataSets={[{ dataSource: ds, records: [], name: label }]} listStyle={DataActionListStyle.Dropdown} buttonSize='sm' buttonType='tertiary' />
      </div>
    }
    // 1. if no datasource but has dsCreateError, it means the datasource is not created successfully, show error alert
    // 2. if no datasource and history is imported from map, it means the item is not accessible, show error alert
    const errorInfo = dsCreateError?.get(id)
    if (errorInfo || history.isImportedFromMap) {
      const label = errorInfo ? errorInfo.layerName : dataSourceUtils.getLabelFromArcGISServiceUrl((value as any)?.url || '')
      return <React.Fragment>
        <Alert className='flex-shrink-0' css={css`padding-left: 0 !important; padding-right: 0 !important;`} buttonType='tertiary' form='tooltip' size='small' type='error' text={translate(errorInfo?.reasonForFailure || 'dataSourceCreateError')} />
        {label}
      </React.Fragment>
    }

    // for "GPValueTable", only GPValueTable will pass value in Array format (two-dimensional array)
    // TODO returnColumnName is false as default, need to change this logic once component team support custom tool(maybe they can handle this in other ways)
    // https://developers.arcgis.com/rest/services-reference/enterprise/gp-data-types.htm
    // https://developers.arcgis.com/rest/services-reference/enterprise/gp-result.htm
    if (Array.isArray(value)) {
      return <div className='table-container'>
        <table className='value-table'><tbody>{value.map((v, index1) => {
          return <tr>{(v as unknown as any[]).map((item, index2) => {
            const currentId = `${id}-${index1}-${index2}`
            return <td>
              <div className='td-content'>
                {getDisplayResult(currentId, item, type, outputOfCurrentResultItem)}
              </div>
            </td>
          })}</tr>
        })}</tbody></table>
      </div>
    }

    // no dataSource and dataSourceJson, display value directly
    const displayValue = getResultItem(value, type, outputOfCurrentResultItem)
    const displayJsonTable = typeof displayValue === 'object' && displayValue !== null

    const setJsonTableRef = (ref: HTMLAnalysisJsonTableElement) => {
      if (ref) {
        ref.json = getEnumerableObjectFromAccessor(displayValue as __esri.DataFile | __esri.FeatureSet) as AnalysisToolData
      }
    }

    const spliter = displayLink ? (displayValue as string).includes('/') ? '/' : '\\' : ''
    const linkLabel = displayLink ? (displayValue as string).split(spliter).pop() : ''

    return <React.Fragment>
      {displayJsonTable
        ? <analysis-json-table ref={setJsonTableRef}></analysis-json-table>
        : displayLink
          ? <Link to={displayValue as string} type='link' target='_blank' style={{ padding: 0, textAlign: 'left' }}>{linkLabel}</Link>
          : displayValue as string | number}
      </React.Fragment>
  }

  return (
    <CollapsablePanel label={translate('result')} aria-label={translate('result')} type="default" defaultIsOpen>
      <List
        css={listStyle}
        itemsJson={results.map((result, index) => ({
          itemKey: `${index}`,
          itemStateDetailContent: { result, id: `${index}` }
        }))}
        treeStyle={TreeStyle.Card}
        overrideItemBlockInfo={({ itemBlockInfo }) => {
          return {
            name: TreeItemActionType.RenderOverrideItem,
            children: [{
              name: TreeItemActionType.RenderOverrideItemBody,
              children: [{
                name: TreeItemActionType.RenderOverrideItemContent
              }, {
                name: TreeItemActionType.RenderOverrideItemCommands
              }]
            }]
          }
        }}
        renderOverrideItemContent={(actionData, refComponent) => {
          const { itemJsons } = refComponent.props
          const currentItemJson = itemJsons[0]
          const id = currentItemJson.itemStateDetailContent.id as string
          const result = currentItemJson.itemStateDetailContent.result as __esri.ParameterValue
          const isIgnored = resultIsIgnored(result)
          if (isIgnored) {
            return null
          }
          const { value, dataType, paramName } = result
          // if no dataSource and no dataSourceJson, show result directly, and not imported from map
          const keys = ['decimalPlace', 'allowExport', 'dateFormat', 'timeFormat']
          const outputOfCurrentResultItem = keys.reduce((acc, key) => {
            acc[key] = output[key]?.[result.paramName]
            return acc
          }, {})
          const isValueTable = Array.isArray(value) && value.every((v) => Array.isArray(v))

          const isFeatureSet = resultValueIsFeatureSet(value)
          const showTitle = !isFeatureSet && paramName
          return <div className='content'>
            {showTitle && <div className='name mb-2'>{getCustomToolParamDisplayName(config.toolInfo, paramName)}</div>}
            <div className={showTitle ? 'has-indent' : ''}>
              {Array.isArray(value) && !isValueTable
                ? <List
                    css={innerListStyle}
                    itemsJson={value.map((v, i) => ({
                      itemKey: `${id}-${i}`,
                      itemStateDetailContent: { value: v, id: `${id}-${i}` }
                    }))}
                    treeStyle={TreeStyle.Basic}
                    overrideItemBlockInfo={({ itemBlockInfo }) => {
                      return {
                        name: TreeItemActionType.RenderOverrideItem,
                        children: [{
                          name: TreeItemActionType.RenderOverrideItemBody,
                          children: [{
                            name: TreeItemActionType.RenderOverrideItemContent
                          }, {
                            name: TreeItemActionType.RenderOverrideItemCommands
                          }]
                        }]
                      }
                    }}
                    renderOverrideItemContent={(actionData, refComponent) => {
                      const { itemJsons } = refComponent.props
                      const currentItemJson = itemJsons[0]
                      const id = currentItemJson.itemStateDetailContent.id as string
                      const value = currentItemJson.itemStateDetailContent.value as __esri.ParameterValue['value']
                      return <div className='content'>
                        {getDisplayResult(id, value, dataType, outputOfCurrentResultItem)}
                      </div>
                    }}
                  />
                : getDisplayResult(id, value, dataType, outputOfCurrentResultItem)}
            </div>
          </div>
        }}
      />
    </CollapsablePanel>
  )
}

export default HistoryResultForCustomTool
