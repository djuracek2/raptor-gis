import { JimuMapViewStatus, type DataSource, type DataRecordSet, type ArcGISSubLayer, WidgetState, type DataSourceSelectionMode } from 'jimu-core';
import { JimuLayerView } from './layers/jimu-layer-view';
import { JimuFeatureLayerView } from './layers/jimu-feature-layer-view';
import { JimuSceneLayerView } from './layers/jimu-scene-layer-view';
import { type MapViewManager } from '../mapview-manager';
import { type JimuPointSymbol, type JimuPolylineSymbol, type JimuPolygonSymbol } from 'jimu-ui/advanced/map';
import { type JimuMapViewGroup } from './jimu-map-view-group';
export declare enum ActionType {
    DataAction = "DATA_ACTION",
    MessageAction = "MESSAGE_ACTION"
}
export interface SymbolOption {
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
}
export interface MapMutableState {
    /**
     * Data stored for ShowOnMap message action and data action. It contains records data, not data source.
     */
    showOnMapDatas?: ShowOnMapDatas;
    /**
     * Data stored for AddToMap message action and data action. It contains data source, not records data.
     */
    addToMapDatas?: AddToMapDatas;
    /**
     * Stores layer ids info that can be deleted in Map's clear-data tool.
     */
    removeableLayerIdsInfo?: RemoveableLayerIdsInfo;
}
export interface ShowOnMapData {
    mapWidgetId: string;
    messageWidgetId: string;
    jimuMapViewId: string;
    dataSet: DataRecordSet;
    title: string;
    type: ActionType;
    symbolOption?: SymbolOption;
}
export interface ShowOnMapDatas {
    [layerId: string]: ShowOnMapData;
}
export declare enum DataChangeType {
    Create = "CREATE",
    Creating = "CREATING",
    Created = "CREATED",
    Remove = "REMOVE"
}
export declare enum DataChangeStatus {
    Fulfilled = "FULFILLED",
    Pending = "PENDING",
    Rejected = "REJECTED",
    RejectedAndKnown = "REJECTEDANDKNOWN"
}
export interface AddToMapData {
    mapWidgetId: string;
    messageWidgetId: string;
    jimuMapViewId: string;
    dataSourceId: string;
    title: string;
    type: ActionType;
    dataChangeType: DataChangeType;
    dataChangeStatus: DataChangeStatus;
}
export interface AddToMapDatas {
    [layerId: string]: AddToMapData;
}
export interface RemoveableLayerIdsInfo {
    [jimuMapViewId: string]: string[];
}
export declare const SHOW_ON_MAP_DATA_ID_PREFIX = "layer_of_showOnMap_action_";
export declare const ADD_TO_MAP_DATA_ID_PREFIX = "layer_of_addToMap_action_";
/**
 * A MapTool is a ArcGIS JavaScript API widget instance used in map widget.
 */
export interface JimuMapTool {
    /** The tool name, use the ArcGIS JavaScript API class name. */
    name: string;
    /** The instance of ArcGIS JavaScript API class */
    instance: __esri.Widget;
}
/**
 * `JimuMapViewConstructorOptions` is used in the constructor of the `JimuMapView`, to initiate a `JimuMapView` instance.
 */
