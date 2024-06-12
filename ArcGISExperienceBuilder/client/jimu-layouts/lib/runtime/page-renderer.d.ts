/// <reference types="react" />
/** @jsx jsx */
import { React, type ImmutableObject, ReactRedux, type IMThemeVariables } from 'jimu-core';
declare const _default: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}>, {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
    dialogId?: string;
    pageStatus: ImmutableObject<{
        [pageId: string]: boolean;
    }>;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
