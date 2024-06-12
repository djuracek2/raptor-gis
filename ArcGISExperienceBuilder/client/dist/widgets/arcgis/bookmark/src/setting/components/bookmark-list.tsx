/** @jsx jsx */
import { React, jsx, Immutable, css } from 'jimu-core'
import { Button, ImageFillMode, type ImageParam, Select, Tab, Tabs, TextArea, TextInput } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { ImageSelector } from 'jimu-ui/advanced/resource-selector'
import { List, TreeItemActionType, type UpdateTreeActionDataType, type TreeRenderOverrideItemDataType, type _TreeItem, TreeStyle } from 'jimu-ui/basic/list-tree'
import { WidgetMapOutlined } from 'jimu-icons/outlined/brand/widget-map'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { ImgSourceType, type Bookmark, TemplateType } from '../../config'

interface BookmarkListProps {
  bookmarks: Immutable.ImmutableArray<Bookmark>
  templateType: TemplateType
  activeId: number | string
  expandedId: number | string
  widgetId: string
  onSelect: (bookmark: Bookmark) => void
  onEdit: (bookmark: Bookmark) => void
  onDelete: (bookmark: Bookmark) => void
  onSort: (curIndex: number, newIndex: number) => void
  onPropertyChange: (name: string, value: any) => void
  formatMessage: (id: string, values?: any) => string
}

