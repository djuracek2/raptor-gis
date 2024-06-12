import {
  type SupportedLayer,
  getServiceName,
  isEmptyDataItem,
  type ConvertJobParamsToToolDataOptions,
  convertJobParamsToToolData as analysisConvertJobParamsToToolData,
  generateSelectedLayersKey
} from 'analysis-shared-utils'
import { type GPFeatureRecordSetLayer, type AnalysisToolDataItem, type AnalysisToolInfo, type AnalysisToolUI, type AnalysisToolUIParam, AnalysisToolParamDirection, type AnalysisToolParam, AnalysisToolUICurrentVersion, type FeatureCollection, AnalysisToolParamDataType, type AnalysisToolUIRule, type AnalysisToolData, type LocaleItem } from 'analysis-ui-schema'
import { type DataSourceJson, DataSourceTypes, dataSourceUtils, type ServiceDefinition, ServiceManager, SupportedLayerServiceTypes, getAppStore, SessionManager, DataSourceManager, Immutable, uuidv1, DataSourcesChangeMessage, DataSourcesChangeType, MessageManager, portalUrlUtils, loadArcGISJSAPIModules, loadArcGISJSAPIModule, type hooks, type ImmutableObject } from 'jimu-core'
import { type CustomToolOutput, type StandardToolOutput, type ToolConfig, ToolType, type HistoryItemWithDs, type FailedLayer, type CustonToolParam } from '../config'
import { type IItem } from '@esri/arcgis-rest-portal'
import { dataSourceJsonCreator, type DataSource, type FeatureLayerDataSourceConstructorOptions } from 'jimu-core/data-source'
import { React, SupportedItemTypes as JimuSupportedItemTypes, esri } from 'jimu-core'
import { depthTraversalProcessingValue, isLayerInputType, isNumberInput, resultValueIsFeatureSet } from '../utils/util'
import { type JimuMapView, zoomToUtils, ADD_TO_MAP_DATA_ID_PREFIX } from 'jimu-arcgis'
import { type ArcGISRequestError } from '@esri/arcgis-rest-request'

export function getNextResultDsId (widgetId: string, order: number): string {
  return `analysis-${widgetId}-${order}-${uuidv1()}`
}

export async function getDsJsonFromArcGISService (url: string, dsId: string): Promise<DataSourceJson> {
  try {
    // remove timeout logic since if need login and user login slowly, it will be very easy to be timeout
    const res = await ServiceManager.getInstance().fetchServiceInfo(url)
    const serviceDefinition = res.definition

    /**
     * For feature service, if it is single layer but the url is not end up with layer id, we need to find the single layer and create a feature layer data source, not feature service data source.
     * This is to make single layer feature service item to support 'set filter' action and 'view in table' action.
     */
    if (dataSourceUtils.isSupportedWholeArcGISService(url) && dataSourceJsonCreator.getDataSourceTypeFromArcGISWholeServiceUrl(url) === DataSourceTypes.FeatureService) {
      const layers = (serviceDefinition?.layers || []).concat(serviceDefinition?.tables || [])
      // If the single layer is not feature layer or table, will still create feature service data source.
      if (layers.length === 1 && ((serviceDefinition?.layers?.length === 1 && serviceDefinition?.layers?.[0]?.type === SupportedLayerServiceTypes.FeatureLayer) || (serviceDefinition?.tables?.length === 1))) {
        const serviceUrl = url.split('?')[0].replace(/^http:/, 'https:').replace(/\/$/, '')
        return getDsJsonFromSingleLayerServiceDefinition(serviceUrl, serviceDefinition, dsId)
      }
    }

    return getSingleDsJsonFromArcGISServiceDefinition(dsId, url, serviceDefinition)
  } catch (error) {
    return Promise.reject(error)
  }
}

function getSingleDsJsonFromArcGISServiceDefinition (dsId: string, url: string, serviceDefinition: ServiceDefinition): DataSourceJson {
  const dsJson: DataSourceJson = dataSourceJsonCreator.createDataSourceJsonByLayerDefinition(dsId, serviceDefinition, url)?.asMutable({ deep: true })

  if (!dsJson) {
    throw new Error('Failed fetch')
  } else {
    return dsJson
  }
}

