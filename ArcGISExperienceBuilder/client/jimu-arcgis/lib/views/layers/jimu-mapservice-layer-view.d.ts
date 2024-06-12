import { JimuLayerView, type JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuMapServiceLayerViewOptions extends JimuLayerViewConstructorOptions {
    url?: string;
}
export declare class JimuMapServiceLayerView extends JimuLayerView {
    url: string;
    constructor(options: JimuMapServiceLayerViewOptions);
    ready(): Promise<this>;
}
