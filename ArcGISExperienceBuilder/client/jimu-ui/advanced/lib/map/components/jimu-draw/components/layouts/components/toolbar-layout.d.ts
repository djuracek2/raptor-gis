/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { type JimuMapView } from 'jimu-arcgis';
import { type CreatToolActions } from '../../sketch/constraints';
export interface ToolbarLayoutProps {
    jimuMapView: JimuMapView;
    disableSymbolSelector: boolean;
    popperPositionRef: Element;
    popperIsVisible: boolean;
    popperVersion?: number;
    currentActiveToolChanged: (type: CreatToolActions) => void;
    onPopperToggle?: (isPopperOpen: any) => void;
}
export declare const ToolbarLayout: React.MemoExoticComponent<(props: ToolbarLayoutProps) => jsx.JSX.Element>;
