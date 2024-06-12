/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebChart } from '@arcgis/charts-spec';
import { type UnprivilegedChart } from '../utils';
import { type PieChartCoreProps } from './core';
export interface PieChartProps extends Omit<PieChartCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const PieChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<UnprivilegedChart>>>;
