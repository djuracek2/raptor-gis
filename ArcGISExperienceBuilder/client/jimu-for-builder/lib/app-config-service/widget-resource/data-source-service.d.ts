import { type IMAppConfig, type IMDataSourceJson } from 'jimu-core';
export declare class DataSourceService {
    removeDataSource(appConfig: IMAppConfig, dataSourceId: string): IMAppConfig;
    duplicateDataSource(appConfig: IMAppConfig, dataSourceId: string): [IMAppConfig, IMDataSourceJson];
    addDataSource(appConfig: IMAppConfig, dataSourceJson: IMDataSourceJson): IMAppConfig;
    updateAfterChangingLayout(appConfig: IMAppConfig, widgetId: string, toLayoutId: string): IMAppConfig;
    private mergeUseDataSource;
    /**
     * Remove data source which is:
     *  1. the data source to be removed, or,
     *  2. derived from the data source to be removed (data views and local data sources), or,
     *  3. descendant data source of the data source to be removed (e.g. child data source and grandchild data source), or,
     *  4. derived from the descendant data source of the data source to be removed (e.g. data views of child data source).
     */
    private shouldBeRemoved;
}
declare const _default: DataSourceService;
export default _default;
