import * as React from 'react';
import { type History } from 'history';
import { type IMUrlHashParameters, type UrlParameters } from './types/url-parameters';
import type { Location } from './types/common';
import { type SectionNavInfo } from './types/state';
import { type FeatureLayerSelectOptions as DataSourceSelectOptions } from './data-sources/interfaces';
export declare const browserHistory: import("history").BrowserHistory;
export declare const HistoryContext: React.Context<import("history").BrowserHistory>;
export declare const HistoryProvider: (props: any) => React.JSX.Element;
export declare function withHistory<T extends React.ComponentClass<any, any>>(Component: any): T;
/**
 * Change the query url using queryObject, only the passed in params will be updated.
 *  * To replace all query params, set `replaceQueryObject=true`
 *  * To remove a query param, set the param as null
 * @param queryObject can be partial of query object
 * @param replace replace the browser history
 * @param replaceQueryObject replace the queryObject instead of merge
 */
export declare function changeQueryObject(queryObject: UrlParameters, replaceHistory?: boolean, replaceQueryObject?: boolean): void;
export declare function changeUrlHashObject(urlHashParametersObject: IMUrlHashParameters, options?: {
    replaceHistory?: boolean;
    isReplaceHashObject?: boolean;
}): void;
export declare function changePage(pageId: string): void;
export declare function changeView(sectionId: string, viewId: string): void;
export declare function changeViewBySectionNavInfo(sectionId: string, navInfo: SectionNavInfo): void;
export declare function changeDialog(dialogId: string): void;
export declare function changeHashObjectByDataSourceSelection(dsId: string, selectOptions: DataSourceSelectOptions): void;
export declare function changeQueryObjectByDataSourceGDBVersion(dsId: string, gdbVersion: string): void;
export type { History, Location };
