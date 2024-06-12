import { type AnalysisHistoryItem, type AnalysisGPJobStatus, type SerializedHistoryItem as ComponentSerializedHistoryItem } from 'analysis-shared-utils'
import { type AnalysisToolParam, type AnalysisToolData, type AnalysisToolDataItem, type AnalysisToolInfo, type AnalysisEngine } from 'analysis-ui-schema'
import { type UseUtility, type DataSource, type ImmutableObject } from 'jimu-core'

export enum ToolType {
  Standard = 'standard',
  Custom = 'custom',
  RasterFunction = 'rfx'
}

export interface Config {
  toolList: ToolConfig[]
  displayToolHistoryFromMap?: boolean
  historyResourceItemsFromMap?: ComponentSerializedHistoryItem[]
}

export interface ToolConfig {
  id: string
  type: ToolType
  toolName: string
  analysisEngine: AnalysisEngine
  config: StandardToolConfig | CustomToolConfig
}

export interface StandardToolConfig {
  input: StandardToolInput
  output: StandardToolOutput
  option: StandardToolOption
}

export interface StandardToolInput {
  selectFromMapLayer: boolean
  allowBrowserLayers: boolean
  allowDrawingOnTheMap: boolean
  allowLocalFileUpload: boolean
  allowServiceUrl: boolean
  selectFromOtherWidget: boolean
}

export interface StandardToolOutput {
  addResultLayersToMapAuto: boolean
  allowExportResults: boolean
}

export interface StandardToolOption {
  presetFromMapHistoryId?: string
}

export interface CustomToolOutput {
  ignored: { [key: string]: boolean }
  allowExport: { [key: string]: boolean }
  decimalPlace: { [key: string]: number }
  dateFormat: { [key: string]: string }
  timeFormat: { [key: string]: string }
  addResultLayersToMapAuto: { [key: string]: boolean }
}

export interface CustomToolOption {
  showHelpLink: boolean
  link: string
}

export interface CustomToolConfig {
  toolInfo: AnalysisToolInfo
  utility?: UseUtility
  toolUrl: string
  output: CustomToolOutput
  option: CustomToolOption
}

export type IMConfig = ImmutableObject<Config>

export type SubmissionData = AnalysisGPJobStatus['submissionData']

export type CombinedHistoryParameter = AnalysisToolData | AnalysisToolDataItem

export interface FailedLayer {
  layerName: string
  reasonForFailure: string
}

export interface HistoryItemWithDs extends Omit<AnalysisHistoryItem, 'results'> {
  results: __esri.ParameterValue[]
  isImportedFromMap?: boolean
  toolId: string
  dsMap?: Map<string, DataSource>
  dsCreateError?: Map<string, FailedLayer>
  id: string
}

// TODO replace this with SerializedHistoryItem in component once they support other result type
export interface SerializedHistoryItem extends Omit<AnalysisHistoryItem, 'jobInfo' | 'results'> {
  jobInfo: string
  results: __esri.ParameterValue[]
}

export interface CustonToolParam extends AnalysisToolParam {
  selectFromMapLayer?: boolean // for analysis-layer-input mapLayers param
  // TODO set hideBrowseButton in ui json
  hideBrowseButton?: boolean // for analysis-layer-input hideBrowseButton param
  enableSketch?: boolean // for analysis-layer-input enableSketch param
  hideUpload?: boolean // for analysis-data-file-input hideUpload param
}

export interface AnalysisGPJobSubmited extends AnalysisGPJobStatus {
  toolId: string
}

export interface SynchronousJobExexuteResult {
  messages: __esri.GPMessage[]
  results: __esri.ParameterValue[]
}

export interface CustomToolAdded {
  toolInfo: AnalysisToolInfo
  utility?: UseUtility
  toolUrl: string
}
