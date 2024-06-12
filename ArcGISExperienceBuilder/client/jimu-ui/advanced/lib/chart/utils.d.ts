/// <reference types="react" />
import { React, type IMThemeVariables } from 'jimu-core';
import { type WebMapWebChart, type CalculatedMinMaxBoundsPayload, type LegendItemVisibility, type WebChartDataTypes, type ActionModes, type SelectionData, type ValidationStatus, type ChartTypes, type NotifyOptions } from 'arcgis-charts';
type TraverseConvertColorInentifier = string | ((key: string) => boolean);
/**
 * Traverses and converts all string colors to symbol colors.
 * @param input
 * @param theme
 *
 * [symbol color](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-Symbol.html#color)
 */
export declare const traverseConvertColor: <T>(input: T, theme: IMThemeVariables, identifier?: TraverseConvertColorInentifier) => T;
export declare const traverseConvertWebChartColor: (input: WebMapWebChart, theme: IMThemeVariables) => WebMapWebChart;
export declare const traverseConvertSymbolColor: <T>(input: T, theme: IMThemeVariables) => T;
type TraverseCallbackHandle = (key: string, value: any) => any;
/**
 * Traverse an object and execute a callback function on the [primitive] value
 * @param input
 * @param callback
 * @param key
 * @returns input
 */
export declare const traverse: (input: any, callback: TraverseCallbackHandle, key?: string) => any;
declare const ComponentEvents: {
    readonly DataProcessComplete: 'arcgisChartsDataProcessComplete';
    readonly DataProcessError: 'arcgisChartsDataProcessError';
    readonly LegendItemVisibilityChange: 'arcgisChartsLegendItemVisibilityChange';
    readonly UpdateComplete: 'arcgisChartsUpdateComplete';
    readonly SeriesColorChange: 'arcgisChartsSeriesColorChange';
    readonly AxesMinMaxChange: 'arcgisChartsAxesMinMaxChange';
    readonly DefaultActionSelect: 'arcgisChartsDefaultActionSelect';
    readonly SelectionComplete: 'arcgisChartsSelectionComplete';
    readonly ActionBarToggle: 'arcgisChartsActionBarToggle';
    readonly NoRenderPropChange: 'arcgisChartsNoRenderPropChange';
};
export interface ChartComponentEventCallbacks {
    [ComponentEvents.DataProcessComplete]?: (event: CustomEventInit<WebChartDataTypes>) => void;
    [ComponentEvents.DataProcessError]?: (event: CustomEventInit<WebChartDataTypes>) => void;
    [ComponentEvents.LegendItemVisibilityChange]?: (event: CustomEventInit<LegendItemVisibility>) => void;
    [ComponentEvents.UpdateComplete]?: (event: CustomEventInit<ValidationStatus>) => void;
    [ComponentEvents.SeriesColorChange]?: (event: CustomEventInit) => void;
    [ComponentEvents.AxesMinMaxChange]?: (event: CustomEventInit<CalculatedMinMaxBoundsPayload[]>) => void;
    [ComponentEvents.DefaultActionSelect]?: (event: CustomEventInit) => void;
    [ComponentEvents.SelectionComplete]?: (event: CustomEventInit<SelectionData>) => void;
    [ComponentEvents.ActionBarToggle]?: (event: CustomEventInit) => void;
    [ComponentEvents.NoRenderPropChange]?: (event: CustomEventInit) => void;
}
/**
 * Normalize the chart object.
 * @param input
 */
export declare const useNormalizedChartObject: <T>(input: any) => T;
export declare const useRegisterEvent: (nodeRef: any, eventName: string, callback: (event: CustomEventInit) => void) => void;
export interface UnprivilegedChart {
    /**
     * Resets the chart zoom to bring it back to full extent
     * @category Public
     */
    resetZoom: () => Promise<void>;
    /**
     * Clears all selection on the chart.
     * @category Public
     */
    clearSelection: () => Promise<void>;
    /**
     * Switches the selection on the chart.
     * @category Public
     */
    switchSelection: () => Promise<void>;
    /**
     * Notify method allows passing external messages to the chart component. It can be used to pass validation or information messages. In a situation where a config update is overriding your notification modal, consider waiting for the `arcgisChartsUpdateComplete` event.
     * @category Public
     */
    notify: (message?: string | undefined, heading?: string | undefined, options?: NotifyOptions | undefined) => Promise<void>;
    /**
     * Switches the `actionMode` on the chart.
     */
    setActionMode: (actionMode?: ActionModes) => void;
    /**
     * Re-render the chart.
     * @param updateData Indicates whether to fetch new data. Default: true.
     * @param resetAxesBounds Option to reset the axes bounds along with the refresh.
    */
    refresh: (updateData?: boolean, resetAxesBounds?: boolean) => Promise<void>;
}
/**
 * Returns an weaker, unprivileged proxy object that only exposes methods of chart element.
 * @param chart
 * @returns {UnprivilegedChart}
 */
export declare const makeUnprivilegedChart: (chart: any) => UnprivilegedChart;
export declare const useForkChartRef: <T>(ref: React.MutableRefObject<T>, chartRef: React.Ref<UnprivilegedChart>) => (element: any) => void;
export declare const useChartComponentDefined: (chartType: ChartTypes) => boolean;
export {};
