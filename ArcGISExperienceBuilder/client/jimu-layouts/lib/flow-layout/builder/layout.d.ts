/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, ReactRedux, type LayoutInfo, type LayoutItemConstructorProps, type IMThemeVariables, type IMLayoutItemJson, type IMAppConfig, type LayoutTransformFunc, type SerializedStyles } from 'jimu-core';
import { type LayoutProps, type StateToLayoutProps, type PageContextProps, type FlowLayoutSetting } from 'jimu-layouts/layout-runtime';
import { type DropHandlers } from '../../builder/types';
import { CanvasPane } from '../../builder/interactive/canvas-pane';
interface State {
    isDragover: boolean;
    isLoadingTemplate: boolean;
}
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps, State> implements DropHandlers {
    ref: HTMLElement;
    widgetListBtnRef: HTMLElement;
    canvasRef: HTMLCanvasElement;
    canvasPane: CanvasPane;
    boundingRect: ClientRect;
    isDragging: boolean;
    childRects: Array<ClientRect & {
        id: string;
    }>;
    domRect: ClientRect;
    resizingRect: ClientRect;
    referenceId: string;
    maxPageWidth: number;
    builderTheme: IMThemeVariables;
    pageContext: PageContextProps;
    layoutTransform: LayoutTransformFunc;
    state: State;
    blockReference: HTMLDivElement;
    blockReference2: HTMLDivElement;
    templateReference: HTMLDivElement;
    mousedownX: number;
    mousedownY: number;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    handleActivate: (e: React.MouseEvent) => void;
    handleMouseDown: (e: any) => void;
    handleDragOver(draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>, clientX: number, clientY: number): void;
    handleToggleDragoverEffect(value: boolean, draggingItem: LayoutItemConstructorProps): void;
    handleDragEnter(draggingItem: LayoutItemConstructorProps): void;
    handleDragLeave(): void;
    handleDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): void;
    addWidgetToLayout(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, width: number, insertIndex: number, appConfig?: IMAppConfig): void;
    handleDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
    collectBounds(layoutInfo: LayoutInfo): Array<ClientRect & {
        id: string;
    }>;
    createItem(item: IMLayoutItemJson, total: number, index: number, layoutSetting: FlowLayoutSetting): JSX.Element;
    onWidgetItemSelected: (item: LayoutItemConstructorProps) => void;
    handleBlockTemplateSelected: (template: any) => void;
    handleScreenTemplateSelected: (template: any) => void;
    handlePageTemplateSelected: (templatePageJson: any) => void;
    getActionStyle(): SerializedStyles;
    getStyle(): SerializedStyles;
    createActions(blockOnly: boolean): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, {
    ref?: React.LegacyRef<Layout>;
    layouts: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").SizeModeLayoutJson> & {
        readonly [x: string]: string;
    };
    children?: React.ReactNode;
    style?: any;
    visible?: boolean;
    className?: string;
    key?: React.Key;
    isInSection?: boolean;
    isInWidget?: boolean;
    isRepeat?: boolean;
    isPageItem?: boolean;
    itemDraggable?: boolean;
    itemResizable?: boolean;
    itemSelectable?: boolean;
    droppable?: boolean;
    showDefaultTools?: boolean;
    isItemAccepted?: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onItemClick?: (e: any, widgetId: string) => void;
    ignoreMinHeight?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
