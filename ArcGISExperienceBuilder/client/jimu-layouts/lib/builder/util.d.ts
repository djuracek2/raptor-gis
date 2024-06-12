import { type LayoutInfo, type LayoutItemConstructorProps } from 'jimu-core';
export declare function canDropAtPlaceholder(draggingItem: LayoutItemConstructorProps): boolean;
export declare function dropAtPlaceholder(placeholderLayoutInfo: LayoutInfo, draggingItem: LayoutItemConstructorProps): void;
export declare function addSectionInPlaceholder(placeholderLayoutInfo: LayoutInfo): void;
export declare function addWidgetInPlaceholder(placeholderLayoutInfo: LayoutInfo, draggingItem: LayoutItemConstructorProps): Promise<void>;
