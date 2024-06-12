/* eslint-disable new-cap */
/** @jsx jsx */
import {
  React, jsx
} from 'jimu-core'
import { Loading } from 'jimu-ui'
import { type AnalysisToolAppContainerCustomEvent } from 'analysis-tool-app'
import { type ToolProps } from './config'
import { useUpdateObjectByStateEffect } from '../../utils/util'
import { useAnalysisMapLayersFromMap } from '../utils'
import { changeDisplayOfAnalysisToolButtons, useJobStatusChangeListener } from './utils'

const { useState, useMemo, useEffect, useRef } = React

const StandradTool = (props: ToolProps) => {
  const { appContainer, jimuMapView, toolInfo, portal, jobParams, toolUiParameters, disableBack, onBack } = props

  const { toolName, id: toolId, analysisEngine } = toolInfo
  // const { input } = config as StandardToolConfig

  const map = useMemo(() => {
    return jimuMapView?.view?.map
  }, [jimuMapView])

  const [analysisToolContainer, setAnalysisToolContainer] = useState<HTMLAnalysisToolAppContainerElement>(null)

  const [analysisToolAppLoaded, setAnalysisToolAppLoaded] = useState(false)

  const runAnalysisDisabledRef = useRef(false)
  const analysisToolContainerRef = useRef<HTMLAnalysisToolAppContainerElement>()
  const analysisToolDivRef = useRef<HTMLDivElement>()
  useEffect(() => {
    analysisToolContainerRef.current = analysisToolContainer
  }, [analysisToolContainer])

  useEffect(() => {
    if (analysisToolContainer) {
      changeDisplayOfAnalysisToolButtons(disableBack, analysisToolContainer)
    }
  }, [disableBack])

  const setAnalysisToolRef = (ref: HTMLDivElement) => {
    if (analysisToolContainer || !ref) {
      return
    }

    const container = document.createElement('analysis-tool-app-container')
    container.style.height = '100%'
    container.analysisEngine = analysisEngine
    container.showHeader = true
    container.usePanel = true
    container.panelClosable = false
    container.appContainer = appContainer
    container.addEventListener('analysisToolAppPanelChange', () => {
      onBack()
    })
    container.addEventListener('analysisToolAppLoaded', () => {
      setAnalysisToolAppLoaded(true)
      changeDisplayOfAnalysisToolButtons(disableBack, container)
    })
    container.addEventListener('analysisToolAppJobSubmissionAttempt', (e: AnalysisToolAppContainerCustomEvent<boolean>) => {
      runAnalysisDisabledRef.current = e.detail
    })
    ref.appendChild(container)
    setAnalysisToolContainer(container)
  }

  const mapLayers = useAnalysisMapLayersFromMap(map)

  useUpdateObjectByStateEffect(analysisToolContainer, portal, 'portal')
  useUpdateObjectByStateEffect(analysisToolContainer, toolName, 'toolName')
  useUpdateObjectByStateEffect(analysisToolContainer, jimuMapView?.view, 'mapView')
  useUpdateObjectByStateEffect(analysisToolContainer, jobParams, 'jobParams')
  useUpdateObjectByStateEffect(analysisToolContainer, toolUiParameters, 'toolUiParameters')
  useUpdateObjectByStateEffect(analysisToolContainer, mapLayers, 'mapLayers')

  useJobStatusChangeListener(appContainer, toolId, runAnalysisDisabledRef, analysisToolContainerRef, analysisToolDivRef)

  return (
    <React.Fragment>
      {portal?.user && toolName && <div
        ref={(ref) => {
          analysisToolDivRef.current = ref
          setAnalysisToolRef(ref)
        }}
        // stop keydown event to make Ctrl+V event effective
        onKeyDown={(e) => { e.stopPropagation() }}
        className='analysis-tool-container h-100'></div>}
      {!analysisToolAppLoaded && <Loading />}
    </React.Fragment>
  )
}

export default StandradTool
