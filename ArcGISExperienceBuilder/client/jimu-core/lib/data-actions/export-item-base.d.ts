import { AbstractDataAction, DataLevel } from '../base-data-action';
import { type DataRecordSet } from '../data-sources/interfaces';
import { type IItemAdd, type ICreateItemOptions, type ICreateItemResponse } from '@esri/arcgis-rest-portal';
import { type UserSession } from '@esri/arcgis-rest-auth';
import { type ILayerDefinition } from '@esri/arcgis-rest-feature-layer';
export declare abstract class ExportToItemBase extends AbstractDataAction {
    isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean>;
    isDataSetSupportExportItem(dataSet: DataRecordSet, dataLevel: DataLevel): Promise<boolean>;
    addItem(item: IItemAdd, auth: UserSession, option?: Partial<ICreateItemOptions>, folderId?: string): Promise<ICreateItemResponse>;
    createItem(item: IItemAdd, folderId: string): Promise<string>;
    createServiceItem(dataSet: DataRecordSet, name: string, folderId: string): Promise<string>;
    getLayerForFeatureCollection(dataSet: DataRecordSet, dataLevel: DataLevel, featureUtils: any, returnGeometry?: boolean): Promise<{
        popupInfo: import("@esri/arcgis-rest-types").IPopupInfo;
        layerDefinition: ILayerDefinition;
        featureSet: any;
    }>;
    createFeatureCollectionItem(dataSets: DataRecordSet[], dataLevel: DataLevel, name: string, folderId: string, returnGeometry?: boolean): Promise<string>;
    checkPrivilege(): Promise<boolean>;
    private checkRenderPrivilege;
    private getAllFeatureCollection;
    private query;
}
