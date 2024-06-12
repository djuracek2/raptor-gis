import { utils } from 'jimu-core'

const localAppKey = utils.getLocalStorageAppKey()

export const getOldKey = (widgetId, mapWidgetId) => {
  return `${localAppKey}-${widgetId}-${mapWidgetId || 'default'}-RtBmArray`
}

export const getKey = (widgetId, mapWidgetId) => {
  return `${localAppKey}-bookmark-${widgetId}-bookmarks-${mapWidgetId || 'default'}`
}

export const getBookmarkListFromRuntime = (widgetId, mapWidgetId): string[] => {
  const oldKey = getOldKey(widgetId, mapWidgetId)
  const newKey = getKey(widgetId, mapWidgetId)
  return JSON.parse(utils.readLocalStorage(newKey) || utils.readLocalStorage(oldKey)) || []
}

export const emptyBookmarkListFromRuntime = (widgetId, mapWidgetId): void => {
  const oldKey = getOldKey(widgetId, mapWidgetId)
  const newKey = getKey(widgetId, mapWidgetId)
  utils.removeFromLocalStorage(newKey)
  utils.removeFromLocalStorage(oldKey)
}
