/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface PieChartCoreProps extends Partial<HTMLArcgisChartsPieChartElement>, ChartComponentEventCallbacks {
}
export declare const PieChartCore: React.ForwardRefExoticComponent<PieChartCoreProps & React.RefAttributes<UnprivilegedChart>>;
