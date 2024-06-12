import { type ServiceDefinition } from 'jimu-core';
import { type FeatureLayerCapabilities, type FeatureLayerQueryCapabilities } from '../interfaces';
import { CapabilitiesImpl, type CapabilitiesConstructorOptions } from './capabilities-impl';
export interface FeatureLayerCapabilitiesConstructorOptions extends CapabilitiesConstructorOptions {
    layerDefinition: ServiceDefinition;
    isClientSide: boolean;
}
export declare class FeatureLayerCapabilitiesImpl extends CapabilitiesImpl implements FeatureLayerCapabilities {
    private readonly layerDefinition;
    private readonly isClientSide;
    getQueryCapabilities(): FeatureLayerQueryCapabilities;
}
