import { React, jsx, hooks } from 'jimu-core'
import { Checkbox, defaultMessages as jimuiDefaultMessages, Label } from 'jimu-ui'
import defaultMessages from '../translations/default'

export type LayerInputType = 'selectFromMapLayer' | 'allowBrowserLayers' | 'allowDrawingOnTheMap' | 'allowLocalFileUpload' | 'allowServiceUrl' | 'selectFromOtherWidget'
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type LayerInputTypeInfo = Partial<Record<LayerInputType, boolean>>

const useLayeInputTypes = (show?: LayerInputTypeInfo) => {
  return useMemo(() => {
    return (['selectFromMapLayer', 'allowBrowserLayers', 'allowDrawingOnTheMap', 'allowLocalFileUpload', 'allowServiceUrl', 'selectFromOtherWidget'] as LayerInputType[]).filter((key) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      return show?.[key] !== false
    })
  }, [show])
}

interface Props {
  show?: LayerInputTypeInfo
  checked?: LayerInputTypeInfo
  onChange: (key: LayerInputType, checked: boolean) => void
}

const { useMemo } = React
const LayerInputTypeConfig = (props: Props) => {
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessages)
  const { show = {}, checked = {}, onChange } = props

  const layerInputTypes = useLayeInputTypes(show)

  return (
    <React.Fragment>
      {layerInputTypes.map((key) => {
        return <Label className='label-for-checkbox' key={key}>
          <Checkbox checked={checked[key]} onChange={(e, c) => { onChange(key, c) }}/>
          {translate(key)}
        </Label>
      })}
    </React.Fragment>
  )
}

export default LayerInputTypeConfig
