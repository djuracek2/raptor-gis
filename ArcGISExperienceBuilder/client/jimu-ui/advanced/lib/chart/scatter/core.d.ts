/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface ScatterPlotCoreProps extends Partial<HTMLArcgisChartsScatterPlotElement>, ChartComponentEventCallbacks {
}
export declare const ScatterPlotCore: React.ForwardRefExoticComponent<ScatterPlotCoreProps & React.RefAttributes<UnprivilegedChart>>;
