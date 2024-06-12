import { AbstractDataAction, type DataLevel, type DataRecordSet, MutableStoreManager, dataSourceUtils } from 'jimu-core'
import { type ReactElement, type JSXElementConstructor } from 'react'
import { isSupported } from './utils'

export default class DirectionsFrom extends AbstractDataAction {
  async isSupported (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean> {
    return isSupported.bind(this)(dataSets, dataLevel)
  }

  async onExecute (dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean | ReactElement<any, string | JSXElementConstructor<any>>> {
    const feature = await dataSourceUtils.changeToJSAPIGraphic((dataSets[0].records[0] as any)?.feature)
    const directionsFromPoint = feature.geometry
    MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'directionsFromPoint', directionsFromPoint)
    return true
  }
}
