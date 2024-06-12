import { BaseVersionManager } from 'jimu-core'
import { type IMConfig } from './config'
import { AnalysisEngine } from 'analysis-ui-schema'

class VersionManager extends BaseVersionManager {
  versions = [
    {
      version: '1.14.0',
      description: 'Add analysisEngine in toolConfig',
      upgrader: (oldConfig: IMConfig) => {
        if (!oldConfig.toolList.length) return oldConfig

        if (oldConfig.toolList.every((tool) => !!tool.analysisEngine)) {
          return oldConfig
        }

        const newConfig = oldConfig.set('toolList', oldConfig.toolList.asMutable({ deep: true }).map((tool) => {
          if (!tool.analysisEngine) {
            tool.analysisEngine = AnalysisEngine.Standard
          }
          return tool
        }))

        return newConfig
      }
    }
  ]
}

export const versionManager = new VersionManager()
