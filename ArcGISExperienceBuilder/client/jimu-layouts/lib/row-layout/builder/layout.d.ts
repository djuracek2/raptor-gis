/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux } from 'jimu-core';
declare const _default: ReactRedux.ConnectedComponent<any, {
    layouts: import("jimu-core").IMSizeModeLayoutJson;
    className?: string;
    style?: any;
    isInSection?: boolean;
    isInWidget?: boolean;
    isRepeat?: boolean;
    isPageItem?: boolean;
    visible?: boolean;
    itemDraggable?: boolean;
    itemResizable?: boolean;
    itemSelectable?: boolean;
    droppable?: boolean;
    showDefaultTools?: boolean;
    isItemAccepted?: (item: import("jimu-core").LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onItemClick?: (e: any, widgetId: string) => void;
    ignoreMinHeight?: boolean;
    children?: React.ReactNode;
    widgetId: string;
    parentLayoutId?: string;
    parentLayoutItemId?: string;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
