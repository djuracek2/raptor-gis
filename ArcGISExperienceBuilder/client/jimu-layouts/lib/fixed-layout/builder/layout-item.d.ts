/// <reference types="react" />
/** @jsx jsx */
import { React, type LayoutItemJson, type IMLayoutItemJson, ReactRedux, type SerializedStyles } from 'jimu-core';
import { type LayoutItemProps, type FixedLayoutItemSetting } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    layoutItem: LayoutItemJson | IMLayoutItemJson;
    offsetX?: number;
    offsetY?: number;
    dw?: number;
    dh?: number;
    index: number;
    initRect?: DOMRect;
    containerRect?: DOMRect;
    isLayoutLockChildren?: boolean;
    onResizeStart: (id: string) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number, shiftKey: boolean, speed: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey: boolean, layoutItem: LayoutItemJson | IMLayoutItemJson, itemSetting: FixedLayoutItemSetting) => void;
    onMoveByKey: (id: string, dx: number, dy: number) => void;
}
interface StateToLayoutItemProps {
    selected: boolean;
    isDesignMode: boolean;
}
interface State {
    dx?: number;
    dy?: number;
}
declare class FixedItem extends React.PureComponent<LayoutItemProps & OwnProps & StateToLayoutItemProps, State> {
    state: State;
    itemSetting: FixedLayoutItemSetting;
    handleResizeEnd: (id: string, dx: number, dy: number, dw: number, dh: number, shiftKey: boolean) => void;
    handleResizing: (id: string, dx: number, dy: number, dw: number, dh: number, shiftKey: boolean, speed: number) => void;
    moveUp: () => void;
    moveDown: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    getKeyboardComponent(): JSX.Element;
    getPositionStyle(): [SerializedStyles, string];
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FixedItem, {
    aspectRatio?: number;
    ref?: React.LegacyRef<FixedItem>;
    index: number;
    layoutId: string;
    layoutItemId: string;
    children?: any;
    style?: React.CSSProperties;
    onClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    offsetX?: number;
    offsetY?: number;
    className?: string;
    draggable?: boolean;
    onDoubleClick?: (e: any, layoutInfo: import("jimu-core").LayoutInfo) => void;
    key?: React.Key;
    autoWidth?: boolean;
    onResizeStart: (id: string) => void;
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
    layoutItem: LayoutItemJson | IMLayoutItemJson;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey: boolean, layoutItem: LayoutItemJson | IMLayoutItemJson, itemSetting: FixedLayoutItemSetting) => void;
    dh?: number;
    dw?: number;
    initRect?: DOMRect;
    containerRect?: DOMRect;
    isLayoutLockChildren?: boolean;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number, shiftKey: boolean, speed: number) => void;
    onMoveByKey: (id: string, dx: number, dy: number) => void;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
