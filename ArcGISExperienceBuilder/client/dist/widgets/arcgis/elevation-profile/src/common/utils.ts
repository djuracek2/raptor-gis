import { type JimuMapView } from 'jimu-arcgis'
import { type DataSource, DataSourceManager } from 'jimu-core'

export function getAllLayersFromDataSource (dataSource: string): DataSource[] {
  const dsManager = DataSourceManager.getInstance()
  const dataSources = dsManager?.getDataSource(dataSource)?.getChildDataSources()
  const allLayerSources: DataSource[] = []
  dataSources?.forEach((layer) => {
    if (layer.type === 'GROUP_LAYER') {
      const subLayers = layer.getChildDataSources()
      if (subLayers) {
        subLayers.forEach(subLayer => {
          allLayerSources.push(subLayer)
        })
      }
    } else {
      allLayerSources.push(layer)
    }
  })
  return allLayerSources
}

export function defaultSelectedUnits (activeDsConfig, portalSelf): [string, string] {
  //get the configured units
  let configuredElevationUnit = activeDsConfig?.profileChartSettings.elevationUnit
  let configuredLinearUnit = activeDsConfig?.profileChartSettings.linearUnit
  //if configured units are empty set the units based on portal units
  if (!activeDsConfig?.profileChartSettings.elevationUnit) {
    if (portalSelf?.units === 'english') {
      configuredElevationUnit = 'feet'
    } else {
      configuredElevationUnit = 'meters'
    }
  }

  if (!activeDsConfig?.profileChartSettings.linearUnit) {
    if (portalSelf?.units === 'english') {
      configuredLinearUnit = 'miles'
    } else {
      configuredLinearUnit = 'kilometers'
    }
  }
  return [configuredElevationUnit, configuredLinearUnit]
}

export function getRandomHexColor (): string {
  const randomHexColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  return '#' + randomHexColor
}

//Specifies unit wise buffer limits
const enum UnitWiseMaxDistance {
  Feet = 5280000,
  Miles = 1000,
  Kilometers = 1609.344,
  Meters = 1609344,
  Yards = 1760000
}

/**
 * Limits a buffer distance.
 * @param unit Measurement units, e.g., feet, miles, meters
 * @returns The max value for the selected unit,
 */

export const getMaxBufferLimit = (unit: string): number => {
  switch (unit) {
    case 'feet':
      return UnitWiseMaxDistance.Feet
    case 'miles':
      return UnitWiseMaxDistance.Miles
    case 'kilometers':
      return UnitWiseMaxDistance.Kilometers
    case 'meters':
      return UnitWiseMaxDistance.Meters
    case 'yards':
      return UnitWiseMaxDistance.Yards
    default:
      return 1000
  }
}

/**
 * Limits the distance to max of the selected unit
 * @param distance Distance subject to limit
 * @param unit Measurement units, e.g., feet, miles, meters
 * @return `distance` capped at the maximum for the `unit` type
 */

export const validateMaxBufferDistance = (distance: number, unit: string): number => {
  const maxDistanceForUnit = getMaxBufferLimit(unit)
  if (distance > maxDistanceForUnit) {
    return maxDistanceForUnit
  }
  return distance
}

/**
 * wait for all the jimu layers and dataSource loaded
 * @param mapView selected map view
 * @returns child datasources
 */
export const waitForChildDataSourcesReady = async (mapView: JimuMapView): Promise<DataSource> => {
  await mapView?.whenAllJimuLayerViewLoaded()
  const ds = DataSourceManager.getInstance().getDataSource(mapView?.dataSourceId)
  if (ds?.isDataSourceSet && !ds.areChildDataSourcesCreated()) {
    return ds.childDataSourcesReady().then(() => ds).catch(err => ds)
  }
  return Promise.resolve(ds)
}

/**
 * Get the portalSelf linear units
 * @param portalSelf The response of the portalself call
 * @returns portal self linearUnit
 */
export const getPortalSelfLinearUnits = (portalSelf): string => {
  return portalSelf?.units === 'english' ? 'miles' : 'kilometers'
}

/**
 * Get the portalSelf elevation units
 * @param portalSelf The response of the portalself call
 * @returns portal self elevationUnit
 */
export const getPortalSelfElevationUnits = (portalSelf): string => {
  return portalSelf?.units === 'english' ? 'feet' : 'meters'
}
