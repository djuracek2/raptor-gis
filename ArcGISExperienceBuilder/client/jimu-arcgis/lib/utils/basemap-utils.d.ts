export declare function getOrgBasemaps(): Promise<__esri.Basemap[]>;
export interface BasemapItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    type: string;
}
export declare function getBasemapGroup(portal: __esri.Portal, portalSelf: __esri.Portal['sourceJSON'], isByEsriDefault?: boolean): Promise<__esri.PortalGroup>;
export declare function getBasemapItemsByGroupId(portal: __esri.Portal, portalUrl: string, groupId: string): Promise<BasemapItem[]>;
export declare const getLoadedBasemapList: (Basemap: typeof __esri.Basemap, basemapItems: BasemapItem[]) => Promise<__esri.Basemap[]>;