export function getDsJsonFromSingleLayerServiceDefinition (serviceUrl: string, serviceDefinition: ServiceDefinition, dataSourceId: string, sourceLabel?: string, itemId?: string, portalUrl?: string): DataSourceJson {
  const layers = (serviceDefinition?.layers || []).concat(serviceDefinition?.tables || [])
  const layerId = `${layers[0]?.id || 0}`
  const layerUrl = `${serviceUrl}/${layerId}`
  const dsJson: DataSourceJson = {
    id: dataSourceId,
    type: DataSourceTypes.FeatureLayer,
    url: layerUrl,
    layerId,
    sourceLabel: sourceLabel || layers[0]?.name,
    geometryType: layers[0]?.geometryType
  }
  if (itemId) {
    dsJson.itemId = itemId
  }
  if (portalUrl) {
    dsJson.portalUrl = portalUrl
  }
  return dsJson
}

export function urlIsMapServiceLayerOutput (url: string) {
  return url?.includes('/MapServer/jobs/')
}

const getDataSourceJson = async (result: GPFeatureRecordSetLayer, widgetId: string, dsOrderRef: React.MutableRefObject<number>) => {
  // for featureSet output, they will be deleted when store history to local
  // so after refresh, the result will be undefined, should show error alert in history result
  if (!result) {
    return Promise.reject(new Error())
  }
  const dsId = getNextResultDsId(widgetId, dsOrderRef.current)
  if (resultValueIsFeatureSet(result)) {
    return {
      id: dsId,
      type: DataSourceTypes.FeatureLayer
    }
  } else if (typeof result === 'object' && 'url' in result && !isEmptyDataItem(result.url)) {
    // for raster data
    if ('format' in result) {
      return
    }
    if (!dataSourceUtils.isSupportedArcGISService(result.url)) {
      return
    }
    // for map service layer output
    if (urlIsMapServiceLayerOutput(result.url)) {
      return {
        id: dsId,
        type: DataSourceTypes.MapService,
        url: result.url
      }
    }
    return getDsJsonFromArcGISService(result.url, dsId)
  } else if (typeof result === 'object' && 'itemId' in result && !isEmptyDataItem(result.itemId)) {
    const portalUrl = getAppStore().getState().portalUrl
    const item: IItem = await esri.restPortal.getItem(result.itemId, {
      portal: portalUrlUtils.getPortalRestUrl(portalUrl),
      authentication: SessionManager.getInstance().getSessionByUrl(portalUrl)
    }).catch(err => {
      return SessionManager.getInstance().handleAuthError(err, false) as any
    })

    if (item.type === JimuSupportedItemTypes.FeatureService && dataSourceUtils.isSupportedWholeArcGISService(item.url)) {
      const serviceUrl = item.url.split('?')[0].replace(/^http:/, 'https:').replace(/\/$/, '')
      const serviceDefinition = await ServiceManager.getInstance().fetchServiceInfo(serviceUrl).then(res => res.definition)
      const layers = (serviceDefinition?.layers || []).concat(serviceDefinition?.tables || [])
      // If the single layer is not feature layer or table, will still create feature service data source.
      if (layers.length === 1 && ((serviceDefinition?.layers?.length === 1 && serviceDefinition?.layers?.[0]?.type === SupportedLayerServiceTypes.FeatureLayer) || (serviceDefinition?.tables?.length === 1))) {
        return getDsJsonFromSingleLayerServiceDefinition(serviceUrl, serviceDefinition, dsId, item.title, item.id, item.portalUrl)
      }
    }

    return Promise.resolve(dataSourceJsonCreator.createDataSourceJsonByItemInfo(dsId, item, portalUrl).asMutable({ deep: true }))
  }
}

// for Date Object, isEmptyDataItem method will return true, because it use 'for in' to check if every property is empty
export function removeEmptyResults (results: __esri.ParameterValue[]) {
  return results.filter((result) => (result?.value instanceof Date) || !isEmptyDataItem(result?.value as AnalysisToolDataItem))
}

