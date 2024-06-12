import { type IMControllerPanelJson, type IMAppConfig, type BrowserSizeMode } from 'jimu-core';
export declare function findPageRelatedControllerIds(appConfig: IMAppConfig, pageId: string, browserSizeMode: BrowserSizeMode): string;
export declare function panelTransformStyle(panelJson: IMControllerPanelJson): any;
export declare function convertToStyle(panelJson: IMControllerPanelJson): import("jimu-core").SerializedStyles;
