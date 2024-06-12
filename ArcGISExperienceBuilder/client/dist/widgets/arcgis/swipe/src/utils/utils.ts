import { type JimuLayerViews, type JimuLayerView, LayerTypes, DataSourceTypes } from 'jimu-arcgis'
import { DataSourceManager } from 'jimu-core'

/**
 * Determines whether two arrays have the same values, but not necessarily in the same order.
 * Note: This method is suitable only for small arrays.
 * @param a The first array.
 * @param b The second array.
 * @returns Returns true if the values in both arrays are equal, otherwise returns false.
 */
export const arraysEqual = (a, b): boolean => {
  if (a?.length !== b?.length) {
    return false
  }
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) {
      return false
    }
  }
  return true
}

/**
 * Get jimuMapViewId using mapWidgetId and dataSourceId.
 * Note: This rule refers to createJimuMapView method in MapViewManager.
 */
export const getJimuMapViewId = (mapWidgetId: string, dataSourceId: string): string => {
  return mapWidgetId + '-' + dataSourceId
}

/**
 * Determine whether the layer is need to be disabled in jimuLayerViewSelector.
 * Note: Swipe API does not support for group layer.
 */
export const isLayersDisabled = (jimuLayerView: JimuLayerView): boolean => {
  return jimuLayerView.type === 'group'
}

/**
 * Determine whether the layer is need to be hidden in jimuLayerViewSelector.
 * Note: Swipe API does not support for the subLayers of Map service(LayerTypes: MapImageLayer, TileLayer), because they don't have a layer view.
 */
export const isLayersHidden = (jimuLayerView: JimuLayerView, jimuLayerViews: JimuLayerViews): boolean => {
  if (jimuLayerView.parentJimuLayerViewId) {
    return isTopParentLayerFromMapService(jimuLayerView, jimuLayerViews)
  } else {
    return false
  }
}

const isTopParentLayerFromMapService = (jimuLayerView: JimuLayerView, jimuLayerViews: JimuLayerViews) => {
  if (jimuLayerView.parentJimuLayerViewId) {
    return isTopParentLayerFromMapService(jimuLayerViews[jimuLayerView.parentJimuLayerViewId], jimuLayerViews)
  } else {
    const isMapService = jimuLayerView.type === LayerTypes.MapImageLayer || jimuLayerView.type === LayerTypes.TileLayer
    return isMapService
  }
}

/**
 * Determine whether the data source is a webMap or a webScene.
 * @param dataSourceId
 * @returns boolean
 */
export const isWebMap = (dataSourceId: string) => {
  return DataSourceManager.getInstance().getDataSource(dataSourceId)?.type === DataSourceTypes.WebMap
}
