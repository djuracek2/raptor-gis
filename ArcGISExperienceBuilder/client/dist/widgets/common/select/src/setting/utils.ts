import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { type IMConfig } from '../config'
import { getAppStore, type IMAppConfig, type UseDataSource } from 'jimu-core'

export type RootSettingProps = AllWidgetSettingProps<IMConfig>

export function getUseDataSourcesByConfig (config: IMConfig): UseDataSource[] {
  // tempUseDataSources maybe has repeat data sources
  const tempUseDataSources: UseDataSource[] = []

  if (config.dataAttributeInfo && config.dataAttributeInfo.dataSourceItems && config.dataAttributeInfo.dataSourceItems.length > 0) {
    config.dataAttributeInfo.dataSourceItems.forEach(item => {
      const useDataSource = item.useDataSource.asMutable() as unknown as UseDataSource
      tempUseDataSources.push(useDataSource)
    })
  }

  // Saving config.mapInfo.jimuMapViews.xx useDataSources into widgetJson.useDataSources doesn't cause performance issues
  // because JimuLayerView doesn't automatically create dataSource and Select widget only creates data sources on-demand.
  if (config.mapInfo && config.mapInfo.jimuMapViews) {
    Object.values(config.mapInfo.jimuMapViews).forEach(dataSourceItems => {
      if (dataSourceItems && dataSourceItems.length > 0) {
        dataSourceItems.forEach(item => {
          const useDataSource = item.useDataSource.asMutable() as unknown as UseDataSource
          tempUseDataSources.push(useDataSource)
        })
      }
    })
  }

  if (config.spatialSelection && config.spatialSelection.useDataSources && config.spatialSelection.useDataSources.length > 0) {
    config.spatialSelection.useDataSources.forEach(item => {
      const useDataSource = item.asMutable() as unknown as UseDataSource
      tempUseDataSources.push(useDataSource)
    })
  }

  // remove repeat data sources
  const finalDataSourceIds: string[] = []
  const finalUseDataSources: UseDataSource[] = []
  tempUseDataSources.forEach(useDataSource => {
    const dataSourceId = useDataSource.dataSourceId

    if (!finalDataSourceIds.includes(dataSourceId)) {
      finalDataSourceIds.push(dataSourceId)
      finalUseDataSources.push(useDataSource)
    }
  })

  return finalUseDataSources
}

export function getRuntimeAppConfig (): IMAppConfig {
  return window.jimuConfig.isBuilder ? getAppStore().getState().appStateInBuilder?.appConfig : getAppStore().getState().appConfig
}