export interface JimuMapViewConstructorOptions {
    /**
     * The widget id to create the `JimuMapView` instance.
     */
    mapWidgetId: string;
    /**
     * The `isActive` property indicates whether the map in the map widget is accessible.
     * For example, for a single-source map, there is a single `JimuMapView` instance, therefore, the `isActive` is always true.
     * With a multi-source map, there are two JimuMapView instances. In the multi-source map, the property `isActive` is true for the top `JimuMapView` instance,
     * and false for the one beneath. Upon clicking the switch map tool, the `isActive` properties will switch.
     */
    isActive?: boolean;
    /**
     * The `dataSourceId` is the id of the datasource selected to create the map.
     */
    dataSourceId: string;
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript View](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html), including a
     * [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) or a
     * [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html). In the ArcGIS Maps SDK for JavaScript,
     * the `MapView` and `SceneView` are part of the `__esri` namespace types. Thus, their types are `__esri.MapView` and `__esri.SceneView`.
     */
    view: __esri.MapView | __esri.SceneView;
    /**
     * The `isEnablePopup` property indicates whether to display popups when features in the `view` are clicked.
     */
    isEnablePopup?: boolean;
    /** Pass MapViewManager in to avoid circular dependency. */
    mapViewManager: MapViewManager;
    /**
     * @ignore
     * The `useUrlHashLayersVisibility` property indicates whether the map uses the url hash layer visibility or not.
     */
    useUrlHashLayersVisibility?: boolean;
}
export interface JimuLayerViews {
    [jimuLayerViewId: string]: JimuLayerView;
}
export interface UrlHashLayersVisibility {
    [jimuLayerViewId: string]: boolean;
}
type JimuMapViewCacheListener = (jimuMapView: JimuMapView) => void;
type JimuMapViewRestoreListener = (jimuMapView: JimuMapView) => void;
type JimuLayerViewSelectedFeaturesChangeListener = (jimuLayerView: JimuLayerView) => void;
type JimuLayerViewCreatedListener = (jimuLayerView: JimuLayerView) => void;
type SelectByQueryProgressChangeListener = (progress: number) => void;
/**
 * `JimuMapView` is the `view` for developers to develop the map-related functions.
 * For example, developers can use the `view` property of the `JimuMapView` instance to get the original
 *  <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html" target="_blank">ArcGIS Maps SDK for JavaScript `View`</a>,
 * then use the original `view` to develop the map-related functions. At the same time, `JimuMapView` also provides
 * properties such as `isActive` and `status` to indicate the current status in the map widget.
 *
 * `JimuMapView` is a wrapper class for the ArcGIS Maps SDK for JavaScript [`View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html).
 * It is created by a map widget using a map [`DataSource`](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/DataSource).
 *
 * ```typescript
 * import { JimuMapView } from 'jimu-arcgis';
 *
 * // Add the State interface
 * interface State {
 *  extent: __esri.Extent
 * }
 *
 * // On an active view change, set the extent State property
 * onActiveViewChange = (jimuMapView: JimuMapView) => {
 *  if(!this.extentWatch){
 *   this.extentWatch = jimuMapView.view.watch('extent', extent => {
 *     this.setState({
 *       extent
 *     })
 *   });
 *  }
 * }
 *
 * // Use the `JimuMapView` instance from the map widget through the `JimuMapViewComponent` React component
<JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds[0]} onActiveViewChange={this.onActiveViewChange}></JimuMapViewComponent>
 * ```
 *
 */
