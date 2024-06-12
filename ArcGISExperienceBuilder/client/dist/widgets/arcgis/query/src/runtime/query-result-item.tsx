/** @jsx jsx */
import {
  React,
  ReactRedux,
  jsx,
  css,
  type DataSource,
  type FeatureDataRecord,
  MessageManager,
  DataRecordsSelectionChangeMessage,
  type IMState,
  classNames
} from 'jimu-core'
import FeatureInfo from './components/feature-info'
import { ListDirection } from '../config'

export interface ResultItemProps {
  widgetId: string
  popupTemplate: any
  data: FeatureDataRecord
  dataSource: DataSource
  expandByDefault: boolean
}

const style = css`
  overflow: auto;
  flex-flow: row;
  cursor: pointer;
  flex-shrink: 0;
  min-height: 2rem;
  &.selected {
    .feature-info-component {
      border-color: var(--primary-500);
      border-width: 2px;
    }
  }
`

export const QueryResultItem = (props: ResultItemProps) => {
  const { widgetId, data, dataSource, popupTemplate, expandByDefault = false } = props
  const selected = ReactRedux.useSelector((state: IMState) =>
    state.dataSourcesInfo?.[dataSource.id]?.selectedIds?.includes(data.getId())
  )
  const isVerticalAlign = ReactRedux.useSelector((state: IMState) => {
    const widgetJson = state.appConfig.widgets[widgetId]
    return widgetJson.config.resultListDirection !== ListDirection.Horizontal
  })

  const handleClickResultItem = React.useCallback(() => {
    const dataItemRecordId = data.getId()
    const nextSelectedDataItems = (dataSource.getSelectedRecordIds() ?? []).includes(dataItemRecordId) ? [] : [data]
    MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(widgetId, nextSelectedDataItems))
    dataSource.selectRecordsByIds?.(nextSelectedDataItems.map((item) => item.getId()))
  }, [widgetId, data, dataSource])

  const onKeyUp = React.useCallback((evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault()
      evt.stopPropagation()
      handleClickResultItem()
    }
  }, [handleClickResultItem])

  return (
    <div
      className={classNames('query-result-item', { selected })}
      onClick={handleClickResultItem}
      onKeyUp={onKeyUp}
      css={style}
      role='option'
      aria-selected={selected}
      tabIndex={0}
    >
      <FeatureInfo
        graphic={data.feature as __esri.Graphic}
        popupTemplate={popupTemplate}
        togglable={isVerticalAlign}
        expandByDefault={expandByDefault}
        dataSource={dataSource}
      />
    </div>
  )
}
