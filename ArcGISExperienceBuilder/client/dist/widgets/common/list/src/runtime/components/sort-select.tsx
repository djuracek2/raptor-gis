/** @jsx jsx */
import { React, jsx, css, polished, type ImmutableArray, type IMThemeVariables, defaultMessages as jimuCoreDefaultMessage, Immutable, appActions, type DataSource, hooks, ReactRedux, type IMState } from 'jimu-core'
import { defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { SortOutlined } from 'jimu-icons/outlined/directional/sort'
import { type SortSettingOption } from '../../config'
import defaultMessage from '../translations/default'
import MyDropDown, { type MyDropDownItem } from './my-dropdown'
import { useTheme } from 'jimu-theme'
const { useEffect, useState, useRef } = React
const { useSelector } = ReactRedux
interface Props {
  handleSortOptionChange: (label: string) => void
  sorts: ImmutableArray<SortSettingOption>
  sortOptionName: string
  datasource: DataSource
  dispatch: any
  id: string
  showSortString: boolean
}

const STYLE = css`
  .list-toggle-button:hover, .list-toggle-button {
    background: none !important;
  }
  & {
    margin-left: ${polished.rem(26)};
  }
  .dropdown-btn-con {
    color: var(--black);
    padding-left: ${polished.rem(7)};
    padding-right: ${polished.rem(7)};
    svg {
      margin-right: ${polished.rem(4)} !important;
    }
  }
  .dropdown-btn-con:hover {
    color: var(--primary-500);
  }
`

const SortSelect = (props: Props) => {
  const theme = useTheme()
  const appMode = useSelector((state: IMState) => state?.appRuntimeInfo?.appMode)
  const widgetsState = useSelector((state: IMState) => state?.widgetsState)
  const sortItemsRef = useRef<ImmutableArray<MyDropDownItem>>(null)

  const nls = hooks.useTranslation(defaultMessage, jimuiDefaultMessage, jimuCoreDefaultMessage)
  const { handleSortOptionChange, dispatch, sorts, datasource, sortOptionName, id, showSortString } = props

  const [sortItems, setSortItems] = useState(null as ImmutableArray<MyDropDownItem>)

  useEffect(() => {
    getSortItems()
  }, [sorts])

  useEffect(() => {
    updateWidgetStateOfList()
  }, [])

  const handleSortChange = (evt, item: MyDropDownItem) => {
    handleSortOptionChange(item?.label)
    updateWidgetStateOfList()
  }

  const updateWidgetStateOfList = () => {
    for (const widgetId in widgetsState) {
      if (widgetsState[widgetId]?.listWidget && widgetsState[widgetId]?.dsId === datasource?.id) {
        const activeSort = (id === widgetId)
        dispatch(appActions.widgetStatePropChange(widgetId, 'activeSort', activeSort))
      }
    }
  }

  const getSortItems = () => {
    const options = [] as any
    if (sorts) {
      sorts.forEach(sort => {
        sort.rule &&
          sort.rule.forEach(sortData => {
            if (sortData && !!sortData.jimuFieldName) {
              options.push({
                label: sort.ruleOptionName,
                event: handleSortChange
              })
            }
          })
      })
    }
    sortItemsRef.current = Immutable(options)
    setSortItems(Immutable(options))
  }

  const getSortContent = hooks.useEventCallback((theme?: IMThemeVariables) => {
    let sortString
    if (showSortString) {
      sortString = nls('listSort')
    } else if (!sortOptionName) {
      sortString = sortItemsRef.current?.[0]?.label
    } else {
      sortString = sortOptionName
    }

    return (<div className='d-flex align-items-conter dropdown-btn-con' title={sortString}>
      <SortOutlined/>
      <span className='flex-grow-1'>{sortString}</span>
    </div>)
  })

  return (
    <div className='list-sort-con d-flex align-items-conter' css={STYLE}>
      <MyDropDown
        theme={theme}
        items={sortItems}
        appMode={appMode}
        toggleType='tertiary'
        toggleArrow={false}
        toggleContent={getSortContent}
        size='sm'
        showActive
        activeLabel={getSortContent()}
      />
    </div>
  )
}

export default SortSelect
