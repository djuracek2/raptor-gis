import { type DataSource, type IMDataSourceInfo } from 'jimu-core';
import { JimuMapServiceLayerView, type JimuMapServiceLayerViewOptions } from './jimu-mapservice-layer-view';
export declare class JimuMapImageLayerView extends JimuMapServiceLayerView {
    url: string;
    private readonly originalGdbVersion;
    constructor(options: JimuMapServiceLayerViewOptions);
    protected onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    protected validateDataSource(layerDs: DataSource): boolean;
}
