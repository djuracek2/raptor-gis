import { createIntl } from 'jimu-core'
import { getGroupName } from '../src/setting/utils'
import { defaultMessages } from 'jimu-ui'

const intl = createIntl({
  locale: 'en',
  defaultLocale: 'en',
  messages: defaultMessages
})

const i18nMessage = (id: string, values?: any) => {
  return intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }, values)
}

describe('setting utils', function () {
  describe('getGroupName', function () {
    it('use custom label if it exists.', function () {
      const fItems = [
        { isGroup: true, name: 'Group 3' },
        { isGroup: false, name: 'Group 7' }
      ]
      const label = getGroupName(fItems as any, { name: 'Group name' } as any, i18nMessage)
      expect(label).toEqual('Group name')
    })
    it('get biggest num from group items, ignore single items.', function () {
      const fItems = [
        { isGroup: true, name: 'Group 3' },
        { isGroup: true, name: 'Group 4' },
        { isGroup: false, name: 'Group 7' },
        { isGroup: false, name: 'Group 9' }
      ]
      const label = getGroupName(fItems as any, null, i18nMessage)
      expect(label).toEqual('Group 5')
    })
    it('get bigger num from group items, only when item prefix equals "Group" exactly.', function () {
      const fItems = [
        { isGroup: true, name: 'Group abc 3' },
        { isGroup: true, name: 'abc Group 4' },
        { isGroup: true, name: 'Group 1' }
      ]
      const label = getGroupName(fItems as any, null, i18nMessage)
      expect(label).toEqual('Group 2')
    })
  })
})