export const BookmarkList = (props: BookmarkListProps) => {
  const {
    bookmarks,
    templateType,
    activeId,
    expandedId,
    widgetId,
    onSelect,
    onEdit,
    onDelete,
    onSort,
    onPropertyChange,
    formatMessage
  } = props

  const listStyles = css`
    width: 100%;
    .jimu-tree-item__main-line {
      height: 32px;
      background-color: var(--light-500);
    }
    .jimu-tree-item__body {
      background-color: transparent !important;
      &:after {
        height: 32px;
      }
    }
  `

  const itemsJson = bookmarks.asMutable().map(bookmark => {
    const noImgType = [TemplateType.List, TemplateType.Custom1, TemplateType.Custom2]
    return {
      itemKey: bookmark.id.toString(),
      itemStateExpanded: expandedId === bookmark.id && !noImgType.includes(templateType),
      itemStateChecked: activeId === bookmark.id
    }
  })

  const onUpdateItem = (actionData: UpdateTreeActionDataType, refComponent: _TreeItem) => {
    if (actionData.updateType === 'handleDidDrop') {
      const { dragItemIndex, targetDropItemIndex } = actionData
      onSort?.(dragItemIndex, targetDropItemIndex)
    }
  }

  const updateBookmark = (bookmarkId: string, key: string, value: any) => {
    const newBookmarks = bookmarks.map((item) => item.id.toString() === bookmarkId ? item.set(key, value) : item)
    onPropertyChange('bookmarks', newBookmarks)
  }

  const [bookmarkLabel, setBookmarkLabel] = React.useState(Immutable({}))

  React.useEffect(() => {
    let bookmarkLabel = Immutable({})
    bookmarks.forEach(item => {
      bookmarkLabel = bookmarkLabel.set(item.id.toString(), item.name)
    })
    setBookmarkLabel(bookmarkLabel)
  }, [bookmarks])

  const renderOverrideItemTitle = (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => {
    const styles = css`
      padding: 3px 0;
      width: 110px;
      .input-wrapper {
        height: 26px;
        border: 1px solid transparent;
        outline: none;
        padding-left: 0;
        background-color: transparent;
        &:focus-within {
          padding-left: 6px;
          background-color: var(--dark-800);
        }
        input {
          height: 18px;
          line-height: 18px;
          font-size: 14px;
        }
      }
    `
    const item = refComponent.props.itemJsons[0]
    const bookmarkId = item.itemKey
    const onBookmarkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newBookmarkLabel = bookmarkLabel.set(bookmarkId, e.target.value)
      setBookmarkLabel(newBookmarkLabel)
    }
    const onBookmarkNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      const bookmark = bookmarks.find(item => item.id.toString() === bookmarkId)
      let value = e.target.value?.trim()
      value = value === '' ? bookmark.name : value
      updateBookmark(bookmarkId, 'name', value)
    }
    const stopPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation()
    }
    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const titleInput = e.target as HTMLInputElement
        titleInput?.blur()
      }
    }
    return (
      <TextInput
        css={styles}
        title={bookmarkLabel[item.itemKey]}
        value={bookmarkLabel[item.itemKey]}
        data-draggable='true'
        onChange={onBookmarkNameChange}
        onBlur={onBookmarkNameBlur}
        onClick={stopPropagation}
        onKeyDown={handleKeydown}
      />
    )
  }

  const renderOverrideItemDetailToggle = (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => {
    const item = refComponent.props.itemJsons[0]
    const bookmark = bookmarks.find(b => b.id.toString() === item.itemKey)
    const selectBookmark = () => {
      onSelect(bookmark)
    }

    return <div className='h-100 flex-grow-1' onClick={selectBookmark} />
  }

  const renderOverrideItemCommands = (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => {
    const styles = css`
      button {
        padding: 0 !important;
      }
    `
    const item = refComponent.props.itemJsons[0]
    const bookmark = bookmarks.find(b => b.id.toString() === item.itemKey)
    const editBookmark = () => {
      onEdit(bookmark)
    }
    const deleteBookmark = () => {
      onDelete(bookmark)
    }

    return <div css={styles} className='d-flex align-items-center justify-content-end'>
      <Button title={formatMessage('changeBookmarkView')} onClick={editBookmark} type='tertiary' icon>
        <WidgetMapOutlined size='s' />
      </Button>
      <Button title={formatMessage('deleteOption')} onClick={deleteBookmark} type='tertiary' icon>
        <CloseOutlined size='s' />
      </Button>
    </div>
  }

  const renderOverrideItemDetailLine = (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => {
    const styles = css`
      width: 100%;
      border: 1px solid var(--light-500);
      border-width: 0 1px 1px;
      padding: 8px;
    `
    const item = refComponent.props.itemJsons[0]
    const bookmarkId = item.itemKey
    const noImgType = [TemplateType.List, TemplateType.Custom1, TemplateType.Custom2]
    if (bookmarkId !== expandedId.toString() || noImgType.includes(templateType)) return null
    const bookmark = bookmarks.find(b => b.id.toString() === bookmarkId)
    const handleTabSelect = (imgSourceType: ImgSourceType) => {
      updateBookmark(bookmarkId, 'imgSourceType', ImgSourceType[imgSourceType])
    }

    const handleResourceChange = (imageParam: ImageParam) => {
      updateBookmark(bookmarkId, 'imgParam', imageParam)
    }

    const handleImageFillModeChange = (e: any) => {
      updateBookmark(bookmarkId, 'imagePosition', e.target.value)
    }

    const onBookmarkTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBookmark(bookmarkId, 'description', e.target.value)
    }

    const imgName = bookmark?.imgParam?.originalName
    const slideType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3]

    return <div css={styles}>
      <div aria-label={formatMessage('imageSource')} role='group'>
        <SettingRow label={formatMessage('imageSource')} className='mb-2' />
        <Tabs fill type='pills' onChange={handleTabSelect} value={bookmark.imgSourceType === ImgSourceType.Custom ? 'Custom' : 'Snapshot'}>
          <Tab id='Snapshot' title={formatMessage('imageSnapshot')}>
            <div className='mt-2' />
          </Tab>
          <Tab id='Custom' title={formatMessage('custom')}>
            <div className='mt-2'>
              <SettingRow>
                <div className='w-100 d-flex align-items-center mb-1 mt-1'>
                  <div style={{ minWidth: '60px' }}>
                    <ImageSelector
                      buttonClassName='text-dark d-flex justify-content-center btn-browse'
                      widgetId={widgetId}
                      buttonLabel={formatMessage('setAnImage')}
                      buttonSize='sm'
                      onChange={handleResourceChange}
                      imageParam={bookmark.imgParam}
                    />
                  </div>
                  <div style={{ width: '70px' }} className='uploadFileName ml-2 text-truncate' title={imgName || formatMessage('none')}>
                    {imgName || formatMessage('none')}
                  </div>
                </div>
              </SettingRow>
            </div>
          </Tab>
        </Tabs>
      </div>
      <SettingRow label={formatMessage('imagePosition')} className='mt-2' truncateLabel>
        <div style={{ width: '40%' }}>
          <Select size='sm' value={bookmark.imagePosition} onChange={handleImageFillModeChange} aria-label={formatMessage('imagePosition')}>
            <option key={0} value={ImageFillMode.Fill}>{formatMessage('fill')}</option>
            <option key={1} value={ImageFillMode.Fit}>{formatMessage('fit')}</option>
          </Select>
        </div>
      </SettingRow>
      {(slideType.includes(templateType)) &&
        <SettingRow flow='wrap' label={formatMessage('description')} className='mb-2' role='group' aria-label={formatMessage('description')}>
          <TextArea
            className='w-100'
            title={bookmark.description}
            value={bookmark.description || ''}
            onChange={onBookmarkTextChange}
            spellCheck={false}
          />
        </SettingRow>}
    </div>
  }

  const overrideItemBlockInfo = () => {
    return {
      name: TreeItemActionType.RenderOverrideItem,
      children: [{
        name: TreeItemActionType.RenderOverrideItemDroppableContainer,
        children: [{
          name: TreeItemActionType.RenderOverrideItemDraggableContainer,
          children: [{
            name: TreeItemActionType.RenderOverrideItemBody,
            children: [{
              name: TreeItemActionType.RenderOverrideItemMainLine,
              children: [{
                name: TreeItemActionType.RenderOverrideItemDragHandle
              }, {
                name: TreeItemActionType.RenderOverrideItemTitle
              }, {
                name: TreeItemActionType.RenderOverrideItemDetailToggle
              }, {
                name: TreeItemActionType.RenderOverrideItemCommands
              }]
            }, {
              name: TreeItemActionType.RenderOverrideItemDetailLine
            }]
          }]
        }]
      }]
    }
  }

  return (
    <List
      css={listStyles}
      itemsJson={itemsJson}
      dndEnabled
      isMultiSelection={false}
      treeStyle={TreeStyle.Card}
      renderOverrideItemTitle={renderOverrideItemTitle}
      renderOverrideItemDetailToggle={renderOverrideItemDetailToggle}
      renderOverrideItemCommands={renderOverrideItemCommands}
      renderOverrideItemDetailLine={renderOverrideItemDetailLine}
      onUpdateItem={onUpdateItem}
      overrideItemBlockInfo= {overrideItemBlockInfo}
    />
  )
}
