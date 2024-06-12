/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebChart } from '@arcgis/charts-spec';
import { type UnprivilegedChart } from '../utils';
import { type LineChartCoreProps } from './core';
export interface LineChartProps extends Omit<LineChartCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const LineChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<UnprivilegedChart>>>;
