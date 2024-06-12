import { type IGeometry, type GeometryType, type IFeature, type IPopupInfo, type IFeatureLayer, type ILayerDefinition, type SpatialRelationship, type Units } from '@esri/arcgis-rest-types';
import { type IMDataSourceSchema, type ImmutableObject, type IntlShape } from 'jimu-core';
import { type WebMapWebChart } from 'arcgis-charts';
import { type QueriableDataSource, type JSAPILayerMixin, type ItemMixin, type DataSourceTypes, type DataRecord, type SqlQueryParams, type QueryOptions, type QueryResult, type GetCurrentQueryParamsOptions, type AttachmentInfo, type TimeExtent, type TimeInfo, type CodedValue, type StatisticDefinition, type QueriableSelectOptions, type Capabilities, type QueryCapabilities, type QueryProgressCallback, type QueriableUsedFieldsOptions, type TimezoneRuntime } from './common-data-source-interface';
import { type SceneLayerDataSource } from './scene-layer-data-source-interface';
/**
 * `FeatureLayerDataSource` is created from a single feature layer of feature service, map service or webmap/webscene.
 *
 * The source of feature layer data source may be from -
 * 1. an array directly (`sourceRecords`), `isDataInDataSourceInstance` is true for such data sources, or,
 * 2. an ArcGIS Maps SDK for JavaScript feature layer, or,
 * 3. an AGOL/portal item or a remote database.
 *
 * Please note, for the 2, the feature layer can be both client-side or server-side.
 */
export interface FeatureLayerDataSource extends QueriableDataSource, JSAPILayerMixin, ItemMixin {
    type: DataSourceTypes.FeatureLayer;
    url?: string;
    portalUrl?: string;
    itemId?: string;
    layerId?: string;
    /**
     * The ArcGIS Maps SDK for JavaScript [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) object.
     */
    layer?: __esri.FeatureLayer;
    /**
     * The [Feature Layer](https://developers.arcgis.com/web-map-specification/objects/featureLayer/) JSON object.
     */
    restLayer?: IFeatureLayer;
    /** Return the current GDB version. */
    getGDBVersion: () => string;
    /** Change the layer GDB version. */
    changeGDBVersion: (gdbVersion: string) => void;
    createJSAPILayerByDataSource: () => Promise<__esri.FeatureLayer>;
    createRestAPILayerByDataSource: () => IFeatureLayer;
    setAssociatedDataSource: (associatedDataSource: SceneLayerDataSource) => void;
    getAssociatedDataSource: () => SceneLayerDataSource;
    getCharts: () => WebMapWebChart[];
    supportSymbol: () => boolean;
    supportAttachment: () => boolean;
    setLayerDefinition: (layerDefinition: ILayerDefinition) => void;
    getLayerDefinition: () => ILayerDefinition;
    setPopupInfo: (popupInfo: IPopupInfo) => void;
    getPopupInfo: () => IPopupInfo;
    /**
     * @ignore
     * To do query based on query capabilities of the feature layer, we do two things.
     * 1. Before doing query, we fix query object by removing some conflicts params, see `fixQueryParam`.
     * 2. When doing query, we send query request by query capabilities (may remove some params), then enhance the result (using the removed params), see `doQuery`.
     */
    getCapabilities: () => FeatureLayerCapabilities;
    supportTime: () => boolean;
    getTimeInfo: () => TimeInfo;
    /**
     * If layer in unknown timezone, will return 'unknown'.
     * If use device timezone, will return 'device'.
     * If use a specific timezone, will return the timezone name.
     *    There are two datasets: Calcite component values such as'Asia/shanghai', Services values such as'Pacific Standard Time'.
     * If do not find any timezone settings, will return null.
     */
    getTimezone: () => TimezoneRuntime;
    load: (query: FeatureLayerQueryParams, options?: QueryOptions) => Promise<DataRecord[]>;
    loadCount: (query: FeatureLayerQueryParams, options?: QueryOptions) => Promise<number>;
    query: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>;
    queryCount: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>;
    queryById: (id: string) => Promise<FeatureDataRecord>;
    selectRecords: (options: FeatureLayerSelectOptions, signal?: AbortSignal, progressCallback?: QueryProgressCallback) => Promise<QueryResult>;
    selectRecordById: (id: string, record?: FeatureDataRecord) => void;
    selectRecordsByIds: (ids: string[], records?: FeatureDataRecord[]) => void;
    getIdField: () => string;
    getGeometryType: () => GeometryType;
    getConfigQueryParams: () => FeatureLayerQueryParams;
    mergeQueryParams: (...queries: FeatureLayerQueryParams[]) => FeatureLayerQueryParams;
    getRealQueryParams: (query: any, flag: 'query' | 'load', options?: QueryOptions) => FeatureLayerQueryParams;
    getCurrentQueryParams: (options?: GetCurrentQueryParamsOptions) => FeatureLayerQueryParams;
    getAllUsedFields: (options?: FeatureLayerUsedFieldsOptions) => string[] | '*';
    fetchSchema: () => Promise<IMDataSourceSchema>;
    getFieldCodedValueList: (jimuFieldName: string, record?: FeatureDataRecord) => CodedValue[];
    buildRecord: (feature: IFeature | __esri.Graphic) => FeatureDataRecord;
    getDataViews: () => FeatureLayerDataSource[];
    getDataView: (dataViewId: string) => FeatureLayerDataSource;
    getMainDataSource: () => FeatureLayerDataSource;
    /**
     * When current data source is created from an array of records (`DataRecord`), will save it in `sourceRecords`.
     * These two methods are used to update or get the source data.
     * Please note, use these two mthods only when `isDataInDataSourceInstance` is true.
     */
    setSourceRecords: (records: DataRecord[]) => void;
    /** Return the source records */
    getSourceRecords: () => DataRecord[];
    /**
     * When current data source is created from an array of features (__esri.Graphic), will save it in an ArcGIS Maps SDK for JavaScript feature layer.
     * This method is used to update the source data.
     * Please note, use this method only when `isDataInDataSourceInstance` is not true.
     */
    updateSourceByFeatures: (features: Array<__esri.Graphic | __esri.GraphicProperties>, fields: Array<__esri.Field | __esri.FieldProperties>, objectIdField: string, others?: Omit<__esri.FeatureLayerProperties, 'source' | 'fields' | 'objectIdField'>) => Promise<void>;
}
/**
 * Query parameters for featuer layer.
 */
