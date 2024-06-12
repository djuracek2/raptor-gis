/** @jsx jsx */
import {
  React, jsx, hooks, Immutable, css
} from 'jimu-core'
import { ToolType, type CombinedHistoryParameter } from '../../config'
import { Button, CollapsablePanel, defaultMessages as jimuiDefaultMessages } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { getLocaleInfo, isTravelModeParameter, isEmptyDataItem, StraightLineParameterValue, formatNumberToLocale } from 'analysis-shared-utils'
import { type AnalysisToolData, type AnalysisParamModel, type AnalysisToolUITravelMode, type OutputName, AnalysisToolParamDataType, type AnalysisToolDataItem, type LayerUrlFilter, type FeatureCollection, type AnalysisToolContext, type AnalysisExtent, AnalysisEngine, type AnalysisRasterToolContext, AnalysisToolContextKeys, type AnalysisToolUI, AnalysisType, type RFxTemplate, type LocaleItem } from 'analysis-ui-schema'
import { WrapOffOutlined } from 'jimu-icons/outlined/editor/wrap-off'
import { WrapOnOutlined } from 'jimu-icons/outlined/editor/wrap-on'
import { getRFxTranslatedRFTParameters } from 'analysis-raster-function-utils'

interface Props {
  toolName?: string
  analysisType: AnalysisType
  analysisEngine?: AnalysisEngine
  jobParams?: AnalysisToolData
  toolUiParameters?: AnalysisToolData
  paramViewModel: AnalysisParamModel
  toolT9n: LocaleItem
  toolUIJson: AnalysisToolUI
  portal: __esri.Portal
  type: ToolType
}

const { useMemo, useEffect, useState } = React

const style = css`
  overflow-x: auto;
  .wrap-on {
    width: max-content;
    min-width: 100%;
  }
`

