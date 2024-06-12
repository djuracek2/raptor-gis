import * as React from 'react';
import { type AllWidgetProps, type WidgetProps } from './types/props';
import { type IMState } from './types/state';
import { BaseVersionManager, type Version } from './version-manager';
import { type IMDataSourcesJson, type IMWidgetJson } from './types/app-config';
export interface WidgetUpgradeInfo {
    widgetJson: IMWidgetJson;
    outputDataSourceJsons?: IMDataSourcesJson;
}
export interface WidgetVersion extends Version<WidgetUpgradeInfo> {
    upgradeFullInfo?: boolean;
}
/**
 * When a widget needs to upgrade widgetJson or outputDataSourceJsons, it should extend this class.
 *
 * The versions in this VM can upgrade config only or upgrade full info (widgetJson and outputDataSourceJsons).
 * If a version can upgrade full info, it should set "upgradeFullInfo" to true.
 */
export declare class WidgetVersionManager extends BaseVersionManager<WidgetUpgradeInfo> {
    versions: WidgetVersion[];
    widgetUpgrade(oldUpgradeInfo: WidgetUpgradeInfo, oldVersion: string, newVersion: string, id: string): Promise<WidgetUpgradeInfo>;
    private runWidgetUpgrader;
}
declare class BaseWidget<P extends AllWidgetProps<unknown> = AllWidgetProps<unknown>, S = unknown> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    static versionManager?: BaseVersionManager | WidgetVersionManager;
}
export interface WidgetStaticMethods {
    mapExtraStateProps?: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    versionManager?: BaseVersionManager;
}
export type RawWidgetType = (React.ComponentClass<AllWidgetProps<any>> | React.FunctionComponent<AllWidgetProps<any>>) & WidgetStaticMethods;
export type WrappedWidgetType = (React.ComponentClass<WidgetProps> | React.FunctionComponent<WidgetProps>) & WidgetStaticMethods;
export default BaseWidget;