export const parseFailedLayerError = (value: __esri.ParameterValue['value'], error: ArcGISRequestError, defaultName?: string): FailedLayer => {
  const failedLayerObject: FailedLayer = {
    layerName: defaultName || '',
    reasonForFailure: ''
  }
  // parse the name from the URL.
  if (value !== null && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    failedLayerObject.layerName = getServiceName(value.url ?? '')
  }

  if (error.code === 400) {
    // then it is an invalid URL
    failedLayerObject.reasonForFailure = 'invalidUrl'
  } else if (error.name === 'identity-manager:not-authorized') {
    // then it is an issue with sharing/permissions
    failedLayerObject.reasonForFailure = 'noAccess'
  } else {
    failedLayerObject.reasonForFailure = 'defaultLayerFailure'
  }
  return failedLayerObject
}

export async function createDsByResults (widgetId: string, toolType: ToolType, results: __esri.ParameterValue[], output: ToolConfig['config']['output'], history: HistoryItemWithDs, dsOrderRef: React.MutableRefObject<number>) {
  const createDsAndStoreInMap = async (id: string, value: __esri.ParameterValue['value'], paramName: string) => {
    if (['boolean', 'number', 'string'].includes(typeof value) || value instanceof Date) {
      return Promise.resolve()
    }
    try {
      const dsJson = await getDataSourceJson(value as GPFeatureRecordSetLayer, widgetId, dsOrderRef)
      dsOrderRef.current++
      if (dsJson) {
        let constructorOptions: FeatureLayerDataSourceConstructorOptions
        dsJson.disableExport = toolType === ToolType.Custom
          ? !((output as CustomToolOutput).allowExport[paramName] === undefined ? true : (output as CustomToolOutput).allowExport[paramName])
          : !(output as StandardToolOutput).allowExportResults
        // TODO maybe can delete this, check this after component support custom tool
        if (resultValueIsFeatureSet(value)) {
          // const FeatureLayer: typeof __esri.FeatureLayer = await loadArcGISJSAPIModule('esri/layers/FeatureLayer')
          const apiModules = await loadArcGISJSAPIModules(['esri/layers/FeatureLayer', 'esri/Graphic', 'esri/layers/support/Field'])
          const FeatureLayer: typeof __esri.FeatureLayer = apiModules[0]
          const Graphic: typeof __esri.Graphic = apiModules[1]
          const Field: typeof __esri.Field = apiModules[2]
          constructorOptions = {
            id: dsJson.id,
            dataSourceJson: Immutable({ ...dsJson, sourceLabel: paramName }),
            layer: new FeatureLayer({
              source: (value.features || []).map(f => {
                try {
                  return Graphic.fromJSON(f)
                } catch (error) {
                  return f
                }
              }),
              fields: (value.fields || []).map(f => {
                try {
                  return Field.fromJSON(f)
                } catch (error) {
                  return f
                }
              }),
              title: paramName
            })
          } as FeatureLayerDataSourceConstructorOptions
        } else {
          if (!dsJson.sourceLabel) {
            dsJson.sourceLabel = paramName
          }
          constructorOptions = {
            id: dsJson.id,
            dataSourceJson: Immutable(dsJson)
          } as FeatureLayerDataSourceConstructorOptions
        }

        if (toolType !== ToolType.Custom) {
          const featureServiceName = dataSourceUtils.getLabelFromArcGISServiceUrl((value as any)?.url)
          // if has single layer, use feature service name
          // if has mutiple layers, use feature service name-layer name
          const label = results.length === 1 ? featureServiceName : `${featureServiceName}-${dsJson.sourceLabel}`
          constructorOptions.dataSourceJson = constructorOptions.dataSourceJson.set('label', label)
        }

        await DataSourceManager
          .getInstance()
          .createDataSource(constructorOptions)
          .then((ds) => ds.isDataSourceSet && !ds.areChildDataSourcesCreated() ? ds.childDataSourcesReady().then(() => ds) : ds)
          .then((ds) => {
            const dataSourcesChangeMessage = new DataSourcesChangeMessage(widgetId, DataSourcesChangeType.Create, [ds])
            MessageManager.getInstance().publishMessage(dataSourcesChangeMessage)
            if (!history.dsMap) {
              history.dsMap = new Map([[id, ds]])
            } else {
              history.dsMap.set(id, ds)
            }
          })
      }
    } catch (error) {
      const errorInfo = parseFailedLayerError(value, error, paramName)
      if (!history.dsCreateError) {
        history.dsCreateError = new Map([[id, errorInfo]])
      } else {
        history.dsCreateError.set(id, errorInfo)
      }
    }
  }
  const promises: Array<Promise<void>> = []
  results?.forEach((result, index) => {
    const value = result.value

    depthTraversalProcessingValue(value, `${index}`, (id: string, v: __esri.ParameterValue['value']) => {
      promises.push(createDsAndStoreInMap(id, v, result.paramName))
    })
  })
  await Promise.allSettled(promises)
  return {
    dsMap: history.dsMap,
    dsCreateError: history.dsCreateError
  }
}

