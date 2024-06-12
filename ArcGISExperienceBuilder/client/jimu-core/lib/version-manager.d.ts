import { type AppConfig } from './types/app-config';
export interface Version<T = any> {
    version: string;
    description: string;
    /**
     * @param id this can be a widgetId, an actionConfig Id, or "app"
     */
    upgrader: (oldConfig: T, id: string) => T | Promise<T>;
}
export declare class BaseVersionManager<T = any> {
    /**
     * versions in the array should be in order, otherwise, error will be reported.
     *
     * If there is no config change, we do not need to put the version in this array
     */
    versions: Array<Version<T>>;
    /**
     * @param oldConfig the config is the old version
     * @param oldVersion
     * @param newVersion
     * @param id this can be a widgetId, an actionConfig Id, or "app"
     *
     * we need to run the upgrader function in (oldVersion, newVersion], which means does not run the upgrader of the oldVersion, but run the upgrader of the newVersion
     *
     * @returns return new upgraded config
     */
    upgrade(oldConfig: T, oldVersion: string, newVersion: string, id: string): Promise<T>;
    protected checkVersions(oldVersion: string, newVersion: string): boolean | [number, number];
    protected getVersionIndex(version: string): number;
    private checkVersion;
}
export declare class AppVersionManager extends BaseVersionManager<AppConfig> {
    versions: {
        version: string;
        description: string;
        upgrader: (oldConfig: AppConfig) => any;
    }[];
}