export interface FeatureLayerQueryParams extends SqlQueryParams {
    /**
     * Object IDs of records to be queried.
     */
    objectIds?: number[];
    /**
     * The geometry of the spatial filter.
     */
    geometry?: IGeometry;
    geometryType?: GeometryType;
    /**
     * The spatial relationship to be applied to the input geometry while performing the query.
     */
    spatialRel?: SpatialRelationship;
    /**
     * The buffer distance for the input geometries.
     */
    distance?: number;
    /**
     * The unit for calculating the buffer distance.
     */
    units?: Units;
    /**
     * If true, the geometry of each result feature will be returned.
     */
    returnGeometry?: boolean;
    /**
     * This option can be used to specify the number of decimal places for the returned geometries.
     */
    geometryPrecision?: number;
    /**
     * The definitions for one or more field-based statistics to be calculated.
     */
    outStatistics?: StatisticDefinition[];
    /**
     * If true, z-values are included in the results if the features have z-values. Otherwise, z-values are not returned.
     */
    returnZ?: boolean;
    /**
     * If true, m-values are included in the results if the features have m-values. Otherwise, m-values are not returned.
     */
    returnM?: boolean;
    /**
     * Specify the geodatabase version to be queried.
     */
    gdbVersion?: string;
    /**
     * The sqlFormat parameter can be either standard SQL-92 standard or it can use the native SQL of the underlying data store.
     */
    sqlFormat?: 'none' | 'standard' | 'native';
    /**
     * If true, it returns distinct values based on the fields specified in outFields.
     */
    returnDistinctValues?: boolean;
    /**
     * The time instant or the time extent to query. A null value specified for start time or end time will represent infinity for start or end time, respectively.
     */
    time?: TimeExtent;
    /**
     * If true, the queried features have full precision geometry.
     */
    returnFullGeometries?: boolean;
    /**
     * If true, don't add missed fields into layer.outFields for client query.
     */
    notAddFieldsToClient?: boolean;
}
export type IMFeatureLayerQueryParams = ImmutableObject<FeatureLayerQueryParams>;
export interface FeatureLayerCapabilities extends Capabilities {
    getQueryCapabilities: () => FeatureLayerQueryCapabilities;
}
/**
 * @ignore
 */
export interface FeatureLayerQueryCapabilities extends QueryCapabilities {
    supportsStatistics: boolean;
    supportsPagination: boolean;
    supportsOrderBy: boolean;
    supportsDistinct: boolean;
    supportsPaginationOnDistinct: boolean;
    supportsPaginationOnStatisticsWithGroupBy: boolean;
    supportsOrderByOnlyOnLayerFields: boolean;
    supportsPercentileStatistics: boolean;
    supportedQueryFormats: string;
}
/**
 * Record of feature layer data source.
 */
export interface FeatureDataRecord extends DataRecord {
    /** The feature returned from query ArcGIS REST APIs or the ArcGIS Maps SDK for JavaScript [Graphic](https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html) object */
    feature: IFeature | __esri.Graphic;
    dataSource: FeatureLayerDataSource | SceneLayerDataSource;
    attachmentInfos: AttachmentInfo[];
    /**
     * Whether the feature has full precision geometry. Default is true.
     * If a client-side query is enabled in the map widget, it may be false.
     */
    hasFullGeometries: boolean;
    clone: (deep?: boolean) => FeatureDataRecord;
    queryAttachments: (attachmentTypes?: string[]) => Promise<AttachmentInfo[]>;
    fetchSymbolPreviewHTML: () => Promise<HTMLElement>;
    getData: () => {
        [key: string]: any;
    };
    getFormattedFieldValue: (jimuFieldName: string, intl: IntlShape) => string;
    getDataBeforeMapping: () => {
        [key: string]: any;
    };
    getOriginData: () => {
        [key: string]: any;
    };
    toJson: () => IFeature | __esri.Graphic;
    getId: () => string;
    setId: (id: string) => void;
    getGeometry: () => IGeometry;
    setFeature: (feature: IFeature | __esri.Graphic) => void;
    getFeature: () => IFeature | __esri.Graphic;
}
export interface FeatureLayerSelectOptions extends QueriableSelectOptions {
    queryParams?: Pick<FeatureLayerQueryParams, 'where' | 'geometry'>;
}
export interface FeatureLayerUsedFieldsOptions extends QueriableUsedFieldsOptions {
    queryParams?: FeatureLayerQueryParams;
}
/**
 * @ignore
 * @deprecated
 */
export interface FeatureQueryDataSource extends FeatureLayerDataSource {
}
