import { React, urlUtils } from 'jimu-core'
import { getLocaleInfo } from 'analysis-shared-utils'
import { getRFxTranslatedRFTNamesMap } from 'analysis-raster-function-utils'
import { type LocaleItem } from 'analysis-ui-schema'

export function getAssetsPathByFolderName (folderName: string) {
  return `${urlUtils.getAbsoluteRootUrl()}arcgis-amd-packages/${folderName}/`
}

export function getAnalysisAssetPath () {
  return getAssetsPathByFolderName('arcgis-analysis-assets')
}

export async function fetchStrings (path: string) {
  const response = await fetch(path)
  const results = await response.json()
  return results as LocaleItem
}

const stringsCache: { [key: string]: LocaleItem } = {}

export const useStrings = (path: string, locale: string = getLocaleInfo().locale) => {
  const [strings, setStrings] = React.useState<LocaleItem>()
  React.useEffect(() => {
    if (stringsCache[path]) {
      setStrings(stringsCache[path])
    } else {
      fetchStrings(path).then((strings) => {
        stringsCache[path] = strings
        setStrings(strings)
      }).catch(() => {
        setStrings({})
      })
    }
  }, [])

  return strings
}

export const useHelpMapStrings = () => {
  return useStrings(`${getAnalysisAssetPath()}assets/help/helpmap.json`)
}

export const useGPMessageStrings = (locale: string = getLocaleInfo().locale) => {
  return useStrings(`${getAnalysisAssetPath()}assets/t9n/gpmessage/gpmessage.t9n.${locale ?? 'en-US'}.json`)
}

export const useErrorMessageStrings = (locale: string = getLocaleInfo().locale) => {
  return useStrings(`${getAnalysisAssetPath()}assets/t9n/validation/errors.t9n.${locale ?? 'en-US'}.json`)
}

export const useToolInfoStrings = (locale: string = getLocaleInfo().locale) => {
  const commonStrings = useStrings(`${getAnalysisAssetPath()}assets/t9n/common.t9n.${locale ?? 'en-US'}.json`)
  return React.useMemo(() => {
    return commonStrings ? { ...(commonStrings.toolInfo as LocaleItem || {}), ...(commonStrings.toolInfoKeys as LocaleItem || {}) } : null
  }, [commonStrings])
}

export const useCommonStrings = (locale: string = getLocaleInfo().locale) => {
  return useStrings(`${getAnalysisAssetPath()}assets/t9n/common.t9n.${locale ?? 'en-US'}.json`)
}

export const useWebToolsUnits = () => {
  const commonStrings = useCommonStrings()
  return (commonStrings?.webToolsUnits || {}) as { [key: string]: string }
}

let translatedRFTNamesMapCache = new Map()

export const useTranslatedRFTNamesMap = () => {
  const [translatedRFTNamesMap, setTranslatedRFTNamesMap] = React.useState<Map<string, string>>(translatedRFTNamesMapCache)

  React.useEffect(() => {
    if (translatedRFTNamesMap.size) {
      return
    }
    if (translatedRFTNamesMapCache.size) {
      setTranslatedRFTNamesMap(translatedRFTNamesMap)
      return
    }

    getRFxTranslatedRFTNamesMap().then((names) => {
      setTranslatedRFTNamesMap(names)
      translatedRFTNamesMapCache = names
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return translatedRFTNamesMap
}
