/** @jsx jsx */
import { React, css, getAppStore, hooks, jsx, loadArcGISJSAPIModules, defaultMessages as jimuCoreMessages } from 'jimu-core'
import { SettingRow, SettingSection, SidePopper } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'
import { Button, TextInput, Loading, LoadingType, Card, defaultMessages as jimuUIMessages, AdvancedSelect } from 'jimu-ui'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { type GroupInfo, type IMConfig } from '../../config'
import { basemapUtils } from 'jimu-arcgis'
import { SearchOutlined } from 'jimu-icons/outlined/editor/search'
import { EmptyOutlined } from 'jimu-icons/outlined/application/empty'
import Placeholder from './placeholder'

interface Props extends AllWidgetSettingProps<IMConfig> {
  onCustomBasemapsChange: (customBasemaps: basemapUtils.BasemapItem[]) => void
}

const sidePopperContentStyle = css`
  display: flex;
  flex-direction: column;
  .search-row {
    margin-top: 0.75rem !important;
  }
  .card-list-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.625rem;
    padding: 0 0 1rem;
    li {
      width: calc(50% - 0.75rem);
      margin: 0 0.375rem 0.625rem 0.375rem;
      list-style: none;
    }
    .card {
      border: 0;
      background-color: var(--light-500);
      &.card-active, &:hover {
        box-shadow: none;
        border: 0;
        outline: 0.125rem solid var(--primary-600);
      }
      .card-checkmark {
        line-height: 0;
        background-color: var(--primary-600);
        border-radius: 0 0 0 0.125rem;
      }
      img {
        width:100%;
        height: 5.0625rem;
        background-color: var(--light-600);
      }
      .content {
        box-sizing: content-box;
        height: 2.0625rem;
        margin: 0.25rem 0.25rem 0.5rem;
        overflow: hidden;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: var(--dark-800);
      }
    }
  }
`

