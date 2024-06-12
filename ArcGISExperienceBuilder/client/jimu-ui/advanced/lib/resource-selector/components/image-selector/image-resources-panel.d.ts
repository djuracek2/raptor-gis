/// <reference types="react" />
/** @jsx jsx */
import { React, type IMThemeVariables, ReactRedux } from 'jimu-core';
export declare const ImageResourcesPanel: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, string | number | symbol> & {
    theme?: IMThemeVariables;
}>, {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
