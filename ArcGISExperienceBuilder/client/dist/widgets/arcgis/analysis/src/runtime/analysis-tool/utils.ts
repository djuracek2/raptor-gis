import { type AnalysisGPJobStatus } from 'analysis-shared-utils'
import { type AnalysisToolAppContainerCustomEvent } from 'analysis-tool-app'
import { React } from 'jimu-core'
import { AnalysisCoreEvents, notifyJobStatus, notifyJobSubmited } from '../../utils/events'

export const changeDisplayOfAnalysisToolButtons = (disableBack: boolean, container: HTMLAnalysisToolAppContainerElement | HTMLAnalysisRfxAppContainerElement) => {
  // if in runtime, disableBack won't change
  if (!disableBack && !window.jimuConfig.isInBuilder) {
    return
  }
  // if disbale back, hide back button(including header back button and footer back button) and change run button to full width
  const flowItem = container.shadowRoot.querySelector('calcite-flow-item')
  if (flowItem) {
    flowItem.showBackButton = !disableBack
    const buttons: NodeListOf<HTMLCalciteButtonElement> = flowItem.querySelectorAll('.tool-footer calcite-button')
    const runButton = buttons[0]
    const backButton = buttons[1]
    if (runButton) {
      runButton.width = disableBack ? 'full' : 'half'
    }
    if (backButton) {
      backButton.style.display = disableBack ? 'none' : 'inline-block'
    }
  }
}

export const useJobStatusChangeListener = (
  appContainer: HTMLElement,
  toolId: string,
  runAnalysisDisabledRef: React.MutableRefObject<boolean>,
  analysisToolContainerRef: React.MutableRefObject<HTMLAnalysisToolAppContainerElement | HTMLAnalysisRfxAppContainerElement>,
  analysisToolDivRef: React.MutableRefObject<HTMLDivElement>
) => {
  React.useEffect(() => {
    if (appContainer) {
      /**
       * There are three cases to handle here:
       * 1. Click run button and not close the tool panel, in this case, can't remove the analysisCoreJobStatus event listener on appContainer
       * 2. Click run button and close the tool panel immediately,in this case need to listen the analysisCoreJobStatus event with submissionData,
       * so that we can notify the analysisCoreJobSubmited event with toolId, then we can remove the analysisCoreJobStatus event listener.
       * 3. Only enter the tool panel, but not run task and close the tool panel directly, in this case, we can just remove the analysisCoreJobStatus event lisrener directly.
       */
      const onAnalysisCoreJobStatus = (e: AnalysisToolAppContainerCustomEvent<AnalysisGPJobStatus>) => {
        // for case 3: tool was closed and no running tasks to handle
        if (!runAnalysisDisabledRef.current && !analysisToolDivRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
          return
        }
        // for case 2: tool was closed and has running tasks to handle
        // for case 1: tool was opened and has running tasks to handle
        if (e?.detail?.submissionData) {
          notifyJobSubmited(appContainer, { ...e.detail, toolId })
          // if not dispatch when submit job success, the run button will allways disable
          if (analysisToolContainerRef.current && e.target === appContainer) {
            notifyJobStatus(analysisToolContainerRef.current, e.detail)
          }
        }
        // for case 2: tool was closed but has running task, and the running task was handled above
        if (runAnalysisDisabledRef.current && !analysisToolDivRef.current) {
          appContainer.removeEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
        }
      }
      appContainer.addEventListener(AnalysisCoreEvents.JobStatus, onAnalysisCoreJobStatus)
    }
  }, [appContainer, toolId])
}
