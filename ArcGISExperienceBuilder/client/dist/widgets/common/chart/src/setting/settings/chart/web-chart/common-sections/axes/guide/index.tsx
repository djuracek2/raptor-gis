import { React, type ImmutableObject, type ImmutableArray, Immutable, hooks } from 'jimu-core'
import { type WebChartGuide } from 'jimu-ui/advanced/chart'
import { defaultMessages as jimuiDefaultMessage, Button } from 'jimu-ui'
import defaultMessages from '../../../../../../translations/default'
import Guide from './guide'
import { getDefaultGuide } from '../../../../../../../utils/default'
import { getGuideName, getValidGuides } from './utils'
import { AnchoredSidePanel, Placeholder } from '../../../../../components'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import { styled } from 'jimu-theme'

interface GuidesProps {
  isHorizontal?: boolean
  value: ImmutableArray<WebChartGuide>
  onChange: (value: ImmutableArray<WebChartGuide>) => void
}

const Root = styled.div`
  height: 100%;
  .guilds-panel {
    overflow-y: auto;
    height: calc(100% - 50px);
  }
`

const Guides = (props: GuidesProps) => {
  const translate = hooks.useTranslation(defaultMessages, jimuiDefaultMessage)

  const { value: propValue, onChange, isHorizontal } = props
  const [defaultOpenIndex, setDefaultOpenIndex] = React.useState(-1)
  const [guides, setGuides] = React.useState<ImmutableArray<WebChartGuide>>(
    propValue ?? Immutable([])
  )

  const handleCreate = () => {
    const name = getGuideName(guides)
    const guide = getDefaultGuide(name, '', isHorizontal)
    setGuides(guides.concat(guide))
    setDefaultOpenIndex(guides.length)
  }

  const handleChange = (
    guide: ImmutableObject<WebChartGuide>,
    index: number
  ) => {
    setGuides(Immutable.set(guides, index, guide))
  }

  const handleDelete = (index: number) => {
    setGuides(guides.filter((_, i) => i !== index))
  }

  hooks.useUpdateEffect(() => {
    const gs = getValidGuides(guides)
    onChange(gs)
  }, [guides])

  return (
    <AnchoredSidePanel
      label={translate('auxiliaryGuide')}
      title={translate('auxiliaryGuide')}
      level={2}
    >
      <Root className='px-4' role='group' aria-label={translate('auxiliaryGuide')}>
        <Button
          size='sm'
          type='primary'
          onClick={handleCreate}
          className='w-100'
          aria-label={translate('add')}
          aria-describedby='no-guides-msg'
        >
          <PlusOutlined></PlusOutlined>
          <span>{translate('add')}</span>
        </Button>
        {!!guides.length && (
          <div className='guilds-panel mt-1'>
            {guides.map((guide, index) => {
              return (
                <Guide
                  className='mt-2'
                  key={guide.name ?? index}
                  isHorizontal={isHorizontal}
                  value={guide}
                  defaultIsOpen={index === defaultOpenIndex}
                  onChange={(guide) => { handleChange(guide, index) }}
                  onDelete={() => { handleDelete(index) }}
                />
              )
            })}
          </div>
        )}
        {!guides.length && (
          <Placeholder
            messageId='no-guides-msg'
            placeholder={translate('noGuideTip')}
          />
        )}
      </Root>
    </AnchoredSidePanel>
  )
}

export default Guides
