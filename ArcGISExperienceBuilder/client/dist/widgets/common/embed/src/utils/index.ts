import { type ExpressionPart, type IMExpressionMap } from 'jimu-core'

/**
 * Get expression parts from expressions
 * @param {IMExpressionMap} expressions
 */
export const getExpressionParts = (expressions: IMExpressionMap): ExpressionPart[] => {
  let parts = []
  for (const uniqueid in expressions) {
    const expression = expressions[uniqueid]
    const iparts = expression?.parts
    if (iparts != null) {
      parts = parts.concat(iparts)
    }
  }
  return parts
}

/**
 * Function to get embed url from embed code.
 * @param {string} embedCode embed code
 * @returns {string} embed url
 */
export const getUrlByEmbedCode = (embedCode: string) => {
  let embedUrl = ''
  // Youtube, Facebook, Vimeo and other common iframe embedded websites
  const regIframe = /<iframe\s+[^>]*src=['"]([^'"]+)[^>](.*)/gi
  // Instagram
  const regIns = /<blockquote [^>]*data-instgrm-permalink=['"]([^'"]+)[^>]*>(.*)<\/blockquote>/gi
  // Twitter
  const regTweet = /<blockquote class="twitter-tweet"(.*)<\/blockquote>/gi
  const regTimeLine = /<a class="twitter-timeline" [^>]*href=['"]([^'"]+)[^>]*>(.*)<\/a>/gi
  const regHref = /<a [^>]*href=['"]([^'"]+)[^>]*>/gi

  const regTweetTheme = /<blockquote [^>]*data-theme=['"]([^'"]+)[^>]*>(.*)<\/blockquote>/gi
  const regTweetLang = /<blockquote [^>]*data-lang=['"]([^'"]+)[^>]*>(.*)<\/blockquote>/gi
  const regTimelineTheme = /<a [^>]*data-theme=['"]([^'"]+)[^>]*>(.*)<\/a>/gi
  const regTimelineLang = /<a [^>]*data-lang=['"]([^'"]+)[^>]*>(.*)<\/a>/gi

  if (regIframe.test(embedCode)) {
    embedCode.replace(regIframe, (match, capture) => {
      embedUrl = capture
      return match
    })
  } else if (regIns.test(embedCode)) {
    embedCode.replace(regIns, (match, capture) => {
      const preUrl = capture.substr(0, capture.indexOf('?'))
      embedUrl = `${preUrl}embed`
      return match
    })
  } else if (regTweet.test(embedCode)) {
    embedCode.replace(regHref, (match, capture) => {
      if (capture.includes('twitter.com')) {
        const tweetId = capture.substring(capture.lastIndexOf('/') + 1).replace(/[?].*$/, '')
        const themeArr = regTweetTheme.exec(embedCode)
        const langArr = regTweetLang.exec(embedCode)
        let theme, lang
        if (themeArr?.length > 1) theme = themeArr[1]
        if (langArr?.length > 1) lang = langArr[1]
        embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}${theme ? `&theme=${theme}` : ''}${lang ? `&lang=${lang}` : ''}`
      }
      return match
    })
  } else if (regTimeLine.test(embedCode)) {
    embedCode.replace(regHref, (match, capture) => {
      if (capture.includes('twitter.com')) {
        const screenName = capture.substring(capture.lastIndexOf('/') + 1).replace(/[?].*$/, '')
        const themeArr = regTimelineTheme.exec(embedCode)
        const langArr = regTimelineLang.exec(embedCode)
        let theme, lang
        if (themeArr?.length > 1) theme = themeArr[1]
        if (langArr?.length > 1) lang = langArr[1]
        const questionMark = (theme || lang) ? '?' : ''
        embedUrl = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${screenName}${questionMark}${theme ? `&theme=${theme}` : ''}${lang ? `&lang=${lang}` : ''}`
      }
      return match
    })
  }
  if (embedUrl.toLocaleLowerCase().trim().startsWith('javascript:')) embedUrl = ''
  return embedUrl
}

/**
 * Function to get width/height from embed code.
 * @param {string} embedCode embed code
 * @returns {{widht: string, height: string}} width and height from iframe
 */
export const getParamsFromEmbedCode = (embedCode: string) => {
  // Youtube, Facebook, Vimeo and other common iframe embedded websites
  // const regIframe = /<iframe [^>]*src=['"]([^'"]+)[^>](.*)/gi
  const regIframeWidth = /<iframe [^>]*width=['"]([^'"]+)[^>]*>(.*)<\/iframe>/gi
  const regIframeHeight = /<iframe [^>]*height=['"]([^'"]+)[^>]*>(.*)<\/iframe>/gi
  const widthArr = regIframeWidth.exec(embedCode)
  const heightArr = regIframeHeight.exec(embedCode)
  let width, height
  if (widthArr?.length > 1) width = widthArr[1]
  if (heightArr?.length > 1) height = heightArr[1]
  return { width, height }
}
