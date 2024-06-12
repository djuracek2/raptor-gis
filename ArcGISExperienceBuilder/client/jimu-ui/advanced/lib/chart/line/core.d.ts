/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface LineChartCoreProps extends Partial<HTMLArcgisChartsLineChartElement>, ChartComponentEventCallbacks {
}
export declare const LineChartCore: React.ForwardRefExoticComponent<LineChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