export function jobDidComplete (jobStatus?: string) {
  const completedStatuses = [
    'job-failed',
    'job-cancelled',
    'job-deleted',
    'job-succeeded',
    'job-timed-out'
  ]
  return jobStatus !== undefined && completedStatuses.includes(jobStatus)
}

export function parameterIsInputGPValueTable (param: AnalysisToolParam) {
  return param.direction === AnalysisToolParamDirection.Input && param.dataType === AnalysisToolParamDataType.GPValueTable
}

export function getRulesOfParameters (parameters: AnalysisToolParam[]) {
  // must set `mapLayer` for field params use the value of their dependency
  const fieldParams = parameters?.filter((p) => p.dataType === AnalysisToolParamDataType.GPField || p.dataType === AnalysisToolParamDataType.GPMultiValueField) || []
  const rules = fieldParams.map((p) => {
    const { dependency } = p
    const dependsOn = parameters.find((p) => p.name === dependency)
    if (dependency && dependsOn) {
      return {
        ruleType: 'expression',
        expression: `$[Data].${dependsOn.name} NOT null`,
        destination: p.name,
        effectParams: {
          mapLayer: `$[Component].${dependsOn.name}.selectedLayers`
        }
      } as AnalysisToolUIRule
    }
    return null
  }).filter((r) => !!r)
  return rules
}

export function getParameterUIJson (param: AnalysisToolParam, translate: ReturnType<typeof hooks.useTranslation>, portal: __esri.Portal, commonStrings: LocaleItem) {
  const uiParam: AnalysisToolUIParam = { name: param.name, label: param.displayName }
  const { enableSketch, hideBrowseButton: paramHideBrowseButton } = param as CustonToolParam
  const hideBrowseButton = !!paramHideBrowseButton
  // TODO check if anonymous user can see browse layers button later
  // const hideBrowseButton = !portal?.user || !!paramHideBrowseButton

  // for filter, will use component filter convert logic for types: featureClass, field and file. As for range, component did not support linear unit, so keep the old logic
  const filter = param.filter as any
  if (isLayerInputType(param.dataType) && param.dataType !== AnalysisToolParamDataType.GPRasterDataLayer) {
    return {
      ...uiParam,
      enableSketch: ([
        AnalysisToolParamDataType.GPFeatureRecordSetLayer,
        AnalysisToolParamDataType.GPMultiValueFeatureRecordSetLayer
      ] as AnalysisToolParamDataType[]).includes(param.dataType) && (enableSketch || enableSketch === undefined),
      hideBrowseButton
    }
  }
  const webToolsUnits = commonStrings?.webToolsUnits || {}
  if (param.dataType === AnalysisToolParamDataType.GPLinearUnit) {
    if (!param.choiceList) {
      uiParam.choiceListLabels = webToolsUnits as { [key: string]: string }
      uiParam.choiceList = Object.keys(webToolsUnits)
    }
    if (filter?.type === 'range') {
      const { minimum, maximum } = filter ?? {}
      uiParam.maximum = maximum
      uiParam.minimum = minimum
    }
    return uiParam
  }
  if (param.dataType === AnalysisToolParamDataType.GPMultiValueLinearUnit) {
    uiParam.UIparameterInfos = [
      {
        choiceList: Object.keys(webToolsUnits),
        choiceListLabels: webToolsUnits as { [key: string]: string },
        name: ''
      }
    ]
  }
  if (isNumberInput(param.dataType)) {
    if (filter?.type === 'range') {
      const { minimum, maximum } = filter ?? {}
      uiParam.max = maximum
      uiParam.min = minimum
    }
    return uiParam
  }
  if (parameterIsInputGPValueTable(param)) {
    if (param.parameterInfos?.length) {
      uiParam.UIparameterInfos = param.parameterInfos.map((p) => getParameterUIJson(p, translate, portal, commonStrings))
      uiParam.UIparameterRules = getRulesOfParameters(param.parameterInfos)
      return uiParam
    }
  }
  return uiParam
}

