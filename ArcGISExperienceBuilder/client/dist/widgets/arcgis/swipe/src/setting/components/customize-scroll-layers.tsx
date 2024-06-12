/** @jsx jsx */
import {
  jsx,
  React,
  css,
  polished,
  hooks,
  type ImmutableArray
} from 'jimu-core'
import {
  Alert,
  defaultMessages as jimuUIMessages
} from 'jimu-ui'
import defaultMessages from '../translations/default'
import {
  SettingSection,
  SettingRow,
  MultipleJimuMapConfig
} from 'jimu-ui/advanced/setting-components'
import ChooseScrollLayers from './choose-scroll-layers'
import { type SwipeStyle } from '../../config'
import { getJimuMapViewId, isWebMap } from '../../utils/utils'

const { useState, useRef } = React
const STYLE = css`
  .layer-remind {
    color: var(--dark-500);
    font-size: ${polished.rem(13)};
  }
  .text-container {
    margin-top: 12px;
  }
`
interface CustomizeScrollLayersProps {
  useMapWidgetId: string
  onConfigChange: (key: string[], value: any) => void
  scrollMapViewList: { [mapViewId: string]: string[] }
  swipeStyle: SwipeStyle
  folderUrl: string
  mapUseDataSources: ImmutableArray<string>
}

const CustomizeScrollLayers = (props: CustomizeScrollLayersProps) => {
  const { useMapWidgetId, onConfigChange, scrollMapViewList, swipeStyle, mapUseDataSources } = props
  const translate = hooks.useTranslation(defaultMessages, jimuUIMessages)
  const [dsId, setDsId] = useState(null)
  const customizeLayersRef = useRef<HTMLDivElement>(null)

  const onListItemBodyClick = (dataSourceId: string) => {
    setDsId(dataSourceId)
  }

  return (
    <SettingSection
      title={
        <div>
          {translate('customizeSettings')}
        </div>
      }
      css={STYLE}
    >
      <SettingRow flow='wrap' className='text-container'>
        <span className='w-100 layer-remind'>{translate('scrollRemind')}</span>
      </SettingRow>
      <SettingRow>
        <div className='w-100'>
          {(mapUseDataSources?.length === 1 || mapUseDataSources?.length === 2)
            ? <MultipleJimuMapConfig
              mapWidgetId={useMapWidgetId}
              forwardRef={(ref: HTMLDivElement) => {
                customizeLayersRef.current = ref
              }}
              onClick={onListItemBodyClick}
              isDataSourceValid={isWebMap}
              invalidDataSourceTooltip={translate('webSceneNotSupported')}
              sidePopperContent={
                <ChooseScrollLayers
                  mapViewId={getJimuMapViewId(useMapWidgetId, dsId)}
                  onConfigChange={onConfigChange}
                  scrollMapViewList={scrollMapViewList}
                  swipeStyle={swipeStyle}
                  folderUrl={props.folderUrl}
                />
              }
            />
            : <Alert
              tabIndex={0}
              className={'warningMsg w-100'}
              open
              text={translate('mapEmpty')}
              type={'warning'}
            />}
        </div>
      </SettingRow>
    </SettingSection>
  )
}

export default CustomizeScrollLayers