export declare class JimuMapView {
    /**
     * The id of the `JimuMapView` instance.
     */
    id: string;
    /**
     * The id of the widget creating the `JimuMapView` instance.
     */
    mapWidgetId: string;
    /**
     * The `isActive` property indicates whether the map in the map widget is accessible.
     * For example, for a single-source map, there is a single `JimuMapView` instance, therefore, the `isActive` is always true.
     * With a multi-source map, there are two `JimuMapView` instances. In the multi-source map, the property `isActive` is true for the top `JimuMapView` instance,
     * and false for the one beneath. Upon clicking the switch map tool, the `isActive` properties will switch.
     */
    isActive?: boolean;
    /**
     * The id of the `DataSource` selected to create the map.
     */
    dataSourceId: string;
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html), including a
     * [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) or a
     * [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html). In the ArcGIS Maps SDK for JavaScript,
     * the `MapView` and `SceneView` are part of the `__esri` namespace types. Thus, their types are `__esri.MapView` and `__esri.SceneView`.
     */
    view: __esri.MapView | __esri.SceneView;
    /**
     * The status of the `JimuMapView` instance. `JimuMapViewStatus` enumeration members include `"LOADING"`, `"LOADED"` and `"FAILED"`.
     */
    status: JimuMapViewStatus;
    /**
     * The union for all `JimuLayerView` instances and the layer view object wrapper.
     * the JimuLayerView instance in this object may not been loaded. Please call `whenJimuLayerViewLoaded()` to wait for it's loaded.
     */
    jimuLayerViews?: JimuLayerViews;
    /** The created map tools (ArcGIS JavaScript API widgets) for this view. */
    jimuMapTools: JimuMapTool[];
    private clickHighlightEnabled;
    private jimuMapViewLoadPromise;
    private jimuLayerViewLoadPromises;
    private showOnMapDatas;
    private readonly mapViewManager;
    private cacheListeners;
    private restoreListeners;
    private selectedFeaturesChangeListeners;
    private jimuLayerViewCreatedListeners;
    private selectByQueryProgressChangeListeners;
    private watchPopupFeaturesHandle;
    private watchPopupSelectedHandle;
    private popupFeaturesFromSelection;
    private showPopupUponSelection;
    private mapWidgetState;
    private readonly urlHashLayersVisibility;
    /**
     * @ignore
     */
    jimuMapViewGroup: JimuMapViewGroup;
    constructor(options: JimuMapViewConstructorOptions);
    /**
     * popup.features maybe come from clicking map, or maybe come from exb feature selection.
     * JimuFeatureLayerSceneLayerViewCommon focuses on clicking map case.
     * JimuMapView focuses on exb feature selection case.
     */
    private watchPopupFeaturesAndSelectedFeature;
    /**
     * This method is called when any layer selection changes.
     * @param triggedJimuLayerView The JimuLayerView instance which selection changes.
     * @param triggedByClear Whether the selection changes is triggered by clear the selection of JimuLayerView.
     */
    private handlePopupOnSelectionChange;
    /**
     * This method is used to update popup.features when layer selection changes.
     * This method is only called when showPopupUponSelection option enabled and map is not in active state.
     * @param triggedJimuLayerView The JimuLayerView instance which selection changes.
     * @param triggedByClear Whether the selection changes is triggered by clear the selection of JimuLayerView.
     */
    private updatePopupFeaturesWhenSelectionChange;
    /**
     * Close popup and make sure popup.features is empty.
     */
    private closePopup;
    private isAutoShowPopupWhenSelectFeatures;
    /**
     * @ignore
     */
    setShowPopupUponSelection(showPopupUponSelection: boolean): void;
    /**
     * @ignore
     */
    isPopupFeaturesFromSelection(): boolean;
    /**
     * @ignore
     */
    getSelectedFeatures(): Promise<__esri.Graphic[]>;
    /**
     * @ignore
     */
    getSelectedFeatureCount(): number;
    addJimuMapTool(tool: JimuMapTool): void;
    deleteJimuMapTool(toolName: string): void;
    enableClickOpenPopup(): void;
    disableClickOpenPopup(): void;
    isClickOpenPopupEnabled(): boolean;
    enableClickHighlight(): void;
    disableClickHighlight(): void;
    isClickHighlightEnabled(): boolean;
    setIsActive(isActive: boolean): void;
    setMapWidgetState(widgetState: WidgetState): void;
    isMapWidgetActive(): boolean;
    private initView;
    private onClick;
    private selectDataSourceOrFeatureByFeatures;
    private isMapServiceLayerPopupEnabled;
    private tryIdentifyClickedFeature;
    /**
     * Get JimuLayerView by JS API layer or sublayer.
     * @param layerOrSubLayer JS API layer or sublayer.
     */
    getJimuLayerViewByAPILayer(layerOrSubLayer: __esri.Layer | ArcGISSubLayer): JimuLayerView;
    private readonly getJimuLayerViewIdByJimuLayerId;
    getJimuLayerViewIdByAPILayer: (layerOrSubLayer: __esri.Layer | ArcGISSubLayer) => string;
    getJimuLayerViewByDataSourceId(dataSourceId: string): JimuLayerView;
    private clearAllJimuLayerViewsSelectRecord;
    private addJimuLayerView;
    /**
     * Resolve the JimuMapView when it is loaded.
     */
    whenJimuMapViewLoaded(): Promise<JimuMapView>;
    /**
     * Return the JimuLayerView when it's loaded.
     *
     * For a JimuLayerView id, the instance may not have been craeted, but we can make sure the first level JimuLayerView are created.
     * So, for a JimuLayerView id, we'll make sure its parent JimuLayerView get created and ready, and the JimuLayerView will create its children JimuLayerViews in the ready().
     */
    whenJimuLayerViewLoaded(jimuLayerViewId: string): Promise<JimuLayerView>;
    /** @see whenJimuLayerViewLoaded, but use data source  */
    whenJimuLayerViewLoadedByDataSource(ds: DataSource): Promise<JimuLayerView>;
    private makeSureParentLayerViewsLoaded;
    /**
     * return the loaded JimuLayerViews only
     */
    whenAllJimuLayerViewLoaded(): Promise<JimuLayerViews>;
    /**
     * Give a parent JimuLayerView id, will load all of its children JimuLayerViews.
     * For failed JimuLayerViews, we'll catch the error but they don't stop others.
     */
    private whenChildJimuLayerViewLoaded;
    /**
     * Return all JimuLayerViews.
     */
    getAllJimuLayerViews(): JimuLayerView[];
    /**
     * Return all parent JimuLayerViews.
     */
    getParentJimuLayerViews(jimuLayerViewId: string): JimuLayerView[];
    /**
     * Return all child JimuLayerViews.
     */
    getAllChildJimuLayerViews(jimuLayerViewId: any): JimuLayerView[];
    /**
     * Return the direct child JimuLayerViews
     */
    getChildJimuLayerViewIds(jimuLayerViewId: any): string[];
    private findChildLayerView;
    /**
     * Start to create JimuLayerViews
     * This method does not promise all layer views are created, but it promises the first level are created.
     */
    private startCreateJimuLayerViews;
    /**
     * Create the JimuLayerView and add it into the jimuLayerViews object. Resolve the promise when it is ready.
     *
     * @param layerOrSubLayer the layer can be a Layer or a SubLayer
     * @param parentJimuLayerId the layer's parent JimuLayerView ID
     * @param index layer index
     * @param runtimeAddedDataSource Optional, the layer data source added at runtime.
     * @param fromRuntime Optional, true means the JimuLayerView is created from runtime. e.g. The JimuLayerView is created by AddData widget at runtime. false means the layer is a builtin layer of WebMap or WebScene.
     */
    createJimuLayerView(layerOrSubLayer: __esri.Layer | ArcGISSubLayer, parentJimuLayerId: string, index: number, runtimeAddedDataSource?: DataSource, fromRuntime?: boolean): Promise<JimuLayerView>;
    private onStoreChange;
    /**
     * Clear the selected features.
     */
    clearSelectedFeatures(): void;
    /**
     * Select features in all layers in the map by a graphic.
     * @param graphic This is the [ArcGIS Maps SDK for JavaScript `Graphic`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html).
     * @param spatialRelationship This parameter defines the spatial relationship to query features in the layer, see details [here](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#spatialRelationship).
     * @param selectionMode This parameter is to indicate how the new select operation affects the original selection. It can only be the following enumeration values: `New`, `AddToCurrent`, `RemoveFromCurrent`, or `SelectFromCurrent`.
     * */
    selectFeaturesByGraphic(graphic: __esri.Graphic, spatialRelationship: string, selectionMode: DataSourceSelectionMode, outputAllFields?: boolean): Promise<any>;
    /**
     * @ignore
     * @param updateSelection If true, JimuLayerView will update selection by the partial queried features, otherwise JimuLayerView don't update selection.
     */
    cancelSelectByQuery(updateSelection: boolean): Promise<void>;
    private getSelectByQueryProgress;
    /**
     * Destroy the `JimuMapView` instance and the [ArcGIS Maps SDK for JavaScript `View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html) at the same time.
     */
    destroy(): void;
    private _getDefaultJimuMapViewId;
    /**
     * Draw data on the map, using a dedicated [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html)
     * for every data entry. This will clear the layers drawn previously.
     */
    drawDataOnMap(newShowOnMapDatas: ShowOnMapDatas): void;
    /**
     * Draw the features in a [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html).
     */
    drawDataRecordSet(dataSet: DataRecordSet, targetLayerId: string, title?: string, symbolOption?: SymbolOption): Promise<__esri.Graphic[]>;
    /**
     * Update the drawn [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html).
     */
    updateDrawnDataRecordSet(dataSet: DataRecordSet, targetLayerId: string, title?: string, symbolOption?: SymbolOption): Promise<__esri.Graphic[]>;
    /**
     * Get the graphics from `dataRecords`
     */
    private getGraphicsFromRecords;
    /**
     * get symbol
     */
    private getSymbol;
    /**
     * get default symbol
     */
    private getDefaultSymbol;
    /**
     * get default symbol from renderer, maybe return null
     */
    private getDefaultSymbolByRenderer;
    /**
     * add layers according to the corresponding types of data source
     */
    addOrRemoveDataOnMap(newAddToMapDatas: AddToMapDatas): void;
    addLayerToMap(dataSourceId: string, targetLayerId: string): Promise<JimuLayerView>;
    /**
     * Return the max layer index of root layers
     */
    private getMaxLayerIndex;
    removeLayerFromMap(targetLayerId: string): void;
    private parseLayersVisibilityFromUrlHash;
    /**
     * Get current layers visibility, it is used to update url hash.
     */
    private getCurrentLayersVisibilityForUrlHash;
    /**
     * @ignore
     */
    updateUrlHashLayerVisibility(): void;
    /**
     * Indicates if the JimuMapView is destroyed or not. Returns true if the view is not created or if the view is destroyed, otherwise returns false.
     */
    isDestroyed(): boolean;
    /**
     * Return true if map instance is alive and not destroyed, but map container is detached from the DOM tree.
     * @ignore
     */
    isCached(): boolean;
    /**
     * The listener will be triggered when the map is cached, which means map container is detached from the DOM tree but the map is not destroyed.
     * @ignore
     * @param listener
     */
    addCacheListener(listener: JimuMapViewCacheListener): void;
    /**
     * @ignore
     * @param listener
     */
    removeCacheListener(listener: JimuMapViewCacheListener): void;
    /**
     * This method is called when map container is detached from the DOM tree but the map is not destroyed,
     * a typical scenario is that the map is scrolled out of the current page and map becomes invisible.
     * @ignore
     */
    onCache(): void;
    /**
     * The listener will be triggered when the map is restored from cached status, which means map container is attached to the DOM tree again.
     * @ignore
     * @param listener
     */
    addRestoreListener(listener: JimuMapViewRestoreListener): void;
    /**
     * @ignore
     * @param listener
     */
    removeRestoreListener(listener: JimuMapViewRestoreListener): void;
    /**
     * This method is called when map container is attached to the DOM tree again,
     * a typical scenario is that the cached map is scrolled into the current page and map becomes visible again.
     * @ignore
     */
    onRestore(): void;
    /**
     * @ignore
     * @param listener
     */
    addJimuLayerViewSelectedFeaturesChangeListener(listener: JimuLayerViewSelectedFeaturesChangeListener): void;
    /**
     * @ignore
     * @param listener
     */
    removeJimuLayerViewSelectedFeaturesChangeListener(listener: JimuLayerViewSelectedFeaturesChangeListener): void;
    /**
     * @ignore
     * @param jimuLayerView
     */
    onJimuLayerViewSelectedFeaturesChange(jimuLayerView: JimuFeatureLayerView | JimuSceneLayerView, isClear: boolean): Promise<void>;
    /**
     * @ignore
     * @param listener
     */
    addSelectByQueryProgressChangeListener(listener: SelectByQueryProgressChangeListener): void;
    /**
     * @ignore
     * @param listener
     */
    removeSelectByQueryProgressChangeListener(listener: SelectByQueryProgressChangeListener): void;
    /**
     * @ignore
     * @param progress
     */
    onSelectByQueryProgressChange(): void;
    /**
     * The listener will be triggered when JimuLayerView is created and ready to use.
     * @ignore
     * @param listener
     */
    addJimuLayerViewCreatedListener(listener: JimuLayerViewCreatedListener): void;
    /**
     * @ignore
     * @param listener
     */
    removeJimuLayerViewCreatedListener(listener: JimuLayerViewCreatedListener): void;
    private onJimuLayerViewCreated;
}
export {};
