import { type AnalysisToolData } from 'analysis-ui-schema'
import { type JimuMapView } from 'jimu-arcgis'
import { type IMThemeVariables, type ImmutableObject } from 'jimu-core'
import { type ToolConfig } from '../../config'

export interface ToolProps {
  theme: IMThemeVariables
  appContainer: HTMLElement
  jimuMapView: JimuMapView
  portal: __esri.Portal
  jobParams?: AnalysisToolData
  toolUiParameters?: AnalysisToolData
  toolInfo: ImmutableObject<ToolConfig>
  disableBack?: boolean
  hasAccess: boolean
  onBack: () => void
  signIn: (toolInfo: ImmutableObject<ToolConfig>) => Promise<void>
}
