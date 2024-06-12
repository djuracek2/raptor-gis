export declare enum CreatToolActions {
    Point = "point",
    Polyline = "polyline",
    Polygon = "polygon",
    Rectangle = "rectangle",
    Circle = "circle"
}
export declare enum SelectToolActions {
    RectangleSelection = "rectangle-selection",
    LassoSelection = "lasso-selection"
}
export declare enum DrawingElevationMode3D {
    RelativeToGround = "relative-to-ground",
    RelativeToScene = "relative-to-scene",
    OnTheGround = "on-the-ground"
}
export declare enum JimuDrawCreationMode {
    Single = "single",
    Continuous = "continuous",
    Update = "update"
}
export interface JimuDrawCreatedDescriptor {
    sketch: __esri.Sketch;
    getGraphicsLayer: () => __esri.GraphicsLayer;
    completeOperation: () => Promise<void>;
    destroy: () => void;
    enableSymbolSelector: (enableFlag: boolean) => void;
    sketchToolsbarDom: HTMLElement;
}
export type DrawingUpdatedModes = 'deleted' | 'modified' | 'complete' | 'aborted';
export interface DrawingUpdatedDescriptor {
    type: DrawingUpdatedModes;
    graphics: __esri.Graphic[];
}
