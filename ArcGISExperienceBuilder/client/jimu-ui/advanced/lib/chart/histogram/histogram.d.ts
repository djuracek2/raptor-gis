/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebChart } from '@arcgis/charts-spec';
import { type UnprivilegedChart } from '../utils';
import { type HistogramCoreProps } from './core';
export interface HistogramProps extends Omit<HistogramCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const Histogram: React.MemoExoticComponent<React.ForwardRefExoticComponent<HistogramProps & React.RefAttributes<UnprivilegedChart>>>;
