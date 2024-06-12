import { type SceneLayerDataSource } from 'jimu-core';
import { JimuFeatureLayerSceneLayerViewCommon, type JimuFeatureLayerSceneLayerViewCommonOptions } from './jimu-feature-layer-scene-layer-view-common';
/**
 * `JimuSceneLayerViewOptions` provides information about the `JimuSceneLayerView`.
 */
export interface JimuSceneLayerViewOptions extends JimuFeatureLayerSceneLayerViewCommonOptions {
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `SceneLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-SceneLayerView.html).
     */
    view: __esri.SceneLayerView;
}
/**
 * The JimuSceneLayerView extends from the JimuLayerView.
 */
export declare class JimuSceneLayerView extends JimuFeatureLayerSceneLayerViewCommon {
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `SceneLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-SceneLayerView.html).
     */
    view: __esri.SceneLayerView;
    getLayerDataSource(): SceneLayerDataSource;
    createLayerDataSource(): Promise<SceneLayerDataSource>;
}
