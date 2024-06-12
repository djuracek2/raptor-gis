import { type Store } from 'redux';
import { type UrlWidgetSpecificParams, type UrlParameters, type UrlHashParameters, type IMUrlHashParameters } from './types/url-parameters';
import { type IMState } from './types/state';
import * as appActions from './app-actions';
import { type FeatureLayerSelectOptions as DataSourceSelectOptions } from './data-sources/interfaces';
/**
 * The `UrlManager` is used to manage url parameters.
 * TODO
 */
export declare class UrlManager {
    QUERY_PARAMS_WITH_MULTI_LVL: string[];
    static instance: UrlManager;
    static getInstance(): UrlManager;
    init(store: Store<IMState>): {
        queryObject: UrlParameters;
        urlHashObject: UrlHashParameters;
    };
    getQueryObject(): UrlParameters;
    updateQueryObject(queryObject: UrlParameters): appActions.QueryObjectChangedAction;
    getHashObject(): IMUrlHashParameters;
    setWidgetUrlParams(widgetId: string, hashParameters: UrlWidgetSpecificParams, options?: {
        isReplaceHashObject?: boolean;
    }): void;
    private setHashObject;
    changeHashObjectByDataSourceSelection(dsId: string, selectOptions: DataSourceSelectOptions): boolean;
    private compatibleParseOldUrlRule;
    private _decodeAllIn1stLvl;
}
/** @ignore */
export default UrlManager;
