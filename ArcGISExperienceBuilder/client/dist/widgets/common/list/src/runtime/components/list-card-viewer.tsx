/** @jsx jsx */
import { RepeatedDataSourceProvider, jsx, AppMode, React, type DataRecord, utils, classNames } from 'jimu-core'
import { ListGroupItem, styleUtils } from 'jimu-ui'
import { LayoutEntry } from 'jimu-layouts/layout-runtime'
import { Status, ListLayout } from '../../config'
import ListCard, { type ListCardProps, type ListCardStates } from './list-card-base'

interface ListCardViewerProps extends ListCardProps {
  widgetId: string
}

export default class ListCardViewer extends ListCard<
ListCardViewerProps,
ListCardStates
> {
  layoutRef: any
  linkRef: React.RefObject<HTMLButtonElement>
  expressionRecords: { [key: string]: DataRecord }
  constructor (props) {
    super(props)

    this.providerData = this.getNewProviderData()
    this.layoutRef = React.createRef()
    this.linkRef = React.createRef<HTMLButtonElement>()
  }

  shouldComponentUpdate (nextProps, nextStats) {
    let shouldUpdate = this.shouldComponentUpdateExcept(nextProps, nextStats, [
      'listStyle'
    ])
    shouldUpdate =
      shouldUpdate ||
      !utils.isDeepEqual(this.props.listStyle, nextProps.listStyle)
    return shouldUpdate
  }

  handleItemClick = evt => {
    const { onChange, active } = this.props
    const { providerData } = this

    // if click sub widget event, don't un select
    if (active) {
      const tagName = (evt.target && evt.target.tagName) || ''
      if (
        !(
          tagName.toLowerCase() === 'a' ||
          tagName.toLowerCase() === 'button' ||
          evt.exbEventType === 'linkClick'
        )
      ) {
        onChange(providerData && providerData.record)
      }
    } else {
      onChange(providerData && providerData.record)
    }

    if (evt.exbEventType === 'linkClick') {
      delete evt.exbEventType
    }
  }

  handleItemKeyDown = evt => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this.handleItemClick(evt)
    }
  }

  handleLinkClick = evt => {
    evt.stopPropagation()
  }

  render () {
    const {
      selectable,
      active,
      cardConfigs,
      widgetId,
      listStyle,
      layouts,
      hoverLayoutOpen,
      appMode,
      isHover,
      itemIdex,
      handleListMouseLeave,
      handleListMouseMove
    } = this.props
    let currentStatus: Status = Status.Default
    const isInBuilder = window.jimuConfig.isInBuilder
    let layout
    let bgStyle
    if (isInBuilder && appMode !== AppMode.Run) {
      bgStyle = cardConfigs[Status.Default].backgroundStyle
      layout = layouts[Status.Default]
    } else {
      layout = layouts[Status.Default]
      bgStyle = cardConfigs[Status.Default].backgroundStyle

      if (hoverLayoutOpen && isHover && layouts[Status.Hover]) {
        currentStatus = Status.Hover
        layout = layouts?.[Status.Hover]
        bgStyle = cardConfigs[Status.Hover].backgroundStyle
      }
      if (selectable && active) {
        currentStatus = Status.Selected
        layout = layouts?.[Status.Selected]
        bgStyle = cardConfigs[Status.Selected].backgroundStyle
      }
    }
    const currentLayoutType = cardConfigs[currentStatus]?.listLayout || ListLayout.CUSTOM
    const regularLayout = layouts[Status.Default]
    const showLayout = currentLayoutType === ListLayout.AUTO ? regularLayout : layout

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(bgStyle || ({} as any))
    }

    const cardContentStyle: any = {
      ...styleUtils.toCSSStyle(
        {
          borderRadius: bgStyle?.borderRadius || 0
        } || ({} as any)
      )
    }

    const newProviderData = this.getNewProviderData()
    if (!this.isProviderEqual(newProviderData, this.providerData)) {
      this.providerData = newProviderData
    }

    return (
      <RepeatedDataSourceProvider data={this.providerData}>
        <ListGroupItem
          active={selectable && active}
          css={this.getStyle(currentStatus)}
          style={{ ...listStyle, ...cardContentStyle }}
          tabIndex={0}
          className={classNames('surface-1 jimu-outline-inside', `list-card-${widgetId}`)}
          onClick={this.handleItemClick}
          role='option'
          onKeyDown={this.handleItemKeyDown}
          aria-describedby='describeByMessage'
          aria-selected={selectable && active}
        >
          <div
            className='list-card-content d-flex'
            onMouseLeave={handleListMouseLeave}
            onMouseMove={() => { handleListMouseMove(itemIdex) }}
            style={mergedStyle}>
            <div className='position-relative h-100 w-100'>
              <div className='d-flex w-100 h-100 list-item-con' ref={this.layoutRef}>
                <LayoutEntry layouts={showLayout} />
              </div>
            </div>
          </div>
        </ListGroupItem>
      </RepeatedDataSourceProvider>
    )
  }
}
