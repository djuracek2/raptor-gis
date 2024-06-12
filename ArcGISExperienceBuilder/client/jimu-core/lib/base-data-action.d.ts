import type React from 'react';
import { type IntlShape } from 'react-intl';
import { type DataRecordSet } from './data-sources/interfaces';
import type { IconResult } from './types/app-config';
export interface DataActionConstructorOptions {
    id: string;
    name?: string;
    label?: string;
    icon?: string;
    index?: number;
    widgetId?: string;
    intl: IntlShape;
}
export interface RegisterDataActionOptions {
    id: string;
    name?: string;
    uri?: string;
    icon?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummnyDataAction;
}
export interface DataActionSettingProps<T> {
    widgetId: string;
    actionName: string;
    config?: T;
    intl?: IntlShape;
    onSettingChange: (config: T) => void;
}
export declare enum DataLevel {
    DataSource = "DATA_SOURCE",
    Records = "RECORDS"
}
/**
 * A data action is a piece code that can process data. It can process the whole data source, or some data records, or both of them, this is decided by the `isSupported` method.
 *
 * A data action can receive multiple data sets, but the data action can decide whether it supports multiple data sets or not.
 *
 * The `isSupported` method is invoked first to test whether the data action can process the provided data.
 * The `onExecute` method will be invoked when an user click the action menu.
 * Both of these two methods are passed in the `DataRecordSet` and `DataLevel` parameters, the widget that uses the data action decides how to pass in `DataRecordSet`,
 * and the action can decide how to process the data.
 *
 * Widgets should use the `DataActionList` component to use the data actions.
 *
 * Although the data action can be very flexible, for consistent UX, these guide should be followed:
 * * For widgets that use data actions:
 *    * Set the correct `DataRecordSet.type` and the records, more specifically, pass in the selected records, loaded records or the current record.
 * * For data actions:
 *    * For `Records` level data action:
 *      * Use the passed in `records`, the records are always not empty.
 *    * For `DataSource` level data action:
 *      * Always process the whole data despite of the passed in records.
 */
export interface DataAction {
    /**
     * the unique id
     */
    id: string;
    index?: number;
    name?: string;
    label?: string;
    icon?: IconResult | string;
    /**
     * The widget id that provides the action.  No widget id means the actions is provide by jimu.
     */
    widgetId?: string;
    intl: IntlShape;
    destroy: () => void;
    /**
     * Will be invoked to determine whether the data action can process the data.
     *
     * @param dataSets The data sets that will be processed.
     * @param dataLevel The data level that will be processed.
     * @param widgetId The widget id that use the data actions.
     */
    isSupported: (dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string) => Promise<boolean>;
    /**
     * This is the action logic.
     *
     * @param dataSets The data sets that will be processed.
     * @param dataLevel The data level that will be processed.
     * @param widgetId The widget id that use the data actions.
     */
    onExecute: (dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string, actionConfig?: any) => Promise<boolean | React.ReactElement>;
}
export declare abstract class AbstractDataAction implements DataAction {
    /**
     * The unique id
     */
    id: string;
    name: string;
    label: string;
    index: number;
    intl: IntlShape;
    /**
     * The widget id that provides the action
     */
    widgetId: string;
    icon?: IconResult | string;
    constructor(options: DataActionConstructorOptions);
    destroy(): void;
    getLabel(dataSet: DataRecordSet): string;
    abstract isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string): Promise<boolean>;
    abstract onExecute(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string, actionConfig?: any): Promise<boolean | React.ReactElement>;
}
export declare class DummnyDataAction extends AbstractDataAction {
    isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string): Promise<boolean>;
    onExecute(dataSets: DataRecordSet[], dataLevel: DataLevel, widgetId: string): Promise<boolean | React.ReactElement>;
}
