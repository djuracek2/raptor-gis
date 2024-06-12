/** @jsx jsx */
import { jsx, AppMode, React, classNames, AnimationContext, type ImmutableObject, type UrlParameters, TransitionContainer, LinkType, type BrowserSizeMode, hooks } from 'jimu-core'
import { styleUtils } from 'jimu-ui'
import { LayoutEntry } from 'jimu-layouts/layout-runtime'
import { Status, type IMTransitionInfo, type IMConfig, CardLayout } from '../../config'
import { type IMLinkParam } from 'jimu-ui/advanced/setting-components'
import { LinkContainer } from 'jimu-ui/advanced/link-container'

const { useState, useRef, useEffect } = React

interface Props {
  /**
   * one or more expressions
   */
  linkParam?: IMLinkParam
  queryObject: ImmutableObject<UrlParameters>
  cardConfigs: IMConfig
  layouts: any
  appMode: AppMode
  browserSizeMode: BrowserSizeMode
  hoverPlayId: number
  regularPlayId: number
  previewId: number
  previousIndex: number
  currentIndex: number
  cardLayout: CardLayout
}

const CardContent = function (props: Props) {
  const didMountRef = useRef<boolean>(false)
  const { cardConfigs, layouts, appMode, linkParam, browserSizeMode, cardLayout, hoverPlayId, regularPlayId, previewId, previousIndex, currentIndex, queryObject } = props

  const [transitionInfo, setTransitionInfo] = useState(null as IMTransitionInfo)
  const [isHoverEnable, setIsHoverEnable] = useState(false)
  const [isInBuilder, setIsInBuilder] = useState(false)

  useEffect(() => {
    setTransitionInfo(cardConfigs?.transitionInfo)
    setIsHoverEnable(cardConfigs?.HOVER?.enable)
    setIsInBuilder(window.jimuConfig?.isInBuilder || false)
  }, [cardConfigs])

  useEffect(() => {
    didMountRef.current = true
  }, [])

  const getCardContent = hooks.useEventCallback(() => {
    const cardContent = []
    let regularLayout, regularBgStyle, hoverLayout, hoverBgStyle
    if (isInBuilder && appMode !== AppMode.Run) {
      regularBgStyle = getBackgroundStyle(Status.Default)
      regularLayout = layouts[Status.Default]
      if (isHoverEnable) {
        hoverBgStyle = getBackgroundStyle(Status.Hover)
        hoverLayout = cardLayout === CardLayout.AUTO ? regularLayout : layouts[Status.Hover]
      }
    } else {
      regularLayout = layouts[Status.Default]
      regularBgStyle = getBackgroundStyle(Status.Default)

      if (isHoverEnable) {
        hoverLayout = cardLayout === CardLayout.AUTO ? regularLayout : layouts[Status.Hover]
        hoverBgStyle = getBackgroundStyle(Status.Hover)
      }
    }

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(regularBgStyle || ({} as any))
    }
    const isShowLink =
      linkParam?.linkType && linkParam?.linkType !== LinkType.None
    const regularElement = (
      <div
        className={classNames(
          'card-content d-flex surface-1',
          isShowLink ? 'card-link' : ''
        )}
        tabIndex={isShowLink ? -1 : 1}
        key={Status.Default}
      >
        <div className='w-100 animation-list' style={mergedStyle}>
          <div className='d-flex w-100 h-100'>
            <AnimationContext.Provider
              value={{
                setting: cardConfigs?.transitionInfo?.oneByOneEffect || null,
                playId: regularPlayId,
                oid: regularLayout?.[browserSizeMode]
              }}
            >
              <LayoutEntry layouts={regularLayout} />
            </AnimationContext.Provider>
          </div>
        </div>
      </div>
    )
    cardContent.push(regularElement)

    if (isHoverEnable) {
      const hoverMergedStyle: any = {
        ...styleUtils.toCSSStyle(hoverBgStyle || ({} as any))
      }
      const hoverElement = (
        <div
          className={classNames(
            'card-content d-flex surface-1 w-100 h-100',
            isShowLink ? 'card-link' : ''
          )}
          key={Status.Hover}
        >
          <div className='w-100 h-100 animation-list' style={hoverMergedStyle}>
            <div className='d-flex w-100 h-100'>
              <AnimationContext.Provider
                value={{
                  setting: cardConfigs?.transitionInfo?.oneByOneEffect || null,
                  playId: hoverPlayId,
                  oid: hoverLayout?.[browserSizeMode] || null
                }}
              >
                <LayoutEntry layouts={hoverLayout} />
              </AnimationContext.Provider>
            </div>
          </div>
        </div>
      )
      cardContent.push(hoverElement)
    }

    return cardContent
  })

  const getBackgroundStyle = (status: Status) => {
    const backgroundStyle = cardConfigs[status].backgroundStyle
    if (backgroundStyle?.boxShadow) {
      return backgroundStyle.setIn(['boxShadow', 'color'], 'transparent')
    } else {
      return backgroundStyle
    }
  }

  return (
    <LinkContainer
      linkParam={linkParam}
      appMode={appMode}
      queryObject={queryObject}
    >
      <TransitionContainer
        previousIndex={previousIndex}
        currentIndex={currentIndex}
        transitionType={transitionInfo?.transition?.type}
        direction={transitionInfo?.transition?.direction}
        playId={didMountRef.current ? previewId : null}
        withOneByOne={!!transitionInfo?.oneByOneEffect}
      >
        {getCardContent()}
      </TransitionContainer>
    </LinkContainer>
  )
}

export default CardContent
