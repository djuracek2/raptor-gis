/// <reference types="react" />
/** @jsx jsx */
import { React, type LayoutItemConstructorProps, type IMThemeVariables } from 'jimu-core';
import { type Placement } from 'jimu-ui';
import { type SerializedStyles } from 'jimu-theme';
export interface WidgetListPopperProps {
    referenceElement: HTMLElement;
    isPlaceholder?: boolean;
    isAccepted: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onSelect: (item: LayoutItemConstructorProps) => void;
    onClose: (evt?: React.MouseEvent<any>) => void;
    placement?: Placement;
    css?: SerializedStyles;
}
export declare const WidgetListPopper: React.ForwardRefExoticComponent<Pick<Omit<WidgetListPopperProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, "forwardedRef" | keyof WidgetListPopperProps> & {
    theme?: IMThemeVariables;
}>;
