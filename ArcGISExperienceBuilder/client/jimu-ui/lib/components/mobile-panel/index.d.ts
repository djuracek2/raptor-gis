/// <reference types="react" />
import { React, type IntlShape } from 'jimu-core';
import MobilePanelManager from './mobile-panel-manager';
import { VirtualReference } from '../overlay/popper';
interface Props {
    /**
     * Define the class name of the panel.
     */
    className?: string;
    /**
     * The title of the panel.
     */
    title?: string;
    /**
     * Whether the panel is open.
     */
    open?: boolean;
    /**
     * Whether unmount the panel when it is closed.
     */
    keepMount?: boolean;
    /**
     * The content of the panel.
     */
    children?: React.ReactNode;
    /**
     * Callback fired when
     * - click on an area outside popper
     * - `currentPageId` or `browserSizeMode` changes
     * - `appMode` changes
     * @event
     */
    toggle?: (evt?: React.MouseEvent<any>, type?: 'clickOutside' | 'pageOrSizeMode' | 'appMode') => any;
    /**
     * Callback fired when the panel is closed.
     */
    onClose?: (evt?: any) => void;
    /**
     * The map widget id used to identify the map widget.
     * Used when use a map widget as the container of the panel.
     * @ignore
     */
    mapWidgetId?: string;
}
interface IntlProps {
    intl: IntlShape;
}
export declare enum ExpandStage {
    INITSCREEN = "initscreen",
    HALFSCREEN = "halfscreen",
    FULLSCREEN = "fullscreen"
}
interface States {
    parentReferenceHeight: number;
    currentExpandStage: ExpandStage;
    mobilePanelHeight: number;
    generation: number;
}
export declare class _MobilePanel extends React.PureComponent<Props & IntlProps, States> {
    id: string;
    groupId: string;
    currentBottomPanelHeight: number;
    resizeTimeout: any;
    startDrag: boolean;
    moveY: number;
    startY: number;
    sliding: boolean;
    _isMounted: boolean;
    _retryMapWidgetIdTimes: number;
    parentReference: VirtualReference | HTMLElement;
    resizeObserver: ResizeObserver;
    constructor(props: any);
    updateProperties: () => {
        mobilePanelHeight: any;
        generation: any;
        parentReferenceHeight: any;
    };
    getExpectedHeightForStage: (currentStage: ExpandStage) => number;
    handleClose: (evt?: React.MouseEvent<HTMLElement>) => void;
    handleToggle: (evt?: React.MouseEvent<HTMLElement>, type?: 'clickOutside' | 'pageOrSizeMode' | 'appMode') => void;
    componentDidMount(): void;
    resize: () => void;
    actualResize: () => void;
    componentDidUpdate(prevProps: Props, prevState: States): void;
    componentWillUnmount(): void;
    start: (event: any, type: any) => void;
    preventTouceMove: (event: any) => void;
    move: (event: any, type: any) => void;
    end: (event: any, type: any) => void;
    onMobilePanelContainerResize: (width: any, height: any) => void;
    disablePageScroll: () => void;
    enablePageScroll: () => void;
    getReferenceWidth: () => any;
    changeMobilePanelHeightInMap: (targetExpandStage: ExpandStage) => void;
    render(): React.JSX.Element;
}
export declare const MobilePanel: import("@emotion/styled").StyledComponent<Omit<Props & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, {}, {}>;
export { MobilePanelManager };