const SidePopperContent = (props: Props) => {
  const { portalUrl, portalSelf, token, config, onCustomBasemapsChange } = props

  const { customBasemaps } = config

  const translate = hooks.useTranslation(defaultMessages, jimuCoreMessages, jimuUIMessages)

  const esriRequestRef = React.useRef<typeof __esri.request>()

  const [portal, setPortal] = React.useState<__esri.Portal>()

  React.useEffect(() => {
    loadArcGISJSAPIModules([
      'esri/portal/Portal',
      'esri/request'
    ]).then(modules => {
      const [Portal, esriRequest] = modules as [typeof __esri.Portal, typeof __esri.request]
      esriRequestRef.current = esriRequest

      const portalInstance = new Portal({
        url: portalUrl,
        sourceJSON: portalSelf
      })

      portalInstance.load().then(() => {
        setPortal(portalInstance)
        initGroups(portalInstance)
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [groups, setGroups] = React.useState<GroupInfo[]>([])
  const displayedGroups = React.useMemo(() => {
    return groups.length ? groups : [{ id: '', title: translate('esriDefault') }]
  }, [groups, translate])

  const [selectedGroupId, setSelectedGroupId] = React.useState<string>('')

  const [loading, setLoading] = React.useState(true)

  const initGroups = async (portal: __esri.Portal) => {
    const esriDefaultGroupInfo = await basemapUtils.getBasemapGroup(portal, portalSelf, true)
    const orgDefaultGroupInfo = await basemapUtils.getBasemapGroup(portal, portalSelf, false)

    const esriDefaultGroup = { id: esriDefaultGroupInfo?.id, title: translate('esriDefault') }
    const orgDefaultGroup = { id: orgDefaultGroupInfo?.id, title: translate('organizationDefault') }
    const user = getAppStore()?.getState()?.user
    const userGroups = user?.groups?.asMutable().map((g) => ({ id: g.id, title: g.title })) || []
    setGroups([esriDefaultGroup, orgDefaultGroup, ...userGroups])

    setSelectedGroupId(esriDefaultGroupInfo?.id || '')
  }

  const [basemapItems, setBasemapItems] = React.useState<basemapUtils.BasemapItem[]>([])

  const [searchText, setSearchText] = React.useState('')

  const searchedBasemapItems = React.useMemo(() => {
    if (!searchText) {
      return basemapItems
    }
    return basemapItems.filter(item => {
      return item.title.toUpperCase().includes(searchText.toUpperCase())
    })
  }, [basemapItems, searchText])

  const refreshBasemapItemsByGroupId = async (groupId) => {
    const newItems = await basemapUtils.getBasemapItemsByGroupId(portal, portalUrl, groupId)
    setBasemapItems(newItems)
  }

  React.useEffect(() => {
    if (selectedGroupId) {
      setSearchText('')
      setLoading(true)
      setBasemapItems([])
      refreshBasemapItemsByGroupId(selectedGroupId).then(() => {
        setLoading(false)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId])

  const onItemSelectedToggle = (item: basemapUtils.BasemapItem, isSelected: boolean) => {
    const preCustombaseMaps = customBasemaps.asMutable({ deep: true }) || []
    if (isSelected) {
      onCustomBasemapsChange([...preCustombaseMaps, item])
    } else {
      onCustomBasemapsChange(preCustombaseMaps.filter(i => i.id !== item.id))
    }
  }

  return <div className='h-100' css={sidePopperContentStyle}>
    <SettingSection className='pt-0 border-0' title={translate('chooseWebmaps')}>
      <SettingRow>
        <AdvancedSelect
          size="sm" aria-label={translate('chooseWebmaps')} buttonProps={{ disabled: !groups.length }}
          isMultiple={false} isEmptyOptionHidden={true}
          selectedValues={[{ label: displayedGroups.find((g) => g.id === selectedGroupId)?.title, value: selectedGroupId }]}
          staticValues={displayedGroups.map((group) => ({ label: group.title, value: group.id }))}
          onChange={(value) => { setSelectedGroupId(value?.[0]?.value as string || '') }}
        />
      </SettingRow>

      <SettingRow className='search-row'>
        <TextInput
          size='sm' className='py-0 w-100'
          prefix={<SearchOutlined size='m' color="var(--dark)" />}
          placeholder={translate('search')} aria-label={translate('search')}
          value={searchText} disabled={loading} allowClear={!!searchText}
          onChange={(e) => { setSearchText(e.target.value) }}
        />
      </SettingRow>
    </SettingSection>

    {loading
      ? <Loading type={LoadingType.Secondary} />
      : searchedBasemapItems.length
        ? <ul className='card-list-container' role='listbox'>
            {searchedBasemapItems.map((item) => {
              const isSelected = !!customBasemaps.find(i => i.id === item.id)
              return <li key={item.id}>
                <Card
                  button active={isSelected} role='option' aria-selected={isSelected} tabIndex={0}
                  onClick={() => { onItemSelectedToggle(item, !isSelected) }}
                  onKeyDown={(evt) => {
                    if (evt.key === 'Enter' || evt.key === ' ') {
                      evt.stopPropagation()
                      onItemSelectedToggle(item, !isSelected)
                    }
                  }}
                >
                  <img src={`${item.thumbnailUrl}?token=${token}`} />
                  <div className='content' title={item.title}>{item.title}</div>
                </Card>
              </li>
            })}
          </ul>
        : <Placeholder text={translate('noItemFoundWarning')} icon={<EmptyOutlined size={48} color='var(--dark-200)' />} style={{ flex: 1 }} />}
  </div>
}

const ImportBasemaps = (props: Props) => {
  const translate = hooks.useTranslation(defaultMessages, jimuCoreMessages, jimuUIMessages)

  const importButtonRef = React.useRef<HTMLButtonElement>()

  const [isOpen, setIsOpen] = React.useState(false)
  const openSidePopper = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }
  const closeSidePopper = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return <React.Fragment>
    <Button
      className="w-100"
      type="primary" aria-description={translate('importTips')}
      ref={importButtonRef}
      onClick={openSidePopper}
    >
      {translate('importBasemaps')}
    </Button>

    <SidePopper
      position='right' title={translate('sideTitle')} aria-label={translate('sideTitle')}
      isOpen={isOpen} toggle={closeSidePopper} trigger={importButtonRef.current}
    >
      <SidePopperContent {...props} />
    </SidePopper>
  </React.Fragment>
}

export default ImportBasemaps
