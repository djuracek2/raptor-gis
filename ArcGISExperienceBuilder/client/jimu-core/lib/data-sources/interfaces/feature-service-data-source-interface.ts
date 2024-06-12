import { type AbstractArcGISLayerFolderDataSource, type DataSourceTypes } from './common-data-source-interface'

/**
 * `FeatureServiceDataSource` is created from feature service.
 */
export interface FeatureServiceDataSource extends AbstractArcGISLayerFolderDataSource {
  type: DataSourceTypes.FeatureService

  /**
   * When add a FeatuerService into a webmap, the MapViewer does not create FeatuerService layer, instead it'll create multiple FeatureLayers.
   * So, the `FeatureServiceDataSource` does not have `layer` property.
   */
}
