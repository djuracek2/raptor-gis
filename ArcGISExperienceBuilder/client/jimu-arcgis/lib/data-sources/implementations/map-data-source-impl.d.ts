import { AbstractSetDataSource, type DataSourceConstructorOptions, type DataSourceTypes as JimuCoreDataSourceTypes, type ArcGISSubLayer } from 'jimu-core/data-source';
import { type IMDataSourceSchema, type DataSource } from 'jimu-core';
import { DataSourceTypes, type MapDataSource } from '../arcgis-data-source-interface';
export interface MapDataSourceConstructorOptions extends DataSourceConstructorOptions {
    map?: __esri.Map;
}
export declare class MapDataSourceImpl extends AbstractSetDataSource implements MapDataSource {
    type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene;
    map: __esri.Map;
    constructor(options: MapDataSourceConstructorOptions);
    ready(): Promise<void>;
    protected getChildIds(): string[];
    protected createChildDataSourceById(childDsId: string, jimuChildId: string, childId: string): Promise<DataSource>;
    createDataSourceByLayer(layer: __esri.Layer | ArcGISSubLayer): Promise<DataSource>;
    fetchSchema(): Promise<IMDataSourceSchema>;
    getDataSourceByLayer(layer: __esri.Layer | ArcGISSubLayer): DataSource;
    /**
     * Return all descendant data sources with specific data source type.
     */
    getDataSourcesByType(type: JimuCoreDataSourceTypes | DataSourceTypes): DataSource[];
    private traverseToGetDataSourcesByType;
    protected createMap(): Promise<void>;
    protected setProxies(): void;
    private setProxyForLayerOrTable;
    private createChildDataSourceByLayer;
    private findLayerInfo;
    private getLayersAndTables;
    private getChildIdByLayer;
    /**
     * This is a temp fix. Let's move this code into JimuLayerView when this issue is fixed: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/48066
     */
    protected createFilterUrlChildDataSource(): Promise<void>;
}
