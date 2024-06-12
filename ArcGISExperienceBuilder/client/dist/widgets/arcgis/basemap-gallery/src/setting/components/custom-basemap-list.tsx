/** @jsx jsx */
import { type basemapUtils } from 'jimu-arcgis'
import { React, jsx, type Immutable, type ImmutableObject, defaultMessages as jimuCoreMessages, hooks, css } from 'jimu-core'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { Button } from 'jimu-ui'
import { List, TreeItemActionType, type TreeItemType, type TreeItemsType } from 'jimu-ui/basic/list-tree'

interface Props {
  customBasemaps: Immutable.ImmutableArray<basemapUtils.BasemapItem>
  token: string
  onChange: (basemaps: basemapUtils.BasemapItem[]) => void
}

const style = css`
  .jimu-tree-item__body {
    padding: 0.5rem 0.5rem 0.5rem 0;
    cursor: move;
    .jimu-tree-item__icon {
      padding: 0 !important;
      img {
        width: 5rem;
        height: 3.75rem;
      }
    }
    .jimu-tree-item__title {
      margin: 0 0.5rem 0 0.25rem;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 0.8125rem;
      line-height: 1.0625rem;
      font-weight: 400;
    }
    .del-btn {
      opacity: 0;
      &:focus, &:active {
        opacity: 1;
      }
    }
    &:hover, &:focus, &:active {
      .del-btn {
        opacity: 1;
      }
    }
  }
`

const CustomBasemapList = (props: Props) => {
  const { customBasemaps, token, onChange } = props

  const translate = hooks.useTranslation(jimuCoreMessages)

  const onRemove = (id: string) => {
    onChange(customBasemaps.asMutable().filter((item) => item.id !== id))
  }

  return <List
    size='default'
    className='px-4'
    css={style}
    itemsJson={customBasemaps.asMutable().map((item, index) => ({
      itemStateDetailContent: item,
      itemKey: item.id,
      itemStateIcon: { icon: `${item.thumbnailUrl}?token=${token}` },
      itemStateTitle: item.title
    }))}
    dndEnabled
    onDidDrop={(actionData, refComponent) => {
      const { itemJsons } = refComponent.props
      const [, listItemJsons] = itemJsons as [TreeItemType, TreeItemsType]

      const sortedBasemaps = listItemJsons.map(item => {
        return item.itemStateDetailContent as ImmutableObject<basemapUtils.BasemapItem>
      })
      const orderChanged = sortedBasemaps.map((tool) => tool.id).join(',') !== customBasemaps.map((item) => item.id).join(',')
      if (orderChanged) {
        onChange(sortedBasemaps)
      }
    }}
    overrideItemBlockInfo={({ itemBlockInfo }) => {
      return {
        name: TreeItemActionType.RenderOverrideItem,
        children: [{
          name: TreeItemActionType.RenderOverrideItemDroppableContainer,
          children: [{
            name: TreeItemActionType.RenderOverrideItemDraggableContainer,
            children: [{
              name: TreeItemActionType.RenderOverrideItemBody,
              children: [{
                name: TreeItemActionType.RenderOverrideItemDragHandle
              }, {
                name: TreeItemActionType.RenderOverrideItemIcon
              }, {
                name: TreeItemActionType.RenderOverrideItemTitle
              }, {
                name: TreeItemActionType.RenderOverrideItemCommands
              }]
            }]
          }]
        }]
      }
    }}
    renderOverrideItemCommands={(actionData, refComponent) => {
      const { itemJsons } = refComponent.props
      const currentItemJson = itemJsons[0]
      const id = currentItemJson.itemKey
      return <Button size="sm" type="tertiary" icon className='del-btn p-0 border-0'
        title={translate('delete')} aria-label={translate('delete')}
        onClick={(evt) => {
          evt.stopPropagation()
          onRemove(id)
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter' || evt.key === ' ') {
            evt.stopPropagation()
            onRemove(id)
          }
        }}
      >
        <CloseOutlined />
      </Button>
    }}
  />
}

export default CustomBasemapList
