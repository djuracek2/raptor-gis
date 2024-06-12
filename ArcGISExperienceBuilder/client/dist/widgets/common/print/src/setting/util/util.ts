import { Immutable, DataSourceManager, type IMDataSourceJson, type FeatureLayerDataSource } from 'jimu-core'
import { type PrintTemplateProperties, type PrintServiceType, type PrintTemplateType, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT, LayoutTypes, type LayoutInfo } from '../../config'
import { getTemplateType, checkIsMapOnly } from '../../utils/utils'

/**
 * Get new template id
*/
export const getNewTemplateId = (printTemplate: PrintTemplateProperties[], printServiceType: PrintServiceType, printTemplateType: PrintTemplateType): string => {
  const templateIdList = printTemplate.map(template => template.templateId)
  const configType = getTemplateType(printServiceType, printTemplateType)
  if (!templateIdList || templateIdList?.length === 0) return `config_${configType}_0`
  const maxIndex = getTemplateIndexMaxNumber(templateIdList)
  return `config_${configType}_${maxIndex + 1}`
}

const getTemplateIndexMaxNumber = (configIdList: string[]) => {
  const idIndexData = configIdList?.map(id => {
    const currentIndex = id?.split('_')?.pop()
    return currentIndex ? Number(currentIndex) : 0
  })
  return idIndexData?.sort((a, b) => b - a)?.[0]
}

export function checkIsOutlineSizeAvailable (value: string): boolean {
  const size = value?.split('px')[0]
  if (!value || !size) return false
  return Number(size) >= 0
}

export const getNewLayoutTemplateByLayoutName = (preTemplate: PrintTemplateProperties, layoutTemplate: string, layoutChoiceList: LayoutInfo[]): PrintTemplateProperties => {
  const layout = layoutChoiceList?.filter(item => item?.layout === layoutTemplate)?.[0]

  let newTemplate = {
    ...preTemplate,
    ...layout,
    layoutTypes: LayoutTypes.ServiceLayout
  } as PrintTemplateProperties

  const isMapOnly = checkIsMapOnly(layout?.layout)
  if (isMapOnly) {
    newTemplate = Immutable(newTemplate).setIn(['exportOptions', 'width'], DEFAULT_MAP_WIDTH).setIn(['exportOptions', 'height'], DEFAULT_MAP_HEIGHT)?.asMutable({ deep: true })
  }

  return newTemplate
}

export function initTemplateChoiceList (templateChoiceList: any[], isAddNoneItem: boolean): any[] {
  if (isAddNoneItem) {
    const noneItemOption = {
      reportTemplate: 'None'
    }
    templateChoiceList.unshift(noneItemOption)
  }
  return templateChoiceList
}

export function getWhetherIsTable (dsJson: IMDataSourceJson): boolean {
  if (!dsJson) {
    return false
  }
  const ds = DataSourceManager.getInstance().getDataSource(dsJson.id)
  const isTable = ds && (ds as FeatureLayerDataSource).supportSpatialInfo && !(ds as FeatureLayerDataSource).supportSpatialInfo()

  return isTable
}
