/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface HistogramCoreProps extends Partial<HTMLArcgisChartsHistogramElement>, ChartComponentEventCallbacks {
}
export declare const HistogramCore: React.ForwardRefExoticComponent<HistogramCoreProps & React.RefAttributes<UnprivilegedChart>>;
