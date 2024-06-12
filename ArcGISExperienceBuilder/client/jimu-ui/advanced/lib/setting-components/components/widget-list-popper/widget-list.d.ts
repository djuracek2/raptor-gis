/// <reference types="react" />
/** @jsx jsx */
import { React, type LayoutItemConstructorProps, type IMThemeVariables } from 'jimu-core';
export interface WidgetListProps {
    isPlaceholder?: boolean;
    isAccepted: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onSelect: (item: LayoutItemConstructorProps) => void;
    onWidgetLoaded?: () => void;
    theme: IMThemeVariables;
}
export declare const WidgetList: React.FC<import("react-intl").WithIntlProps<WidgetListProps>> & {
    WrappedComponent: React.ComponentType<WidgetListProps>;
};