export function getDefaultToolUIJson (toolJson: AnalysisToolInfo, translate: ReturnType<typeof hooks.useTranslation>, portal: __esri.Portal, commonStrings: LocaleItem): AnalysisToolUI {
  // Analysis UI, parameters no category are added to a block by default, parameters have category are grouped by category info
  const inputUIParameters = new Map<string, AnalysisToolUIParam[]>([['', []]])
  const groupUIParameters = (param: AnalysisToolUIParam, category: string) => {
    const paramsInSameGroup = inputUIParameters.get(category)
    if (paramsInSameGroup) {
      inputUIParameters.set(category, [...paramsInSameGroup, param])
    } else {
      inputUIParameters.set(category, [param])
    }
  }
  toolJson.parameters?.forEach((param: AnalysisToolParam) => {
    if (param.direction === AnalysisToolParamDirection.Input) {
      const uiParam = getParameterUIJson(param, translate, portal, commonStrings)
      groupUIParameters(uiParam, param.category)
    }
  })

  const rules = getRulesOfParameters(toolJson?.parameters)

  const hasInputUIParameters = Array.from(inputUIParameters).map(item => item[1]).flat().length > 0

  const toolUIJson = {
    toolName: toolJson.name,
    version: AnalysisToolUICurrentVersion,
    UIparameters: hasInputUIParameters
      ? Array.from(inputUIParameters).map(([category, params]) => {
        return {
          componentName: 'analysis-block',
          UIparameters: params,
          label: category
        } as AnalysisToolUIParam
      })
      : [],
    rules
  }
  return toolUIJson
}

// TODO keep this function for further fix
export async function getFeatureLayerFromFeatureCollection (featColl: FeatureCollection): Promise<__esri.FeatureLayer> {
  const inputArgument: __esri.FeatureLayerProperties = { title: featColl?.layerDefinition?.name }
  let layerDefinition: FeatureCollection['layerDefinition'] | undefined
  const apiModules = await loadArcGISJSAPIModules(['esri/layers/FeatureLayer', 'esri/rest/support/FeatureSet', 'esri/layers/support/Field', 'esri/renderers/Renderer'])
  const FeatureLayer: typeof __esri.FeatureLayer = apiModules[0]
  const FeatureSet: typeof __esri.FeatureSet = apiModules[1]
  const Field: typeof __esri.Field = apiModules[2]
  const Renderer: typeof __esri.Renderer = apiModules[2]
  if (featColl.featureSet !== undefined) {
    inputArgument.source = FeatureSet.fromJSON(featColl.featureSet).features
    layerDefinition = featColl.layerDefinition
    // Converting the field using JSAPI Field
    if (layerDefinition.fields !== undefined) {
      inputArgument.fields = layerDefinition.fields.map((field): __esri.Field => Field.fromJSON(field))
    }
    // set optional properties if they are defined
    if (layerDefinition.objectIdField !== undefined) inputArgument.objectIdField = layerDefinition.objectIdField

    if (layerDefinition.geometryType !== undefined) {
      //FIXME: This conversion below did not work as expected, so mapping each JSON type to JSAPI geometry type
      // const geometry = geometryJsonUtils.fromJSON({ type: layerDefinition.geometryType });
      let type: __esri.FeatureLayerProperties['geometryType'] = 'point'
      switch (layerDefinition.geometryType) {
        case 'esriGeometryMultipoint':
          type = 'multipoint'
          break
        case 'esriGeometryPoint':
          type = 'point'
          break
        case 'esriGeometryPolygon':
          type = 'polygon'
          break
        case 'esriGeometryPolyline':
          type = 'polyline'
          break
        default:
          break
      }
      inputArgument.geometryType = type
    }

    if (layerDefinition.spatialReference !== undefined) {
      inputArgument.spatialReference = layerDefinition.spatialReference
    }

    if (layerDefinition.drawingInfo?.renderer !== undefined) {
      inputArgument.renderer = Renderer.fromJSON(layerDefinition.drawingInfo.renderer)
    }
  }
  return new FeatureLayer(inputArgument)
}

