import { type ImmutableObject, type IMState, type extensionSpec } from 'jimu-core';
import { type ResourceItemInfo } from './app-resource-manager';
type IMResourcesInfo = ImmutableObject<{
    [resourceKey: string]: ImmutableObject<ResourceItemInfo>;
}>;
declare module 'jimu-core/lib/types/state' {
    interface State {
        resourcesInfo?: IMResourcesInfo;
    }
}
declare module 'jimu-core' {
    interface State {
        resourcesInfo?: IMResourcesInfo;
    }
}
declare enum ActionKeys {
    AddResource = "ADD_RESOURCE",
    UpdateResource = "UPDATE_RESOURCE",
    ClearResources = "CLEAR_RESOURCES"
}
export interface AddResourceAction {
    type: ActionKeys.AddResource;
    resourceKey: string;
    resourceItemInfo: ResourceItemInfo;
}
export interface UpdateResourceAction {
    type: ActionKeys.UpdateResource;
    resourceKey: string;
    resourceItemInfo: ResourceItemInfo;
}
export interface ClearResourcesAction {
    type: ActionKeys.ClearResources;
}
type ActionTypes = AddResourceAction | UpdateResourceAction | ClearResourcesAction;
declare const actions: {
    AddResource: (resourceKey: string, resourceItemInfo: ResourceItemInfo) => AddResourceAction;
    UpdateResource: (resourceKey: string, resourceItemInfo: ResourceItemInfo) => UpdateResourceAction;
    ClearResources: () => ClearResourcesAction;
};
export { actions as builderStateResourceActions, ActionKeys as BuilderStateResourceActionKeys };
export default class BuilderStateResourceExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): IMResourcesInfo;
    getReducer(): (resourcesInfo: IMResourcesInfo, action: ActionTypes, builderFullState: IMState) => any;
    getStoreKey(): string;
}
