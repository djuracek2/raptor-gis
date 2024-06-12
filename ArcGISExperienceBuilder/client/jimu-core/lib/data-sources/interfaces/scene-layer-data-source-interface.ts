import { type GeometryType, type IFeature, type IPopupInfo, type ILayerDefinition } from '@esri/arcgis-rest-types'
import { type IMDataSourceSchema } from 'jimu-core'

import { type QueriableDataSource, type JSAPILayerMixin, type ItemMixin, type DataSourceTypes, type DataRecord, type QueryOptions, type QueryResult, type GetCurrentQueryParamsOptions, type CodedValue, type QueryProgressCallback, type TimezoneRuntime } from './common-data-source-interface'
import { type FeatureLayerDataSource, type FeatureDataRecord, type FeatureLayerQueryParams, type FeatureLayerSelectOptions, type FeatureLayerCapabilities, type FeatureLayerUsedFieldsOptions } from './feature-layer-data-source-interface'

/**
 * `SceneLayerDataSource` is created from a single scene layer of scene service or webscene.
 */
export interface SceneLayerDataSource extends QueriableDataSource, JSAPILayerMixin, ItemMixin {
  type: DataSourceTypes.SceneLayer
  layer?: __esri.SceneLayer
  url: string
  portalUrl?: string
  itemId?: string
  layerId?: string
  createJSAPILayerByDataSource: () => Promise<__esri.SceneLayer>
  getAssociatedDataSource: () => FeatureLayerDataSource
  setLayerDefinition: (layerDefinition: ILayerDefinition) => void
  getLayerDefinition: () => ILayerDefinition
  setPopupInfo: (popupInfo: IPopupInfo) => void
  getPopupInfo: () => IPopupInfo
  /** @ignore */
  getCapabilities: () => FeatureLayerCapabilities
  /** Return the current GDB version. */
  getGDBVersion: () => string
  /** Change the layer GDB version. */
  changeGDBVersion: (gdbVersion: string) => void
  supportSymbol: () => boolean
  supportAttachment: () => boolean
  // #region Overrides for parent interface
  load: (query: FeatureLayerQueryParams, options?: QueryOptions) => Promise<DataRecord[]>
  loadCount: (query: FeatureLayerQueryParams, options?: QueryOptions) => Promise<number>
  query: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>
  queryCount: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>
  queryById: (id: string) => Promise<FeatureDataRecord>
  selectRecords: (options: FeatureLayerSelectOptions, signal?: AbortSignal, progressCallback?: QueryProgressCallback) => Promise<QueryResult>
  selectRecordById: (id: string, record?: FeatureDataRecord) => void
  selectRecordsByIds: (ids: string[], records?: FeatureDataRecord[]) => void
  getIdField: () => string
  getGeometryType: () => GeometryType
  getConfigQueryParams: () => FeatureLayerQueryParams
  mergeQueryParams: (...queries: FeatureLayerQueryParams[]) => FeatureLayerQueryParams
  getRealQueryParams: (query, flag: 'query' | 'load', options?: QueryOptions) => FeatureLayerQueryParams
  getCurrentQueryParams: (options?: GetCurrentQueryParamsOptions) => FeatureLayerQueryParams
  getAllUsedFields: (options?: FeatureLayerUsedFieldsOptions) => string[] | '*'
  fetchSchema: () => Promise<IMDataSourceSchema>
  getFieldCodedValueList: (jimuFieldName: string, record?: FeatureDataRecord) => CodedValue[]
  buildRecord: (feature: IFeature | __esri.Graphic) => FeatureDataRecord
  getDataViews: () => SceneLayerDataSource[]
  getDataView: (dataViewId: string) => SceneLayerDataSource
  getMainDataSource: () => SceneLayerDataSource
  getTimezone: () => TimezoneRuntime
  // #endregion
}
