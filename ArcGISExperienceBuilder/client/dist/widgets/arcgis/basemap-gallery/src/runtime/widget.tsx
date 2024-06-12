/** @jsx jsx */
import { React, hooks, type ImmutableArray, jsx, classNames, css } from 'jimu-core'
import { type JimuMapView, JimuMapViewComponent, MapViewManager, basemapUtils } from 'jimu-arcgis'
import { Loading, LoadingType, WidgetPlaceholder } from 'jimu-ui'
import BasemapGallery from 'esri/widgets/BasemapGallery'
import BasemapGalleryViewModel from 'esri/widgets/BasemapGallery/BasemapGalleryViewModel'
import LocalBasemapsSource from 'esri/widgets/BasemapGallery/support/LocalBasemapsSource'
import reactiveUtils from 'esri/core/reactiveUtils'
import Basemap from 'esri/Basemap'
import { BasemapsType } from '../config'
import defaultMessages from './translations/default'
import { type BasemapItem, useCustomBasemapsChange, getBasemap, findDragedItemPosition, type BaseMapProps, useCache, getBasemapGalleryItem } from './utils'
const BaseMapGalleryIcon = require('../../icon.svg')

const style = css`
  &.jimu-basemap-widget {
    .gallery-container-parent{
      .esri-basemap-gallery.esri-component {
        width:100%;
        background-color: transparent !important;
        .esri-basemap-gallery__item {
          animation: none;
          transition: none;
        }
        .esri-basemap-gallery__item--selected {
          border-color: var(--primary-500);
        }
      }
      .esri-component.esri-widget--panel-height-only {
        max-height: none;
      }
      .esri-basemap-gallery:focus-within {
        outline: none;
      }
    }
  }
`