const HistoryParameters = (props: Props) => {
  const { toolName, analysisType, analysisEngine, jobParams, toolUiParameters, paramViewModel, toolT9n, toolUIJson, portal, type } = props

  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)

  const [userFolders, setUserFolders] = useState<__esri.PortalFolder[]>([])
  const [user, setUser] = useState<__esri.PortalUser>()
  useEffect(() => {
    if (!portal) {
      return
    }
    setUser(portal?.user)
    portal?.user?.fetchFolders().then(setUserFolders)
  }, [portal])

  const combinedParameters = useMemo(() => {
    // delete empty parameters
    const filteredToolUiParameters: AnalysisToolData = {}
    Object.keys(toolUiParameters || {}).forEach(key => {
      if (toolUiParameters[key] !== undefined) {
        filteredToolUiParameters[key] = toolUiParameters[key]
      }
    })
    return {
      ...jobParams,
      ...filteredToolUiParameters
    }
  }, [jobParams, toolUiParameters])
  const [parametersContainerNode, setParametersContainerNode] = useState<HTMLDivElement>()
  const [envSettingContainerNode, setEnvSettingContainerNode] = useState<HTMLDivElement>()
  const [parameterContent, setParameterContent] = useState<HTMLAnalysisJsonTableElement>(null)
  const [envSettingContent, setEnvSettingContent] = useState<HTMLAnalysisJsonTableElement>(null)

  const isParameterKey = (key: string): boolean => {
    return key !== 'context' && key !== 'extentCheck' && key !== 'actualOutputName'
  }
  const getCurrentT9nToolValue = (key: string): string => {
    let label = key
    const parameterLabel = paramViewModel?.[key]?.label
    if (toolT9n !== undefined && parameterLabel !== undefined) {
      // for standard tools
      label = toolT9n[parameterLabel.slice(1)] as string
    } else if (toolT9n && toolT9n[key]) {
      // for custom tools
      label = toolT9n[key] as string
    }
    return label
  }

  const getT9nForJobParamValue = (value: CombinedHistoryParameter, parameterInfo?: AnalysisParamModel[string]): string | { [key: string]: AnalysisToolDataItem } => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    let translatedValue: AnalysisToolData | string | undefined = value?.toString()
    if (typeof value === 'object' && value !== undefined && value !== null) {
      let resultObject: { [key: string]: AnalysisToolDataItem } = {}
      Object.keys(value).forEach((key) => {
        const matchingParameterInfo = (
          parameterInfo?.uiParameterInfoSubSet as AnalysisParamModel
        )?.[key]
        // TODO: simplify logic here later
        if (!isEmptyDataItem(matchingParameterInfo)) {
          const currentValue = (value as any)[key]

          const matchingLabel = matchingParameterInfo?.label
          const matchingChoiceListLabels = matchingParameterInfo?.choiceListLabels

          const unslicedToolT9nKey =
            !isEmptyDataItem(matchingParameterInfo?.label)
              ? matchingLabel
              : matchingChoiceListLabels?.[key]

          const toolT9nKey = unslicedToolT9nKey?.slice(1) ?? key

          const translatedKey = toolT9n?.[toolT9nKey]

          const currentValueOfChoiceListLabels = matchingChoiceListLabels?.[currentValue]

          const translatedNestedValue = toolT9n?.[
            currentValueOfChoiceListLabels?.slice(1) ?? currentValue
          ] ?? currentValue
          resultObject[(translatedKey ?? key) as string] = translatedNestedValue
        } else {
          resultObject = value as { [key: string]: AnalysisToolDataItem }
        }
      })
      translatedValue = { ...resultObject } as AnalysisToolData
    } else if (typeof value === 'string') {
      let choiceListLabel = parameterInfo?.choiceListLabels?.[value]
      if (choiceListLabel !== undefined && toolT9n !== undefined) {
        choiceListLabel = choiceListLabel.replace('$', '')
        translatedValue = toolT9n?.[choiceListLabel] as string
      }
    }
    return translatedValue ?? ''
  }
  const formatParameter = (key: string): CombinedHistoryParameter | CombinedHistoryParameter[] => {
    /**
     * output name needs extra logic as `serviceProperties.name` needs to be displayed
     * instead of just accessing the key from jobParams, eventually other keys will need
     * to be parsed similarly to outputName if we want to do special formatting or
     * data access.
     */
    let formattedParameter: CombinedHistoryParameter
    let value: CombinedHistoryParameter | CombinedHistoryParameter[]

    if (combinedParameters !== undefined) {
      const parameterInfo = paramViewModel?.[key]
      value = combinedParameters[key]

      if (!isEmptyDataItem(value) || key === 'saveResultIn' || value === '') {
        if (toolName !== undefined && isTravelModeParameter(key, toolName)) {
          if (value === StraightLineParameterValue) {
            formattedParameter = toolT9n?.straightLineLabel
          } else {
            formattedParameter = (value as AnalysisToolUITravelMode)?.name
          }
        } else if (key === 'saveResultIn' && typeof value === 'string') {
          if (value.length > 0) {
            formattedParameter = userFolders.find(folder => folder.id === value)?.title ?? value
          } else {
            formattedParameter = user?.username ?? ''
          }
        } else if (
          typeof value === 'string' &&
          (value.includes('serviceProperties') ||
            value.includes('itemProperties'))
        ) {
          const outputName: OutputName = JSON.parse(value)
          formattedParameter =
            outputName?.serviceProperties?.name ??
            outputName.itemProperties?.title ??
            undefined
        } else if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            value = (value as CombinedHistoryParameter[]).map(param => {
              let formattedArrayParameter = param
              const tempParam = param
              if (typeof param === 'string') {
                try {
                  param = JSON.parse(param)
                } catch {
                  param = tempParam
                }
              }

              if (typeof param === 'object') {
                formattedArrayParameter = formatParameterObject(
                  param as AnalysisToolData,
                  parameterInfo
                ) as AnalysisToolData
              }
              return formattedArrayParameter
            })
          } else {
            formattedParameter = formatParameterObject(
              value as AnalysisToolData,
              parameterInfo
            ) as AnalysisToolData
          }
        } else if (
          parameterInfo?.dataType === AnalysisToolParamDataType.GPDate
        ) {
          const date = new Date(value as number)
          const dateString = date.toLocaleString(getLocaleInfo().formatLocale, {
            timeZone: 'UTC'
          })
          if (
            parameterInfo.componentName === 'analysis-traffic-time-input' &&
            combinedParameters.timeZoneForTimeOfDay === 'UTC'
          ) {
            formattedParameter = translate('nowDate', { dateString })
          } else {
            formattedParameter = dateString
          }
        } else if (typeof value === 'boolean') {
          formattedParameter = translate(value ? 'trueKey' : 'falseKey')
        } else {
          // Here we are capturing the vast majority of parameters that would need to be localized
          // So we will perform this operation here.
          formattedParameter = getT9nForJobParamValue(
            value as any,
            parameterInfo
          )
        }
      }
    }
    return formattedParameter ?? value
  }

  const formatParameterObject = (
    parameter: CombinedHistoryParameter,
    parameterInfo?: AnalysisParamModel[string]
  ): CombinedHistoryParameter => {
    let formattedLayerParameter = parameter
    const { url, filter } = parameter as LayerUrlFilter
    const { layerDefinition } = parameter as FeatureCollection
    if (!isEmptyDataItem(formatNumberToLocale)) {
      if (url !== undefined || filter !== undefined) {
        const formatedLayerUrlFilterParameter: AnalysisToolData = {}
        if (url !== undefined) {
          formatedLayerUrlFilterParameter[translate('layer') ?? 'url'] = url
        }
        if (filter !== undefined) {
          formatedLayerUrlFilterParameter[translate('filter') ?? 'filter'] =
            filter
        }
        formattedLayerParameter = formatedLayerUrlFilterParameter
      } else if (layerDefinition !== undefined) {
        formattedLayerParameter = layerDefinition.name
      } else {
        formattedLayerParameter = getT9nForJobParamValue(
          formattedLayerParameter,
          parameterInfo
        )
      }
    }
    return formattedLayerParameter
  }

  const translateParameter = (parameter: AnalysisToolData): { translatedKeys: AnalysisToolData, translatedJobParams: CombinedHistoryParameter } => {
    const translatedJobParams: AnalysisToolData = {}
    const translatedKeys: AnalysisToolData = {}

    Object.keys(parameter)
      .filter(isParameterKey)
      .forEach((key: string) => {
        const formattedKey = getCurrentT9nToolValue(key)
        translatedKeys[key] = formattedKey
        translatedJobParams[key] = (formatParameter(key) ?? key) as unknown as { [key: string]: AnalysisToolDataItem }
      })
    return { translatedKeys, translatedJobParams }
  }

  const translateRasterEnvironmentSettings = (
    jobParamsContext: AnalysisRasterToolContext | undefined
  ): {
    translatedRasterESKeys: { [key: string]: string }
    formattedRasterEnvironmentSettings: { [key: string]: string | number }
  } => {
    const context = jobParamsContext
    const formattedRasterEnvironmentSettings: { [key: string]: string | number } = {}
    const translatedRasterESKeys: { [key: string]: string } = {}

    translatedRasterESKeys.snapRaster = translate('snapRaster')
    translatedRasterESKeys.cellSize = translate('cellSize')
    translatedRasterESKeys.resamplingMethod = translate('resamplingMethod')
    translatedRasterESKeys.mask = translate('mask')
    formattedRasterEnvironmentSettings.snapRaster = translate('none')
    formattedRasterEnvironmentSettings.cellSize = translate('maxOf')
    formattedRasterEnvironmentSettings.resamplingMethod = translate('nearest')
    formattedRasterEnvironmentSettings.mask = translate('none')

    if (isEmptyDataItem(context?.snapRaster)) {
      formattedRasterEnvironmentSettings.snapRaster = translate('none')
    } else {
      formattedRasterEnvironmentSettings.snapRaster = (context?.snapRaster as LayerUrlFilter)?.url
    }

    if (isEmptyDataItem(context?.cellSize)) {
      formattedRasterEnvironmentSettings.cellSize = translate('maxOf')
    } else {
      if (typeof context?.cellSize === 'string') {
        if (context?.cellSize === 'MAXOF') {
          formattedRasterEnvironmentSettings.cellSize = translate('maxOf')
        } else if (context?.cellSize === 'MINOF') {
          formattedRasterEnvironmentSettings.cellSize = translate('minOf')
        }
      } else if (typeof context?.cellSize === 'number') {
        formattedRasterEnvironmentSettings.cellSize = context?.cellSize
      } else if (
        typeof context?.cellSize === 'object' &&
        context?.cellSize !== null &&
        'url' in context?.cellSize
      ) {
        formattedRasterEnvironmentSettings.cellSize = (
          context?.cellSize as LayerUrlFilter
        ).url
      }
    }

    if (isEmptyDataItem(context?.resamplingMethod)) {
      formattedRasterEnvironmentSettings.resamplingMethod = translate('nearest')
    } else {
      switch (context?.resamplingMethod) {
        case 'NEAREST':
          formattedRasterEnvironmentSettings.resamplingMethod = translate('nearest')
          break
        case 'BILINEAR':
          formattedRasterEnvironmentSettings.resamplingMethod = translate('bilinear')
          break
        case 'CUBIC':
          formattedRasterEnvironmentSettings.resamplingMethod = translate('cubic')
          break
        default:
          formattedRasterEnvironmentSettings.resamplingMethod = translate('nearest')
      }
    }

    if (isEmptyDataItem(context?.mask)) {
      formattedRasterEnvironmentSettings.mask = translate('none')
    } else {
      formattedRasterEnvironmentSettings.mask = (context?.mask as LayerUrlFilter)?.url
    }

    // keep the supported raster tool environment settings displayed on History consistent with tool UI
    const { raster } = toolUIJson?.environmentSettings ?? {} as any
    const hideSnapRaster =
      raster?.includes(AnalysisToolContextKeys.SnapRaster) === false
    const hideCellSize =
      raster?.includes(AnalysisToolContextKeys.CellSize) === false
    const hideResamplingMethod =
      raster?.includes(AnalysisToolContextKeys.ResamplingMethod) === false
    const hideMask = raster?.includes(AnalysisToolContextKeys.Mask) === false
    if (hideSnapRaster) {
      delete translatedRasterESKeys.snapRaster
      delete formattedRasterEnvironmentSettings.snapRaster
    }
    if (hideCellSize) {
      delete translatedRasterESKeys.cellSize
      delete formattedRasterEnvironmentSettings.cellSize
    }
    if (hideResamplingMethod) {
      delete translatedRasterESKeys.resamplingMethod
      delete formattedRasterEnvironmentSettings.resamplingMethod
    }
    if (hideMask) {
      delete translatedRasterESKeys.mask
      delete formattedRasterEnvironmentSettings.mask
    }

    return { translatedRasterESKeys, formattedRasterEnvironmentSettings }
  }
  const translateEnvironmentSettings = (jobParamsContext: AnalysisToolContext | undefined): {
    translatedESKeys: { [key: string]: string }
    formattedEnvironmentSettings: { [key: string]: string | number | Partial<{ [key in keyof AnalysisExtent]: string | number }> }
  } => {
    type AnalysisExtentCoordinates = Extract<keyof AnalysisExtent, string>
    type IntlAnalysisExtentStrings = Partial<{ [key in keyof AnalysisExtent]: string | number }>
    const context = jobParamsContext

    let formattedEnvironmentSettings: { [key: string]: string | number | IntlAnalysisExtentStrings } = {}
    let translatedESKeys: { [key: string]: string } = {}

    translatedESKeys.extent = translate('processingExtent')
    translatedESKeys.outSR = translate('outputCoordinateSystem')

    if (isEmptyDataItem(context)) {
      formattedEnvironmentSettings.extent = translate('fullExtent')
      formattedEnvironmentSettings.outSR = translate('sameAsInput')
    } else {
      if (isEmptyDataItem(context?.extent)) {
        formattedEnvironmentSettings.extent = translate('fullExtent')
      } else {
        // create type with keys of AnalysisExtent and values of string
        const currentExtent = {
          ymax: context?.extent?.ymax,
          ymin: context?.extent?.ymin,
          xmax: context?.extent?.xmax,
          xmin: context?.extent?.xmin,
          spatialReference: context?.extent?.spatialReference
        }
        const extent: IntlAnalysisExtentStrings = {}
        Object.keys(currentExtent ?? {}).forEach((extentKey: AnalysisExtentCoordinates) => {
          translatedESKeys[extentKey] = translate(extentKey)
          if (currentExtent?.[extentKey] !== undefined && extentKey !== 'spatialReference') {
            extent[extentKey] = formatNumberToLocale(currentExtent[extentKey])
          } else {
            extent[extentKey] =
              currentExtent?.spatialReference?.latestWkid ??
              currentExtent?.spatialReference?.wkid ??
              currentExtent?.spatialReference?.wkt
          }
        })
        formattedEnvironmentSettings.extent = extent
      }

      if (isEmptyDataItem(context?.outSR)) {
        formattedEnvironmentSettings.outSR = translate('sameAsInput')
      } else {
        formattedEnvironmentSettings.outSR = String(
          context?.outSR?.latestWkid ?? context?.outSR?.wkid ?? ''
        )
      }
    }

    if (analysisEngine === AnalysisEngine.Raster) {
      const { translatedRasterESKeys, formattedRasterEnvironmentSettings } =
        translateRasterEnvironmentSettings(jobParamsContext)
      translatedESKeys = { ...translatedESKeys, ...translatedRasterESKeys }
      formattedEnvironmentSettings = {
        ...formattedEnvironmentSettings,
        ...formattedRasterEnvironmentSettings
      }
    }

    return { translatedESKeys, formattedEnvironmentSettings }
  }

  const [translatedRFTParameters, setTranslatedRFTParameters] = useState<{ translatedKeys: AnalysisToolData, translatedJobParams: CombinedHistoryParameter }>()
  useEffect(() => {
    if (analysisType === AnalysisType.RasterFunction) {
      getRFxTranslatedRFTParameters(
        jobParams?.rasterFunction as RFxTemplate,
        jobParams?.outputName as string,
        getLocaleInfo().locale
      ).then(({ translatedKeys, translatedJobParams }) => {
        // add save-in-folder name to history details for raster functions
        if (!isEmptyDataItem(translatedKeys.saveInFolder)) {
          const saveInFolderId: string = translatedJobParams.saveInFolder
          let saveInFolderName = ''
          if (saveInFolderId.length > 0) {
            saveInFolderName = userFolders.find((folder) => folder.id === saveInFolderId)?.title ?? saveInFolderId
          } else {
            saveInFolderName = portal?.user.username ?? portal.user.username ?? ''
          }
          translatedJobParams.saveInFolder = saveInFolderName
        }

        setTranslatedRFTParameters({ translatedKeys, translatedJobParams })
      })
    }
  }, [])

  useEffect(() => {
    if (!parametersContainerNode || !combinedParameters || !toolT9n) {
      return
    }
    if (analysisType === AnalysisType.RasterFunction && !translatedRFTParameters) {
      return
    }
    if (parameterContent) {
      parametersContainerNode.appendChild(parameterContent)
      return
    }
    const parametersAnalysisJsonTable = document.createElement('analysis-json-table') // json

    const { translatedKeys, translatedJobParams } = analysisType === AnalysisType.RasterFunction
      ? translatedRFTParameters
      : translateParameter(Immutable(combinedParameters).without('context').asMutable({ deep: true }))

    parametersAnalysisJsonTable.json = translatedJobParams as AnalysisToolData
    parametersAnalysisJsonTable.intlKeys = translatedKeys
    parametersContainerNode.appendChild(parametersAnalysisJsonTable)
    setParameterContent(parametersAnalysisJsonTable)
  }, [parametersContainerNode, toolT9n, translatedRFTParameters])

  useEffect(() => {
    if (!envSettingContainerNode || !combinedParameters || !toolT9n) {
      return
    }

    if (envSettingContent) {
      envSettingContainerNode.appendChild(envSettingContent)
      return
    }
    const envSettingAnalysisJsonTable = document.createElement('analysis-json-table')

    const contextParameter = combinedParameters.context

    const { translatedESKeys, formattedEnvironmentSettings } = translateEnvironmentSettings(contextParameter)

    envSettingAnalysisJsonTable.json = formattedEnvironmentSettings as AnalysisToolData
    envSettingAnalysisJsonTable.intlKeys = translatedESKeys
    envSettingContainerNode.appendChild(envSettingAnalysisJsonTable)
    setEnvSettingContent(envSettingAnalysisJsonTable)
  }, [envSettingContainerNode, toolT9n])

  const [parametersTableWrapOn, setParametersTableWrapOn] = useState(false)

  return (
    <React.Fragment>
      <CollapsablePanel
        label={<div className='d-flex w-100'>
          <span css={css`flex: 1`}>{translate('parameters')}</span>
          <Button title={translate('optimizeTableView')} aria-label={translate('optimizeTableView')} onClick={() => { setParametersTableWrapOn(!parametersTableWrapOn) }}>
            {parametersTableWrapOn ? <WrapOffOutlined /> : <WrapOnOutlined />}
          </Button>
        </div>}
        aria-label={translate('parameters')} type="default" defaultIsOpen>
        <div css={style}>
          <div className={parametersTableWrapOn ? 'wrap-on' : ''} ref={(node) => { setParametersContainerNode(node) }}></div>
        </div>
      </CollapsablePanel>
      {type !== ToolType.Custom && <CollapsablePanel label={translate('environmentSettings')} aria-label={translate('environmentSettings')} type="default" defaultIsOpen>
        <div css={style}>
          <div ref={(node) => { setEnvSettingContainerNode(node) }}></div>
        </div>
      </CollapsablePanel>}
    </React.Fragment>
  )
}

export default HistoryParameters
