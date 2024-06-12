/** @jsx jsx */
import {
  React,
  jsx,
  css,
  type ImmutableArray,
  DataSourceManager
} from 'jimu-core'
import { arraysEqual } from '../../utils/utils'
import { DataSourceTypes } from 'jimu-arcgis'
import { Icon } from 'jimu-ui'
interface SwipeBetweenMapsPanelProps {
  mapUseDataSourcesOrderList: ImmutableArray<string>
  mapUseDataSources: ImmutableArray<string>
}

export function SwipeBetweenMapsPanel (props: SwipeBetweenMapsPanelProps) {
  const { mapUseDataSourcesOrderList, mapUseDataSources } = props

  //If items in useDataSources of a map widget is the same as the in mapUseDataSourcesOrderList but they may be in different order, use mapUseDataSourcesOrderList. If they are not the same, use useDataSources of a map widget(May be a map view is added or deleted from a map widget while swipe is on).
  const mapViewList = arraysEqual(mapUseDataSources, mapUseDataSourcesOrderList) ? mapUseDataSourcesOrderList : mapUseDataSources

  //Get the name of the data source.
  const getDataSourceLabel = (dataSourceId: string): string => {
    if (!dataSourceId) {
      return ''
    }
    const dsObj = DataSourceManager.getInstance().getDataSource(dataSourceId)
    const label = dsObj?.getLabel()
    return label || dsObj?.getDataSourceJson().sourceLabel || dataSourceId
  }

  const getIcon = (dsId) => {
    const isWebmap = DataSourceManager.getInstance().getDataSource(dsId)?.type === DataSourceTypes.WebMap
    if (isWebmap) {
      return require('jimu-ui/lib/icons/data-map.svg')
    } else {
      return require('jimu-ui/lib/icons/data-scene.svg')
    }
  }

  return (
    <div css={style}>
      <div className='swipe-maps-panel'>
        <div className='swipe-maps-list d-flex justify-content-start'>
          <div className='d-flex flex-shrink-0 justify-content-center align-items-center swipe-maps-thumbnail'>
            <Icon size='12' color='#FFFFFF' icon={getIcon(mapViewList[0])} />
          </div>
          <div
            title={getDataSourceLabel(mapViewList[0])}
            className='swipe-maps-label text-truncate'
          >
            {getDataSourceLabel(mapViewList[0])}
          </div>
        </div>
        <div className='swipe-maps-list d-flex justify-content-start'>
          <div className='d-flex flex-shrink-0 justify-content-center align-items-center swipe-maps-thumbnail'>
            <Icon size='12' color='#FFFFFF' icon={getIcon(mapViewList[1])} />
          </div>
          <div
            title={getDataSourceLabel(mapViewList[1])}
            className='swipe-maps-label text-truncate'
          >
            {getDataSourceLabel(mapViewList[1])}
          </div>
        </div>
      </div>
    </div>
  )
}

const style = css`
.swipe-maps-panel {
  margin-top: 16px;
  .swipe-maps-list{
    width: 100%;
    margin-bottom: 14px;
    .swipe-maps-thumbnail {
      width:  20px;
      height:  20px;
      background-color: #089BDC;
      margin-right: 8px;
    }
    .swipe-maps-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--dark-800);
    }
  }
}
`
