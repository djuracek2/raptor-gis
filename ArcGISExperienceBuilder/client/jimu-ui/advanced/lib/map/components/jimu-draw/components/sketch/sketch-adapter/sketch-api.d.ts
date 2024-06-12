/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { type JimuPointSymbol, type JimuPolylineSymbol, type JimuPolygonSymbol, type JimuSymbol, type JimuSymbolType, type DrawingElevationMode3D } from 'jimu-ui/advanced/map';
import { type JimuMapView } from 'jimu-arcgis';
import { CreatToolActions, type JimuDrawCreatedDescriptor, type DrawingUpdatedDescriptor } from '../constraints';
import { type JimuDrawCreationMode, type JimuSymbolsGroup } from '../';
import { type JimuDrawUIOptions } from '../../layouts';
import { type MeasurementsRuntimeInfo } from '../../measurements/constraints';
export interface SketchAPIProps {
    jimuMapView: JimuMapView;
    isDisplayCanvasLayer: boolean;
    creationMode?: JimuDrawCreationMode;
    visibleElements?: __esri.SketchVisibleElements;
    updateOnGraphicClick?: boolean;
    defaultCreateOptions?: __esri.SketchViewModelDefaultCreateOptions;
    defaultUpdateOptions?: __esri.SketchViewModelDefaultUpdateOptions;
    snappingOptions?: __esri.SnappingOptionsProperties;
    elevationInfo?: DrawingElevationMode3D;
    disableSymbolSelector?: boolean;
    defaultSymbols?: JimuSymbolsGroup;
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
    onJimuDrawCreated?: (jimuDrawCreatedDescriptor: JimuDrawCreatedDescriptor) => void;
    onToolsActived?: (drawingMode: string) => void;
    onDrawingCleared?: () => void;
    onDrawingStarted?: () => void;
    onDrawingCanceled?: () => void;
    onDrawingFinished?: (graphic: __esri.Graphic) => void;
    onDrawingUpdated?: (result: DrawingUpdatedDescriptor) => void;
    currentSymbolChanged: (symbol: JimuSymbol) => void;
    currentSymbolTypeChanged: (jimuSymbolType: JimuSymbolType) => void;
    currentActiveToolChanged: (type: CreatToolActions) => void;
    uiOptions: JimuDrawUIOptions;
    currentActiveBtnChanged: (ref: Element) => void;
    isExpandSymbolList: boolean;
    setIsExpandSymbolList: (isExpand: boolean) => void;
    enableSymbolSelector: (enableFlag: boolean) => void;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
}
export interface ApiModulesTypes {
    Sketch: typeof __esri.Sketch;
    SketchViewModel: typeof __esri.SketchViewModel;
    GraphicsLayer: typeof __esri.GraphicsLayer;
    Graphic: typeof __esri.Graphic;
    geometryEngine: __esri.geometryEngine;
    coordinateFormatter: __esri.coordinateFormatter;
    TextSymbol: __esri.TextSymbol;
    FeatureLayer: typeof __esri.FeatureLayer;
}
export declare const SketchAPI: React.MemoExoticComponent<(props: SketchAPIProps) => jsx.JSX.Element>;
