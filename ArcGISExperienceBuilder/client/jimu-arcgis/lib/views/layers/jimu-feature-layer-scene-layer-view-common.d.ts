import { type DataSource, type FeatureLayerDataSource, type IMDataSourceInfo, type FeatureLayerQueryParams, type FeatureDataRecord, type SceneLayerDataSource, DataSourceSelectionMode, type IMFeatureLayerQueryParams } from 'jimu-core';
import { JimuLayerView, type JimuLayerViewConstructorOptions } from './jimu-layer-view';
import { type IFeature } from '@esri/arcgis-rest-types';
/**
 * @ignore
 */
export interface JimuFeatureLayerSceneLayerViewCommonOptions extends JimuLayerViewConstructorOptions {
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `FeatureLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html).
     */
    view: __esri.FeatureLayerView | __esri.SceneLayerView;
}
interface ClientQueryFeaturesResult {
    success: boolean;
    data: __esri.FeatureSet;
    hasFullGeometries: boolean;
}
interface ClientQueryObjectIdsResult {
    success: boolean;
    data: number[];
}
interface ClientQueryFeatureCountResult {
    success: boolean;
    data: number;
}
/**
 * @ignore
 * The JimuFeatureLayerView extends from the JimuLayerView.
 */
export declare class JimuFeatureLayerSceneLayerViewCommon extends JimuLayerView {
    view: __esri.FeatureLayerView | __esri.SceneLayerView;
    private highLightHandle;
    private highLightLayerCreationPromise;
    /**
     * highlightFeatureLayer is used highlight layer in mapservice, it is a client-side FeatureLayer.
     */
    private highlightFeatureLayer;
    private highlightFeatureLayerView;
    private popupSelectFeatureWatchHandle;
    private popupVisibleWatchHandle;
    private layerVisibleWatchHandle;
    private highlightOptionsWatchHandle;
    /** @ignore */
    private localDefinitionExpression;
    /** @ignore */
    private readonly originalGdbVersion;
    private reactiveUtils;
    private Graphic;
    private selectQueryPromise;
    private selectByQueryAbortController;
    private selectByQueryProgress;
    private latestHighlightIds;
    constructor(options: JimuFeatureLayerSceneLayerViewCommonOptions);
    ready(): Promise<this>;
    destroy(): void;
    /**
     * @ignore
     */
    getSelectedFeatureCount(): number;
    /**
     * Get selected features of current JimuLayerView.
     */
    getSelectedFeatures(): Promise<__esri.Graphic[]>;
    private getApiGraphicsByRecordFeatures;
    /**
     * This method should only be called when DataSource not exists.
     * @ignore
     */
    private querySelectedFeaturesFromClient;
    /**
     * Query features from client view.
     * The layer view does not provide queryFromServer. When you need to query from server, use the data source.
     * @param query
     */
    private queryFeaturesFromClient;
    private queryFeaturesFromClientHighlightLayer;
    /********************
     * The layer view provides some selection methods:
     * * selectFeatureById
     * * selectFeaturesByIds
     * * selectFeaturesByQuery
     *
     * What the selection does is: it will highlight the feature. If the layer view has related data source, the related data records will be selected as well.
     ******************/
    /**
     * When select feature by ID, we can pass in the data source record so when the selected records are not loaded in data source, we can add them in.
     * However, if the record is not loaded and is not passed in, there will be no selection.
     * If we can get the layer data source, record can be FeatureDataRecord or Graphic. Otherwise, record can only be Graphic.
     */
    selectFeatureById(id: number, record?: FeatureDataRecord | __esri.Graphic): Promise<void>;
    /**
     * See `selectFeatureById`
     */
    selectFeaturesByIds(ids: number[], records?: FeatureDataRecord[]): Promise<void>;
    /**
     * Select features from the layer. If the last select operation has not been completed, calling this method will automatically terminate the previous selection progress.
     * @param query The query parameters.
     * @param selectionMode This parameter is to indicate how the new select operation affects the original selection. It can only be the following enumeration values: `New`, `AddToCurrent`, `RemoveFromCurrent`, or `SelectFromCurrent`.
     * @returns
     */
    selectFeaturesByQuery(query: FeatureLayerQueryParams, selectionMode: DataSourceSelectionMode): Promise<Array<(__esri.Graphic | IFeature)>>;
    /**
     * @ignore
     * @param updateSelection If true, JimuLayerView will update selection by the partial queried features, otherwise JimuLayerView don't update selection.
     */
    cancelSelectByQuery(updateSelection: boolean): Promise<void>;
    private isFreshAbortController;
    private getOrCreateLocalDataSource;
    /**
     * @ignore
     */
    getSelectQueryProgress(): number;
    private setSelectQueryProgress;
    /**
     * @ignore
     *
     * The promise resolves an __esri.Query instance if client query is ready to use, otherwise resolves null.
     * Need to make sure this method resolves true before call clientQueryFeatures(), clientQueryObjectIds() and clientQueryFeatureCount().
     * @param queryParams
     */
    private whenClientQueryReady;
    private checkGeometryForClientQuery;
    private updateLayerOutFieldsForClientQuery;
    /**
     * @ignore
     * This method will resolve when this.view.updating is false.
     */
    whenCurrentLayerViewNotUpdating(): Promise<void>;
    /**
     * This method will resolve when this.highlightFeatureLayerView.updating is false.
     */
    private whenHighlightLayerViewNotUpdating;
    /**
     * This method will resolve when layerView.updating is false.
     */
    private whenLayerViewNotUpdating;
    /**
     * @ignore
     *
     * Query features from layer view.
     * Note, this method never rejects, so need to check result.success to  determine whether the client query is successful.
     * @param queryParams
     */
    clientQueryFeatures(queryParams: IMFeatureLayerQueryParams): Promise<ClientQueryFeaturesResult>;
    /**
     * @ignore
     *
     * Executes a Query against features available for drawing in the layerView and returns array of the ObjectIDs of features that satisfy the input query.
     * Note, this method never rejects, so need to check result.success to  determine whether the client query is successful.
     * @param query
     */
    clientQueryObjectIds(queryParams: IMFeatureLayerQueryParams): Promise<ClientQueryObjectIdsResult>;
    /**
     * @ignore
     *
     * Executes a Query against features available for drawing in the layerView and returns the number of features that satisfy the query.
     * Note, this method never rejects, so need to check result.success to  determine whether the client query is successful.
     * @param query
     */
    clientQueryFeatureCount(queryParams: IMFeatureLayerQueryParams): Promise<ClientQueryFeatureCountResult>;
    private getApiQueryForClientQuery;
    /**
     * set the definitionExpression to layer and view, but does not apply the definitionExpression to data source.
     */
    setDefinitionExpression(localDefinitionExpression: string): void;
    protected validateDataSource(layerDs: DataSource): boolean;
    getLayerDataSource(): FeatureLayerDataSource | SceneLayerDataSource;
    createLayerDataSource(): Promise<FeatureLayerDataSource | SceneLayerDataSource>;
    getOrCreateLayerDataSource(): Promise<FeatureLayerDataSource | SceneLayerDataSource>;
    getHighlightLayerLayer(): __esri.FeatureLayer;
    /**
     * Even the data source instance is not created, this method will still be invoked if the info changed.
     */
    protected onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    /**
     * popup.features maybe come from clicking map, or maybe come from exb feature selection.
     * JimuFeatureLayerSceneLayerViewCommon focuses on clicking map case.
     * JimuMapView focuses on exb feature selection case.
     */
    private watchPopupSelectFeature;
    private releasePopupVisibleWatchHandle;
    private watchPopupVisible;
    private isPopupSelectCurrentLayerFeature;
    /**
     * @ignore
     */
    onParentLayerVisibleChange(parentNewVisible: boolean): void;
    private watchLayerVisible;
    private onLayerFinalVisibleChange;
    private watchHighlightOptions;
    /**
     * When map is loaded first time, we'll try to move the selected feature to center
     */
    private tryMoveToCenter;
    private getLayerFromFeature;
    private setRefreshIntervalForLayer;
    private setDefinitionExpressionToLayer;
    private highLightSelectedRecords;
    /**
     * For MapService sub layer, we need to create a layer for highlight.
     */
    private tryCreateHighLightFeatureLayer;
    private addFeaturesToHighlightFeatureLayer;
    private removeFeaturesFromHighlightFeatureLayer;
    /**
     * The ids.length must > 0
     */
    private highLightFeatures;
    private clearHighLight;
    private releaseHighLightHandle;
    private onSelectedFeaturesChange;
    private moveFeatureToCenter;
    private getCenterPoint;
    private getSelectedRecordIds;
    /** @ignore */
    private getObjectIdField;
    private getRendererForHighlightLayer;
}
export {};
