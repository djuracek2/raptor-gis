import { React, type AllWidgetProps, hooks, MutableStoreManager, ReactRedux, type IMState, type UseDataSource, Immutable, type ImmutableArray } from 'jimu-core'
import { basemapUtils, type JimuMapView } from 'jimu-arcgis'
import Basemap from 'esri/Basemap'
import BasemapGalleryItem from 'esri/widgets/BasemapGallery/support/BasemapGalleryItem'
import { type IMConfig } from '../config'

export interface BaseMapProps extends AllWidgetProps<IMConfig> {
  mutableStateProps: {
    cachedOrgBasemaps: __esri.Basemap[]
    cachedOriginalBasemaps: Map<string, __esri.Basemap>
    cachedBasemapGalleryInstance: __esri.BasemapGallery
  }
}

export type BasemapItem = basemapUtils.BasemapItem

export const getBasemapGalleryItem = (basemap: __esri.Basemap, mapView: __esri.SceneView | __esri.MapView) => {
  return new BasemapGalleryItem({
    basemap,
    view: mapView
  })
}

export const getBasemap = (basemapItem: BasemapItem) => {
  return new Basemap({
    portalItem: {
      id: basemapItem.id
    }
  })
}

export type CustomBasemapsChangeEventListener = (prev: ImmutableArray<BasemapItem>, current: ImmutableArray<BasemapItem>) => void

export const useCustomBasemapsChange = (customBasemaps: ImmutableArray<BasemapItem>, onAdd: CustomBasemapsChangeEventListener, onRemove: CustomBasemapsChangeEventListener, onSort: CustomBasemapsChangeEventListener) => {
  const prevCustomBasemaps = hooks.usePrevious(customBasemaps)

  hooks.useUpdateEffect(() => {
    let updateFn: CustomBasemapsChangeEventListener
    if (customBasemaps.length > prevCustomBasemaps.length) {
      updateFn = onAdd
    } else if (customBasemaps < prevCustomBasemaps) {
      updateFn = onRemove
    } else {
      updateFn = onSort
    }
    updateFn(prevCustomBasemaps, customBasemaps)
  }, [customBasemaps])
}

/**
 * find the draged item after drag in List, we can only drag one item at a time, and there will always have a from index and to index for the dragged item
 * find the changed part first
 * eg: prev => [1, 2, 3, 4, 5] current => [1, 2, 5, 3, 4]
 * prevChangedPart should be [3, 4, 5] currentChangedPart should be [5, 3, 4]
 * then, obviously, if [3, 4, 5] and [5, 3, 4] both remove 5, the rest array will be [3, 4] and [3, 4], and every item is equal
 * so 5 is the dragged item and it was dragged from 4 to 2
 * @param prev
 * @param current
 * @returns
 */
export const findDragedItemPosition = <T>(prev: T[], current: T[]) => {
  if (prev.length !== current.length || !prev.length || !current.length) {
    return null
  }
  const prevChangedPart = prev.map((item, index) => ({ item, index })).filter((info, index) => info.item !== current[index])
  if (!prevChangedPart.length) {
    // no changes
    return null
  }
  const currentChangedPart = current.map((item, index) => ({ item, index })).slice(prevChangedPart[0].index, prevChangedPart[prevChangedPart.length - 1].index + 1)
  for (let i = 0; i < prevChangedPart.length; i++) {
    const info = prevChangedPart[i]
    const itemIndexInCurrentChangedPart = currentChangedPart.findIndex((i) => i.item === info.item)

    const prevChangedPartWithoutItem = [...prevChangedPart]
    prevChangedPartWithoutItem.splice(i, 1)
    const currentChangedPartWithoutItem = [...currentChangedPart]
    currentChangedPartWithoutItem.splice(itemIndexInCurrentChangedPart, 1)

    if (prevChangedPartWithoutItem.every((info, i) => info.item === currentChangedPartWithoutItem[i].item)) {
      return {
        from: info.index,
        to: currentChangedPart[itemIndexInCurrentChangedPart].index
      }
    }
  }
}

export const useRefStore = <T>(initValue?: T) => {
  const refStore = React.useRef<T>(initValue)

  const set = (newValue: T) => {
    refStore.current = newValue
  }

  return { set, store: refStore.current }
}

const emptyUseDataSources = Immutable([] as UseDataSource[])