function isDrawLayer (layer: __esri.Layer) {
  if (!layer.id) {
    return false
  }
  return layer.id.includes('jimu-draw-layer-') || layer.id.includes('jimu-draw-measurements-layer-')
}

// TODO: Make use of the added / removed arrays in the reactive utils to be more efficient
// https://codepen.io/kevindoshier/pen/wvEvxEN?editors=1111
export const getAnalysisMapLayersFromMap = async (map: __esri.Map, collectionRef: React.MutableRefObject<typeof __esri.Collection>): Promise<any[]> => {
  if (!map) {
    return []
  }
  try {
    const { layers, tables }: { layers: __esri.Collection, tables: __esri.Collection } = map
    let Collection: typeof __esri.Collection
    if (collectionRef.current) {
      Collection = collectionRef.current
    } else {
      Collection = await loadArcGISJSAPIModule('esri/core/Collection') as typeof __esri.Collection
    }
    const mapNotesLayers = new Collection()
    const mapImageLayers = new Collection()
    const allOtherLayersAndSublayers = new Collection()
    layers.forEach(layer => {
      if (layer.type === 'map-notes') {
        mapNotesLayers.add(layer)
      } else if (layer.type === 'map-image') {
        mapImageLayers.add(layer)
      } else if (layer.type === 'group') {
        // allLayers is a flattened collection of all sublayers, including nesting
        const flatLayers = layer.allLayers
        // Track sketch layers separately
        mapNotesLayers.addMany(flatLayers.filter((layer) => layer.type === 'map-notes'))
        // Track map image layers separately
        mapImageLayers.addMany(flatLayers.filter((layer) => layer.type === 'map-image'))
        // Add all other layers to the collection to pass to analysis
        allOtherLayersAndSublayers.addMany(flatLayers.filter((layer) => layer.type !== 'map-notes' && layer.type !== 'group'))
      } else {
        allOtherLayersAndSublayers.add(layer)
      }
    })
    // Reverse to match TOC
    const validLayers = allOtherLayersAndSublayers.reverse()

    const allLayers = [
      ...mapNotesLayers.toArray(),
      ...mapImageLayers.toArray(),
      ...validLayers.toArray(),
      ...tables.toArray().reverse()
    ].filter((layer) => !isDrawLayer(layer))

    // analysis component won't load map image layers before get their sublayers, then they will get empty sublayers and will show empty in layer select panel
    // so we can load all layers before pass them to analysis component to avoid issues caused by their code change in future(eg: add other layer handle logic and not load them)
    await Promise.allSettled(allLayers.map(layer => layer.load() as Promise<any>))

    return allLayers
  } catch (error) {
    return []
  }
}

export const useAnalysisMapLayersFromMap = (map: __esri.Map) => {
  const collectionRef = React.useRef<typeof __esri.Collection>()
  const [layers, setLayers] = React.useState<any[]>()
  const updateAnalysisMapLayers = () => {
    getAnalysisMapLayersFromMap(map, collectionRef).then((lys) => {
      setLayers(lys || [])
    }).catch(() => {
      setLayers([])
    })
  }
  React.useEffect(() => {
    updateAnalysisMapLayers()
    if (!map) {
      return
    }
    const eventHandler = map.layers.on('change', (e) => {
      updateAnalysisMapLayers()
    })
    return () => {
      eventHandler?.remove()
    }
  }, [map])
  return layers
}

