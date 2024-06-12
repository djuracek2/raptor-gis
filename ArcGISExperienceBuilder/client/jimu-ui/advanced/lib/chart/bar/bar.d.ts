/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebChart } from '@arcgis/charts-spec';
import { type UnprivilegedChart } from '../utils';
import { type BarChartCoreProps } from './core';
export interface BarChartProps extends Omit<BarChartCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const BarChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<UnprivilegedChart>>>;