const Widget = (props: BaseMapProps) => {
  const { useMapWidgetIds, config, id } = props
  const { basemapsType, customBasemaps } = config

  const translate = hooks.useTranslation(defaultMessages)

  const [loading, setLoading] = React.useState(true)

  const [currentJimuMapView, setCurrentJimuMapView] = React.useState<JimuMapView>(null)

  const [basemapGallery, setBasemapGallery] = React.useState<__esri.BasemapGallery>()
  const galleryItems = React.useMemo(() => basemapGallery?.viewModel.items, [basemapGallery?.viewModel.items])

  const { getOrgBasemaps, hasGalleryCache, applyCache, originalBasemaps } = useCache(props, currentJimuMapView, basemapGallery)

  const getBasemapsForGallerySource = async (): Promise<__esri.Basemap[]> => {
    let basemaps: __esri.Basemap[] = []

    if (basemapsType === BasemapsType.Organization) {
      basemaps = await getOrgBasemaps()
    } else {
      basemaps = await basemapUtils.getLoadedBasemapList(Basemap, customBasemaps.asMutable())
    }
    return basemaps
  }

  const createBasemapGallery = async (mapView: __esri.MapView | __esri.SceneView) => {
    setLoading(true)

    const basemaps = await getBasemapsForGallerySource()
    const container = document && document.createElement('div')
    container.className = 'esri-component h-100 w-100'

    const originalBasemap = mapView?.map.basemap
    const viewModel = new BasemapGalleryViewModel()
    const originalBasemapIncluded = !!basemaps.find((item) => viewModel.basemapEquals(originalBasemap, item))
    viewModel.destroy()

    const bg = new BasemapGallery({
      view: mapView,
      source: (originalBasemapIncluded || !originalBasemap) ? basemaps : [originalBasemap, ...basemaps],
      container: container
    })
    setBasemapGallery(bg)
    if (widgetContainerParent.current.childElementCount === 0) {
      widgetContainerParent.current.appendChild(container)
    } else {
      widgetContainerParent.current.replaceChildren(container)
    }

    setLoading(false)
  }

  /**
   * if original basemap is not inclued in galleryItems, add it to the top
   * @param activeView
   * @returns
   */
  const handleWithOriginalBasemapAfterBasemapsChanged = (activeView: JimuMapView) => {
    const originalBasemap = originalBasemaps.get(activeView.id) || activeView.view.map.basemap
    if (!originalBasemap) {
      return
    }
    const isOriginalBasemapInGalleryItems = galleryItems.find((item) => basemapGallery.viewModel.basemapEquals(item.basemap, originalBasemap))

    if (isOriginalBasemapInGalleryItems) {
      return
    }
    const galleryItemFromOriginalBasemap = getBasemapGalleryItem(originalBasemap, activeView?.view)
    galleryItems.unshift(galleryItemFromOriginalBasemap)
  }

  hooks.useUpdateEffect(() => {
    // if map changed to none, reset the basemap of previous map view
    if (!useMapWidgetIds?.[0] && currentJimuMapView.view) {
      currentJimuMapView.view.map.basemap = originalBasemaps.get(currentJimuMapView.id)
    }
  }, [useMapWidgetIds?.[0]])

  const onActiveViewChange = async (activeView: JimuMapView, previousActiveViewId: string) => {
    setCurrentJimuMapView(activeView)
    // if no cache and basemapGallery has not been initailed, should create BasemapGallery instance
    if (!basemapGallery && !hasGalleryCache) {
      createBasemapGallery(activeView.view)
    } else if (basemapGallery && activeView) {
      const prevMapWidgetIsNone = !previousActiveViewId
      if (prevMapWidgetIsNone) {
        widgetContainerParent.current.appendChild(basemapGallery.container as HTMLDivElement)
      }

      // if map changed, like map1 -> map2, not include map1 -> none, reset the basemap of previous map view
      const mapChanged = activeView.id.split('-')[0] !== previousActiveViewId.split('-')[0]
      if (mapChanged) {
        const previousJimuMapView = MapViewManager.getInstance().getJimuMapViewById(previousActiveViewId)
        if (previousJimuMapView?.view) {
          previousJimuMapView.view.map.basemap = originalBasemaps.get(previousActiveViewId)
        }
      }

      basemapGallery.view = activeView.view
      // API code limitation: if old items has same basemap with new item, will use the old items directly, won't change their view
      // so the view of item can't updated according to the view of basemapGallery, must update it manually
      basemapGallery.viewModel.items.forEach((item) => {
        item.view = activeView.view
      })
      // source changing is a time-consuming operation, and change source will automatically change basemapGallery.viewModal.items, but change basemapGallery.viewModal.items won't effect source
      // so only need to update the source after map view change, other cases just need to change the basemapGallery.viewModal.items to let the runtime change faster
      // because when you add or delete custom basemap in setting, the source won't change, but map view change will cause basemapGallery.viewModal.items updated according to source
      // if not change source here, will use the old source, and the add or delete operations won't take effect
      // if not in builder, the basemaps won't change, but need to add original basemap of the new activeView at the top, also need change source
      const basemaps = await getBasemapsForGallerySource()
      basemapGallery.source = new LocalBasemapsSource({ basemaps })
      // watch the gallery items, once change, check if need to add the original basemap to top
      reactiveUtils.watch(
        () => basemapGallery?.viewModel.items.map((item) => item.basemap.id),
        () => {
          handleWithOriginalBasemapAfterBasemapsChanged(activeView)
        },
        { once: true }
      )
    }
  }

  const onCustomBasemapAdd = async (prev: ImmutableArray<BasemapItem>, current: ImmutableArray<BasemapItem>) => {
    const addedItem = current[current.length - 1]
    const newBasemap = getBasemap(addedItem)

    galleryItems.push(getBasemapGalleryItem(newBasemap, currentJimuMapView.view))

    await newBasemap.load()
    // if the new basemap equal with the original basemap, delete the original basemap
    const isOriginalBasemap = basemapGallery.viewModel.basemapEquals(originalBasemaps.get(currentJimuMapView.id), newBasemap)
    if (isOriginalBasemap) {
      galleryItems.shift()
    }
  }

  const onCustomBasemapRemove = (prev: ImmutableArray<BasemapItem>, current: ImmutableArray<BasemapItem>) => {
    const index = prev.findIndex((item, index) => item.id !== current[index]?.id)
    // if count of prev custom basemap < count of gallery items, means the first gallery item is from original basemap
    const actualIndex = prev.length < galleryItems.length ? index + 1 : index
    const deletedGalleryItem = galleryItems.splice(actualIndex, 1)[0]

    const activeBasemap = basemapGallery.activeBasemap
    if (!activeBasemap) {
      return
    }
    const activeBasemapIsDeleted = basemapGallery.viewModel.basemapEquals(deletedGalleryItem.basemap, activeBasemap)
    if (activeBasemapIsDeleted) {
      // if active basemap is deleted, select original basemap
      const originalBasemap = originalBasemaps.get(currentJimuMapView.id)
      handleWithOriginalBasemapAfterBasemapsChanged(currentJimuMapView)
      basemapGallery.activeBasemap = originalBasemap
    }
  }

  const onCustomBasemapSort = (prev: ImmutableArray<BasemapItem>, current: ImmutableArray<BasemapItem>) => {
    const positionInfo = findDragedItemPosition<BasemapItem>(prev.asMutable(), current.asMutable())
    if (!positionInfo) {
      return
    }

    let { from, to } = positionInfo

    // if count of prev custom basemap < count of gallery items, it means the first gallery item is from original basemap
    if (prev.length < galleryItems.length) {
      from += 1
      to += 1
    }

    const item = galleryItems.splice(from, 1)[0]
    galleryItems.splice(to, 0, item)
  }

  useCustomBasemapsChange(customBasemaps, onCustomBasemapAdd, onCustomBasemapRemove, onCustomBasemapSort)

  hooks.useUpdateEffect(() => {
    setLoading(true)
    getBasemapsForGallerySource().then((basemaps) => {
      basemapGallery.viewModel.items.removeAll()
      basemapGallery.viewModel.items.addMany(basemaps.map((item) => getBasemapGalleryItem(item, currentJimuMapView.view)))

      handleWithOriginalBasemapAfterBasemapsChanged(currentJimuMapView)

      const originalBasemap = originalBasemaps.get(currentJimuMapView.id)
      const originalBasemapIsActive = basemapGallery.viewModel.basemapEquals(originalBasemap, basemapGallery.activeBasemap)
      if (!originalBasemapIsActive) {
        if (!basemaps.find((basemap) => basemapGallery.viewModel.basemapEquals(basemap, basemapGallery.activeBasemap))) {
          basemapGallery.activeBasemap = originalBasemap
        }
      }
      setLoading(false)
    })
  }, [basemapsType])

  const widgetContainerParent = React.useRef<HTMLDivElement>()

  const updateWidgetContainerParent = (element: HTMLDivElement) => {
    if (!element) {
      return
    }
    widgetContainerParent.current = element
    if (!basemapGallery) {
      const cachedGalleryInstance = applyCache(element)
      if (cachedGalleryInstance) {
        setBasemapGallery(cachedGalleryInstance)
        setLoading(false)
      }
    }
  }

  if (!useMapWidgetIds?.length) {
    return <WidgetPlaceholder icon={BaseMapGalleryIcon} widgetId={id} message={translate('_widgetLabel')} />
  } else {
    return (
      <div className='jimu-widget jimu-basemap-widget surface-1 border-0' css={style}>

        <div
          ref={updateWidgetContainerParent} role='listbox'
          className={classNames('gallery-container-parent', 'h-100', {
            'd-none': loading
          })}></div>

        {loading && <Loading type={LoadingType.Secondary} />}

        <JimuMapViewComponent
          useMapWidgetId={useMapWidgetIds[0]}
          onActiveViewChange={onActiveViewChange}
        />
      </div>
    )
  }
}

export default Widget