export const addLayerToMapByDs = (ds: DataSource, currentJimuMapView: JimuMapView, toolId: string, widgetId: string) => {
  const targetLayerId = `${ADD_TO_MAP_DATA_ID_PREFIX}dataAction_${toolId}_${ds.id}`
  return currentJimuMapView.addLayerToMap(ds.id, targetLayerId).then((jimuLayerView) => {
    jimuLayerView.setRemoveableByMapTool(true)
    zoomToUtils.zoomTo(currentJimuMapView.view, jimuLayerView.layer, {
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
      }
    })
  })
}

export const canDisplayAsLink = (value: __esri.ParameterValue['value']): value is __esri.DataFile => {
  return value != null && typeof value === 'object' && 'url' in value && typeof value.url === 'string'
}

export const resulthasItemId = (value: __esri.ParameterValue['value']): value is __esri.DataFile => {
  return value != null && typeof value === 'object' && 'itemId' in value && typeof value.itemId === 'string'
}

export const useShowToolDetail = (signIn: (toolInfo: ImmutableObject<ToolConfig>) => Promise<void>, toolInfo: ImmutableObject<ToolConfig>) => {
  const [showToolDetail, setShowToolDetail] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  React.useEffect(() => {
    signIn(toolInfo).then(() => {
      setShowToolDetail(true)
    }).catch(() => {
      setShowError(true)
    })
  }, [])

  return { showToolDetail, showError }
}

/**
 * Add mapView, mapLayers, user for layer input parameters inner GPValueTable
 * @param parameterInfo
 * @param mapView
 * @param mapLayers
 * @param user
 * @returns
 */
export const convertParameterInfo = (parameterInfo: AnalysisToolParam, mapView: __esri.MapView, mapLayers: SupportedLayer[], user?: __esri.PortalUser) => {
  const { displayName, dataType } = parameterInfo
  const info: { [key: string]: any } = {
    ...parameterInfo,
    label: displayName
  }
  if (isLayerInputType(dataType)) {
    info.mapView = mapView
    info.mapLayers = mapLayers
    info.user = user
  }
  return info as AnalysisToolParam
}

export const convertParameterInfosOfGPValueTable = (parameterInfos: AnalysisToolParam[], mapView: __esri.MapView, mapLayers: SupportedLayer[], user?: __esri.PortalUser) => {
  if (!parameterInfos?.length) {
    return parameterInfos
  }
  return parameterInfos.map((info) => convertParameterInfo(info, mapView, mapLayers, user))
}

/**
 * Since analysis component did not handle with the GPValueTable jobParams correctly,
 * and tool UI JSON can only pass limited informtations,
 * must pass the required infomations for analysis-layer-input component by parameter of tool JSON,
 * required infomations: mapView, mapLayers, user, selectedlayers.
 * "selectedLayers" property is added in convertJobParamsToToolData method below,
 * and the valueTableSelectedLayersConvertedParameters param is one of the return value of convertJobParamsToToolData method.
 * @param valueTableSelectedLayersConvertedParameters
 * @param mapView
 * @param mapLayers
 * @param user
 * @returns
 */
export const convertInputGPValueParameters = (valueTableSelectedLayersConvertedParameters: AnalysisToolParam[], mapView: __esri.MapView, mapLayers: SupportedLayer[], user: __esri.PortalUser) => {
  return valueTableSelectedLayersConvertedParameters?.map((p) => {
    if (parameterIsInputGPValueTable(p)) {
      const newParam = { ...p }
      if (newParam.parameterInfos) {
        newParam.parameterInfos = convertParameterInfosOfGPValueTable(newParam.parameterInfos, mapView, mapLayers, user)
        const { parameterInfos } = newParam
        // TODO handle with type of newParam.defaultValue
        if (Array.isArray(newParam.defaultValue) && (newParam.defaultValue as any[]).every((item) => Array.isArray(item))) {
          // if every default value is array, analysis-value-table component cannot recganize them correctly
          // must get the matched parameter name for every value and change the inner array format to key-value format.
          newParam.defaultValue = newParam.defaultValue.map((v) => {
            const value = {}
            v.forEach((item, i) => {
              const paramName = parameterInfos[i]?.name
              // if default value item is null, should convert to undefined
              // because analysis component only validate udnefind for value, not validate null, some case will throw error when operate on a null (like: "portalItemID"in this.value)
              value[paramName] = item ?? undefined
            })
            return value
          })
        }
      }
      return newParam
    }
    return p
  })
}

