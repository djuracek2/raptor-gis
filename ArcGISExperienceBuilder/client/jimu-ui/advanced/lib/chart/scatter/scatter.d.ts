/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebChart } from '@arcgis/charts-spec';
import { type UnprivilegedChart } from '../utils';
import { type ScatterPlotCoreProps } from './core';
export interface ScatterPlotProps extends Omit<ScatterPlotCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const ScatterPlot: React.MemoExoticComponent<React.ForwardRefExoticComponent<ScatterPlotProps & React.RefAttributes<UnprivilegedChart>>>;
