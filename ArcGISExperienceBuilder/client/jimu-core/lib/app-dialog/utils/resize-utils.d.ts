import { type IMDialogJson, type IMDialogSizeMode } from '../../types/app-config';
import { type BrowserSizeMode } from 'jimu-core/lib/types/common';
export declare const RESIZE_HANDLER_SIZE = "4px";
export declare function getResizeHandlers(isDesignMode: any, dialogSizeMode: IMDialogSizeMode, Icon: any): any[];
export declare function bindResizeHandler(interact: any, resizeRef: HTMLDivElement, dialogJson: IMDialogJson, browserSizeMode: BrowserSizeMode, getAppConfigAction: any, setResizeEnd: any): Interact.Interactable;