export const convertJobParamsToToolData = async (props: ConvertJobParamsToToolDataOptions) => {
  const { jobParams, toolName, availableMapLayers, toolJSON } = props
  // selected layers for GPValueTable
  let valueTableSelectedLayers = [] as SupportedLayer[]
  let valueTableSelectedLayersConvertedParameters: AnalysisToolParam[] = []

  const hasValuetableParameters = !!toolJSON.parameters?.find((p) => parameterIsInputGPValueTable(p))

  // TODO temp fix for tool JSON has GPValueTable input parameters
  if (hasValuetableParameters) {
    const parametersToConvertPromises = toolJSON.parameters?.map(async (p) => {
      // since analysis did not handle with the layers inner GPValueTable parameters, convert the layers inner GPValueTable parameters here
      if (parameterIsInputGPValueTable(p)) {
        const { name, parameterInfos = [] } = p
        const vtJobParamsArr = jobParams[name] as Array<{ [key: string]: AnalysisToolDataItem } | AnalysisToolDataItem>
        const res = await Promise.allSettled(vtJobParamsArr.map((vtJobParams) => {
          return analysisConvertJobParamsToToolData({
            jobParams: vtJobParams as AnalysisToolData,
            uiOnlyParams: {},
            toolJSON: {
              name: '',
              displayName: '',
              parameters: parameterInfos
            },
            availableMapLayers: availableMapLayers,
            toolName
          })
        }))
        const newParameterInfos = parameterInfos.map((i) => ({ ...i }))
        res.forEach((r, index) => {
          if (r.status === 'fulfilled') {
            const { layers, convertedJobParams } = r.value
            valueTableSelectedLayers = [...valueTableSelectedLayers, ...layers]

            newParameterInfos.forEach((i) => {
              const pName = i.name
              const selectedLayersKey = generateSelectedLayersKey(pName)
              const selectedLayers = convertedJobParams[selectedLayersKey] as SupportedLayer[] | undefined
              let formattedSelectedLayers: SupportedLayer | SupportedLayer[] | undefined = selectedLayers
              if (selectedLayers?.length === 0) {
                formattedSelectedLayers = undefined
              } else if (selectedLayers?.length === 1) {
                formattedSelectedLayers = selectedLayers[0]
              }
              // selectedLayers must add to parameterInfo, so it can be passed to analysis-layer-input component,
              // otherwise analysis-layer-input component can't fill in the jobParams.
              (i as any).selectedLayers = formattedSelectedLayers
            })
          }
          return vtJobParamsArr[index]
        })
        return { ...p, parameterInfos: newParameterInfos }
      }
      return p
    }) || []
    const res = await Promise.allSettled(parametersToConvertPromises)
    valueTableSelectedLayersConvertedParameters = res.map((r, i) => r.status === 'fulfilled' ? r.value : toolJSON.parameters[i])
  }
  const parameters = valueTableSelectedLayersConvertedParameters.length ? valueTableSelectedLayersConvertedParameters : toolJSON.parameters
  return analysisConvertJobParamsToToolData({
    jobParams: jobParams,
    uiOnlyParams: {},
    toolJSON: {
      ...toolJSON,
      parameters: parameters?.map((p) => {
        // TODO temp fix
        // when use convertJobParamsToToolData to convert jobParams to toolData, the GPValueTable type will be ignored
        // for GPBoolean type, it will use the parameters directly without no convert
        // so if parameter type is GPValueTable, convert to GPBoolean to make sure the tool data will be created correctly
        if (parameterIsInputGPValueTable(p)) {
          return { ...p, dataType: AnalysisToolParamDataType.GPBoolean }
        }
        return p
      })
    },
    availableMapLayers,
    toolName
  }).then((jobParamsAndLayers) => {
    return {
      valueTableSelectedLayersConvertedParameters,
      valueTableSelectedLayers,
      convertedJobParams: jobParamsAndLayers.convertedJobParams,
      layers: jobParamsAndLayers.layers
    }
  })
}
