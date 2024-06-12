import { type ImmutableObject } from 'jimu-core'
import { type basemapUtils } from 'jimu-arcgis'
export enum BasemapsType {
  Organization = 'ORGANIZATION',
  Custom = 'CUSTOM'
}

export interface Config {
  customBasemaps: basemapUtils.BasemapItem[]
  basemapsType: BasemapsType
}

export type IMConfig = ImmutableObject<Config>

export interface GroupInfo {
  id: string
  title: string
}