export const useCache = (props: BaseMapProps, currentJimuMapView: JimuMapView, basemapGallery: __esri.BasemapGallery) => {
  const { id, mutableStateProps, useMapWidgetIds } = props

  // Cache organization basemaps since it is time consuming for getting them.
  const cachedOrgBasemaps: __esri.Basemap[] = React.useMemo(() => mutableStateProps?.cachedOrgBasemaps || null, [mutableStateProps?.cachedOrgBasemaps])
  const setCachedOrgBasemaps = React.useCallback((cachedOrgBasemaps: __esri.Basemap[]) => {
    MutableStoreManager.getInstance().updateStateValue(id, 'cachedOrgBasemaps', cachedOrgBasemaps)
  }, [id])

  // Cache original basemaps since some contain actions will cause original basemap lost, such as dragging it into/out of Map widget.
  const cachedOriginalBasemaps = React.useMemo(() => mutableStateProps?.cachedOriginalBasemaps || null, [mutableStateProps?.cachedOriginalBasemaps])
  const setCachedOriginalBasemaps = React.useCallback((cachedOriginalBasemaps: Map<string, __esri.Basemap> | null) => {
    MutableStoreManager.getInstance().updateStateValue(id, 'cachedOriginalBasemaps', cachedOriginalBasemaps)
  }, [id])

  // Cache baseMapGallery since recreation is time-consuming and some contain actions do not require recreating it, such as dragging it into/out of Map widget.
  const cachedBasemapGalleryInstance = React.useMemo(() => mutableStateProps?.cachedBasemapGalleryInstance || null, [mutableStateProps?.cachedBasemapGalleryInstance])
  const setCachedBasemapGalleryInstance = React.useCallback((cachedBasemapGalleryInstance: __esri.BasemapGallery | null) => {
    MutableStoreManager.getInstance().updateStateValue(id, 'cachedBasemapGalleryInstance', cachedBasemapGalleryInstance)
  }, [id])

  // init basemapGallery use cache
  const applyCache = (element: HTMLDivElement) => {
    if (cachedBasemapGalleryInstance) {
      element.appendChild(cachedBasemapGalleryInstance.container as HTMLElement)
    }

    if (cachedOriginalBasemaps) {
      setOriginalBasemaps(cachedOriginalBasemaps)
    }

    // has cachedBasemapGalleryInstance, means will not create a new instance, return applyed successfully
    // cachedOriginalBasemaps only update for further use, it is nothing about the performance
    return cachedBasemapGalleryInstance
  }

  hooks.useUpdateEffect(() => {
    return () => {
      setCachedOriginalBasemaps(originalBasemaps)
      setCachedBasemapGalleryInstance(basemapGallery)
    }
  }, [basemapGallery])

  const getOrgBasemaps = async () => {
    if (cachedOrgBasemaps) {
      return [...cachedOrgBasemaps]
    }
    const orgBasemapItems = await basemapUtils.getOrgBasemaps()
    setCachedOrgBasemaps(orgBasemapItems)
    return orgBasemapItems
  }

  const { set: setOriginalBasemaps, store: originalBasemaps } = useRefStore<Map<string, __esri.Basemap>>(new Map())

  // store original basemaps
  React.useEffect(() => {
    if (currentJimuMapView?.view && !originalBasemaps.get(currentJimuMapView.id)) {
      originalBasemaps.set(currentJimuMapView.id, currentJimuMapView.view.map.basemap)
    }
  // if map change from map1 -> none, currentJimuMapView will not change, so must add useMapWidgetIds?.[0] as dependency here
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentJimuMapView, useMapWidgetIds?.[0]])

  // delete stored original basemap after corresponding mapview deleted
  const mapDataSources = ReactRedux.useSelector((state: IMState) => {
    const s = state.appStateInBuilder ?? state
    return useMapWidgetIds?.[0] ? s.appConfig.widgets[useMapWidgetIds[0]]?.useDataSources || emptyUseDataSources : null
  })

  // if map changes, delete original basemaps of map views in previous map
  React.useEffect(() => {
    if (mapDataSources) {
      const mapWidgetId = useMapWidgetIds?.[0]
      const mapViewIds = mapDataSources.length ? mapDataSources.asMutable().map((item) => `${mapWidgetId}-${item.dataSourceId}`) : [`${mapWidgetId}-`]

      // deley original basemaps delete, beacuse if map changed, need to use the originalBasemaps store to reset the basemap of previous map view
      setTimeout(() => {
        for (const key of originalBasemaps.keys()) {
          if (!mapViewIds.includes(key)) {
            originalBasemaps.delete(key)
          }
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapDataSources])

  // delete all original basemaps when select none map
  hooks.useUpdateEffect(() => {
    if (!useMapWidgetIds?.[0]) {
      setOriginalBasemaps(new Map())
    }
  }, [useMapWidgetIds?.[0]])

  return {
    hasGalleryCache: !!cachedBasemapGalleryInstance,
    getOrgBasemaps,
    applyCache,
    originalBasemaps
  }
}
