/// <reference types="react" />
import { type ImmutableObject, type UrlParameters, type IMUser, type IntlShape, type IMThemeVariables, type IMLayoutItemJson, type LayoutInfo, type BoundingBox, type DataSourceJson, type IMWidgetJson, type WidgetJson } from 'jimu-core';
/** The widget setting component props */
export type AllWidgetSettingProps<T> = WidgetSettingProps & WidgetSettingInjectedProps<T>;
/**
 * The `onSettingChange` callback function.
 *
 * Updated setting values can be passed in the first parameter (`widgetJson`) as an object. Only changed properties need to be included.
 * To delete an existing property, set it to `null`.
 * If the widget generates an output data source, include it as the second parameter (optional).
 *
 */
export type SettingChangeFunction = (widgetJson: Partial<WidgetJson>, outputDataSourcesJson?: DataSourceJson[]) => void;
/** The widget setting props. Included in AllWidgetSettingProps. */
export interface WidgetSettingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    widgetId: string;
    /**
     *
     * When a setting is changed via user input, call this function to save that changed value into the widget configuration.
     */
    onSettingChange: SettingChangeFunction;
}
/** @ignore */
export interface WidgetItemSettingProps {
    layout: IMLayoutItemJson;
    onSettingChange: (layoutInfo: LayoutInfo, setting: any) => void;
    onPosChange: (layoutInfo: LayoutInfo, bbox: BoundingBox) => void;
}
/** The widget setting component props injected by framework. Included in AllWidgetProps. */
export type WidgetSettingInjectedProps<T> = Omit<IMWidgetJson, 'config'> & {
    dispatch: any;
    queryObject: ImmutableObject<UrlParameters>;
    config: T;
    locale: string;
    appI18nMessages: any;
    intl: IntlShape;
    token?: string;
    user?: IMUser;
    theme: IMThemeVariables;
    theme2: IMThemeVariables;
    portalUrl?: string;
    portalSelf?: any;
};
