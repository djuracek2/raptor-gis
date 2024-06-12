import { type IntlShape } from 'jimu-core';
import { type IFeature, type IGeometry } from '@esri/arcgis-rest-types';
import { AbstractDataRecord } from '../base-classes';
import { type AttachmentInfo, type FeatureDataRecord, type FeatureLayerDataSource, type SceneLayerDataSource } from '../interfaces';
interface FeatureRecordOptions {
    isBeforeMappingData?: boolean;
    hasFullGeometries?: boolean;
}
export declare class FeatureDataRecordImpl extends AbstractDataRecord implements FeatureDataRecord {
    feature: IFeature | __esri.Graphic;
    attachmentInfos: AttachmentInfo[];
    hasFullGeometries: boolean;
    protected _dataSource: FeatureLayerDataSource | SceneLayerDataSource;
    protected _queryAllAttachmentsPromise: Promise<AttachmentInfo[]>;
    protected _getSymbolPreviewHTMLPromise: Promise<HTMLElement>;
    private readonly _id;
    constructor(feature: IFeature | __esri.Graphic, dataSource: FeatureLayerDataSource | SceneLayerDataSource, options?: FeatureRecordOptions);
    private setProxyForData;
    set dataSource(d: FeatureLayerDataSource | SceneLayerDataSource);
    get dataSource(): FeatureLayerDataSource | SceneLayerDataSource;
    private fillGeometry;
    queryAttachments(attachmentTypes?: string[]): Promise<AttachmentInfo[]>;
    fetchSymbolPreviewHTML(): Promise<HTMLElement>;
    getData(): {
        [key: string]: any;
    };
    setData(data: {
        [key: string]: any;
    }): void;
    clone(deep?: boolean): FeatureDataRecord;
    getDateFieldValue(jimuFieldName: string): number;
    getFormattedFieldValue(jimuFieldName: string, intl: IntlShape): string;
    getDataBeforeMapping(): {
        [key: string]: any;
    };
    getOriginData(): {
        [key: string]: any;
    };
    toJson(): IFeature | __esri.Graphic;
    getId(): string;
    setId(id: string): void;
    getGeometry(): IGeometry;
    getRawGeometry(): IGeometry | __esri.Geometry;
    setGeometry(geo: IGeometry | __esri.Geometry): void;
    setFeature(feature: IFeature | __esri.Graphic): void;
    getFeature(): IFeature | __esri.Graphic;
    /**
     * @ignore
     * Returns whether `feature` is type of `__esri.Graphic`, some methods only work with `__esri.Graphic`.
     */
    private _isGraphicFeature;
}
export {};
