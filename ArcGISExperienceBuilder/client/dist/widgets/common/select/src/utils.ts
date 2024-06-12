import { type ImmutableArray, type UseDataSource } from 'jimu-core'
import { type DataSourceItem, type IMConfig } from './config'

export function getConfigWithValidDataSourceItems (config: IMConfig, useDataSources: ImmutableArray<UseDataSource>): IMConfig {
  if (config) {
    // filter config.dataAttributeInfo?.dataSourceItems by useDataSourceIds
    if (!config.useMap && config.dataAttributeInfo?.dataSourceItems?.length > 0) {
      const originalDataSourceItems = config.dataAttributeInfo?.dataSourceItems
      const validDataSourceItems = getValidDataSourceItems(originalDataSourceItems, useDataSources)

      if (validDataSourceItems && validDataSourceItems !== originalDataSourceItems) {
        config = config.setIn(['dataAttributeInfo', 'dataSourceItems'], validDataSourceItems)
      }
    }
  }

  return config
}

export function getValidDataSourceItems (dataSourceItems: ImmutableArray<DataSourceItem>, useDataSources: ImmutableArray<UseDataSource>): ImmutableArray<DataSourceItem> {
  let validDataSourceItems: ImmutableArray<DataSourceItem> = dataSourceItems

  // dataSourceItems maybe null
  if (dataSourceItems && dataSourceItems.length > 0) {
    // get useDataSourceIds by useDataSources
    const useDataSourceIds: string[] = []

    if (useDataSources && useDataSources.length > 0) {
      useDataSources.forEach(imUseDataSource => {
        const dataSourceId = imUseDataSource?.dataSourceId

        if (dataSourceId) {
          useDataSourceIds.push(dataSourceId)
        }
      })
    }

    // filter dataSourceItems by useDataSourceIds
    let isNewDataSourceItemsChanged = false

    const newDataSourceItems: ImmutableArray<DataSourceItem> = dataSourceItems.filter(imDataSourceItem => {
      const useDataSource = imDataSourceItem?.useDataSource
      const dataSourceId = useDataSource?.dataSourceId
      const isValid = dataSourceId && useDataSourceIds.includes(dataSourceId)

      if (!isValid) {
        isNewDataSourceItemsChanged = true
      }

      return isValid
    })

    if (isNewDataSourceItemsChanged) {
      validDataSourceItems = newDataSourceItems
    } else {
      validDataSourceItems = dataSourceItems
    }
  }

  if (!validDataSourceItems) {
    validDataSourceItems = dataSourceItems
  }

  return validDataSourceItems
}
