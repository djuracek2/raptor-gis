import { type SerializedStyles } from '@emotion/react';
import { type IMDialogJson, type IMDialogSizeMode } from '../../types/app-config';
export declare function getGlobalStylesForFixed(dialogJson: IMDialogJson, isFixedDlgOpen: boolean, browserHeight?: any, dialogSizeMode?: IMDialogSizeMode): SerializedStyles;
export declare function getStylesForFixed(dialogSizeMode: IMDialogSizeMode): SerializedStyles;
export declare function getStylesForAnchored(dialogJson: IMDialogJson, dialogSizeMode: IMDialogSizeMode): SerializedStyles;
export declare function getResizeStyle(): SerializedStyles;
