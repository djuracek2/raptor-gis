/** @jsx jsx */
import { React, jsx, css, polished, classNames, hooks } from 'jimu-core'
import { Button, Loading, LoadingType, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { type IMConfig, type IMPrintResultList, type PrintResultListItemTyle, PrintResultState } from '../../../../config'
import defaultMessage from '../../../translations/default'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { PageOutlined } from 'jimu-icons/outlined/data/page'
import { WrongOutlined } from 'jimu-icons/outlined/suggested/wrong'

interface Props {
  config: IMConfig
  printResultList: IMPrintResultList
  deleteResultItem: (index: number) => void
}

const Result = (props: Props) => {
  const nls = hooks.useTranslation(defaultMessage, jimuiDefaultMessage)
  const STYLE = css`
    & {
      overflow: auto;
      padding: ${polished.rem(16)} ${polished.rem(16)} ${polished.rem(16)} ${polished.rem(16)};
    }
    button {
      padding-left: 0;
      padding-right: 0;
    }
    a {
      padding: 0;
    }
    .print-loading-con {
      width: 16px;
      height: 16px;
      margin-right: ${polished.rem(4)};
    }
    .error-link, .error-link:hover {
      color: var(--dark);
      & svg {
        color: var(--danger-800);
      }
    }
  `
  const { printResultList, deleteResultItem } = props

  const renderLoading = () => {
    return (<div className='print-loading-con position-relative'><Loading width={16} height={16} type={LoadingType.Donut}/></div>)
  }

  const renderResultItemIcon = (item: PrintResultListItemTyle) => {
    switch (item.state) {
      case PrintResultState.Loading:
        return renderLoading()
      case PrintResultState.Success:
        return (<PageOutlined/>)
      case PrintResultState.Error:
        return (<span title={nls('uploadImageError')}><WrongOutlined /></span>)
    }
  }

  return (
    <div className='w-100 h-100' css={STYLE}>
      {printResultList?.length === 0 && <div>{nls('resultEmptyMessage')}</div>}
      {printResultList.map((item, index) => {
        return (
          <div className='d-flex align-items-center mb-2 w-100' key={item?.resultId}>
            <Button
              href={item?.url}
              disabled={!item?.url}
              target='_blank'
              size='sm'
              aria-label={item?.title}
              title={item?.state !== PrintResultState.Error ? item?.title : ''}
              type='tertiary'
              className={classNames('flex-grow-1 d-flex align-items-center', { 'error-link': item?.state === PrintResultState.Error })}
            >
              {renderResultItemIcon(item)}
              <div className='ml-2' title={item?.state === PrintResultState.Error ? item?.title : ''}>{item?.title}</div>
            </Button>
            <Button size='sm' type='tertiary' onClick={() => { deleteResultItem(index) }} title={nls('remove')}><CloseOutlined/></Button>
          </div>
        )
      })}
    </div>
  )
}

export default Result
