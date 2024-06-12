import { type GeometryType, type IFeature, type IFeatureLayer } from '@esri/arcgis-rest-types';
import { type FieldSchema, type IMFieldSchema } from '../../types/app-config';
import { type FeatureLayerDataSource, type SceneLayerDataSource, type FeatureDataRecord, type IMFeatureLayerQueryParams, type DataSource, type ItemMixin, type TimeExtent } from '../../data-sources/interfaces';
import { type ImmutableObject } from 'seamless-immutable';
export declare function createFeatureLayerByRecords(dataSource: FeatureLayerDataSource, records: FeatureDataRecord[], sourceVersion?: number): Promise<{
    layer: __esri.FeatureLayer;
    sourceVersion?: number;
}>;
export declare function createRestFeatureLayerByRecords(dataSource: FeatureLayerDataSource, records: FeatureDataRecord[], sourceVersion?: number): {
    layer: IFeatureLayer;
    sourceVersion?: number;
};
type JSAPIGeometryType = 'point' | 'multipoint' | 'polyline' | 'polygon' | 'extent';
export declare function changeRestAPIGeometryTypeToJSAPIGeometryType(geometryType: GeometryType): JSAPIGeometryType;
export declare function changeJSAPIGeometryTypeToRestAPIGeometryType(geometryType: JSAPIGeometryType): GeometryType;
export declare function changeJimuFieldsToJSAPIFields(fields: ImmutableObject<{
    [jimuName: string]: FieldSchema;
}>, idField: IMFieldSchema): __esri.Field[];
type TimeExtentTypeInImmutableQueryParams = IMFeatureLayerQueryParams['time'];
export declare function changeJimuTimeToJSAPITimeExtent(time: TimeExtent | TimeExtentTypeInImmutableQueryParams): __esri.TimeExtent;
export declare function changeToRestAPIFeature(feature: IFeature | __esri.Graphic): IFeature;
export declare function changeToJSAPIGraphic(feature: IFeature | __esri.Graphic): Promise<__esri.Graphic>;
/**
 * Convert IMFeatureLayerQueryParams to __esri.Query | __esri.QueryProperties, to query features by layer (instance of ArcGIS Maps SDK for JavaScript FeatureLayer class).
 */
export declare function changeJimuFeatureLayerQueryToJSAPILayerQuery(dataSource: FeatureLayerDataSource | SceneLayerDataSource, queryParams: IMFeatureLayerQueryParams): Promise<__esri.Query | __esri.QueryProperties>;
export declare function isFeatureLayerDsOrSceneLayerDs(ds: DataSource): ds is FeatureLayerDataSource | SceneLayerDataSource;
export declare function isItemMixin(ds: DataSource): ds is DataSource & ItemMixin;
export {};
