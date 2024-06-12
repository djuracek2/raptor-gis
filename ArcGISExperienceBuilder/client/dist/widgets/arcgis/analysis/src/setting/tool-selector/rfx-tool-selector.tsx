/** @jsx jsx */
import { React, jsx, hooks, type ImmutableArray } from 'jimu-core'
import { defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { type ToolConfig } from '../../config'
import { AnalysisEngine, type AnalysisToolItem, AnalysisType } from 'analysis-ui-schema'
import { type RFTDefinition, getRFxFunctionsAndCategories } from 'analysis-raster-function-utils'
import ToolSelectorUI from './tool-selector-ui'
import { canPerformRasterAnalysis } from 'analysis-shared-utils'

export interface Props {
  disabled?: boolean
  toolList: ImmutableArray<ToolConfig>
  portal: __esri.Portal
  onWarningNoMap: () => void
  onChange: (toolName: string) => void
}

const RFxToolSelector = (props: Props): React.ReactElement => {
  const { disabled, toolList, portal, onWarningNoMap, onChange } = props
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)

  const [toolsArray, setToolsArray] = React.useState<AnalysisToolItem[]>([])
  const [categories, setCategories] = React.useState<string[]>([])

  const [canPerformRaster, setCanPerformRaster] = React.useState(false)

  const getToolsAndCategories = async () => {
    try {
      const rasterEnabled = await canPerformRasterAnalysis(portal)
      setCanPerformRaster(rasterEnabled)
      if (rasterEnabled) {
        const { rfxFunctions, rfxCategories } = await getRFxFunctionsAndCategories()
        setCategories(rfxCategories)
        setToolsArray(rfxFunctions.map((rasterTool: RFTDefinition) => {
          return {
            analysisEngine: AnalysisEngine.Raster,
            categoryName: rasterTool.category,
            categoryTitle: rasterTool.categoryTitle,
            description: rasterTool.snippet,
            title: rasterTool.title,
            toolName: rasterTool.name,
            analysisType: AnalysisType.RasterFunction
          }
        }))
      }
    } catch (error) {
      console.log('Get raster functions and categories error', error)
    }
  }

  React.useEffect(() => {
    if (!portal) {
      return
    }
    getToolsAndCategories()
  }, [portal])

  return (
    <ToolSelectorUI
      disabled={disabled} buttonDisabled={!canPerformRaster}
      buttonDisabledWarningText={translate('noRasterPrivilegeTip')}
      buttonTitle={translate('addRasterTool')} sidePopperTitle={translate('selectTool')}
      toolsArray={toolsArray} categories={categories} toolList={toolList}
      icon={require('jimu-icons/svg/outlined/gis/raster-function.svg')}
      onSelectTool={onChange} onDisabledStateClick={onWarningNoMap} />
  )
}

export default RFxToolSelector
