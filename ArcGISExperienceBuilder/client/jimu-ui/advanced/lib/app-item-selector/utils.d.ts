interface SearchOption {
    searchText: string;
    portalUrl: string;
    num?: number;
    start?: number;
    sortField?: string;
    sortOrder?: string;
    searchItemtype?: string;
    excludeType?: string;
    authentication?: any;
}
export declare function searchItemByPortalUrl(option: SearchOption): Promise<import("@esri/arcgis-rest-portal").ISearchResult<import("jimu-for-builder/service").AppInfo>>;
export declare function intersectionObserver(ref: HTMLElement, rootElement: HTMLElement, onChange?: (isIn: boolean) => void, options?: IntersectionObserverInit): IntersectionObserver;
export {};
