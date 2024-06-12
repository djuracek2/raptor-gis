/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, jsx } from 'jimu-core';
import { type LayoutItemProps, type WidgetProps } from '../types';
declare class _WidgetRenderer extends React.PureComponent<LayoutItemProps & WidgetProps, {
    error: string;
}> {
    ref: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    private loadWidgetClass;
    componentDidMount(): void;
    componentDidUpdate(): void;
    /**
     * Must add an extra div to keep the aspect ratio.
     * https://www.w3schools.com/howto/howto_css_aspect_ratio.asp
     */
    renderWidgetContent(): jsx.JSX.Element;
    getStyle(): import("jimu-core").SerializedStyles;
    onMouseDown(): void;
    render(): jsx.JSX.Element;
}
export declare const WidgetRenderer: ReactRedux.ConnectedComponent<typeof _WidgetRenderer, {
    aspectRatio?: number;
    ref?: React.LegacyRef<_WidgetRenderer>;
    layoutId: string;
    layoutItemId: string;
    children?: any;
    style?: React.CSSProperties;
    onClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    className?: string;
    draggable?: boolean;
    onDoubleClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    key?: React.Key;
    autoWidth?: boolean;
    resizable?: boolean;
    autoHeight?: boolean;
    isInSection?: boolean;
    showDefaultTools?: boolean;
    selectable?: boolean;
    forbidContextMenu?: boolean;
    forbidToolbar?: boolean;
    trailOrder?: number;
    forceAspectRatio?: boolean;
    resizeObserver?: ResizeObserver;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export {};
