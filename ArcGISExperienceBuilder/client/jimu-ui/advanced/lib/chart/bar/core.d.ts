/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface BarChartCoreProps extends Partial<HTMLArcgisChartsBarChartElement>, ChartComponentEventCallbacks {
}
export declare const BarChartCore: React.ForwardRefExoticComponent<BarChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
