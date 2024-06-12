import { type SceneLayerDataSource, type FeatureLayerDataSource, type UseDataSource, type IMWidgetJson, JimuFieldType, type ImmutableArray, type DataSourceSchema, type DataSourceJson, type FieldSchema } from 'jimu-core';
import { type SearchDataConfig, type AddressFields } from '../type/type';
interface AddressFieldSchameResult {
    addressFieldsSchema: FieldSchema[];
    defaultAddressFieldName: string;
}
export declare const ObjectIdSchema: {
    jimuName: string;
    alias: string;
    type: JimuFieldType;
    name: string;
};
/**
 * Get outputDs default schema
*/
export declare const getInitSchema: (label?: string, addressFields?: FieldSchema[]) => DataSourceSchema;
export declare const getNameOfDefaultAddressField: (fields: FieldSchema[], nameIndex?: number) => string;
export declare const getAddressFieldsSchemaAndDefaultFieldName: (addressFields?: AddressFields[]) => AddressFieldSchameResult;
/**
 * Get outputDs json
*/
export declare const getInitOutDataSource: (widgetId: string, configId: string, geocodeUrl: string, label?: string) => DataSourceJson;
export declare const getOutputJsonOriginDs: (ds: SceneLayerDataSource | FeatureLayerDataSource) => FeatureLayerDataSource;
export declare const getWhetherDsInUseDataSources: (ds: UseDataSource, useDataSources: ImmutableArray<UseDataSource>) => boolean;
export declare const isDsInDatasources: (datasource: UseDataSource, datasources: UseDataSource[]) => boolean;
export declare const checkIsUseDsChenged: (datasource: UseDataSource[], preDatasources: UseDataSource[]) => boolean;
/**
 * Check is useDatasource or outputDatasource chenged in widgeJson
*/
export declare const checkIsWidgetJsonDsChanged: (widgetJson: IMWidgetJson, useDataSource: UseDataSource[], outputDatasource: string[]) => boolean;
/**
 * Get congfig id list
*/
export declare const getConfigIdList: (datasourceConfig: SearchDataConfig[]) => string[];
/**
 * Get new datasource config id
*/
export declare const getNewConfigId: (configIdList: string[]) => string;
export declare const getOutputDataSourceId: (configId: string, widgetId: string) => string;
export {};
