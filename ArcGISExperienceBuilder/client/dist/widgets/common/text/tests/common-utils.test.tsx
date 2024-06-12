import { richTextUtils } from 'jimu-ui'
import { normolizeLineSpace, replacePlaceholderTextContent } from '../src/utils'
import { Delta } from 'jimu-ui/advanced/rich-text-editor'

describe('common utils test', function () {
  it('replacePlaceholderTextContent', () => {
    expect(replacePlaceholderTextContent('<strong>foo</strong>', richTextUtils.BLANK_CHARATER)).toBe('<strong>\uFEFF</strong>')
    expect(replacePlaceholderTextContent('foo', richTextUtils.BLANK_CHARATER)).toBe('\uFEFF')
  })

  it('normolizeLineSpace', () => {
    let delta = new Delta({
      ops: [{
        insert: 'text',
        attributes: {
          linespace: 'normal'
        }
      }]
    })
    expect(normolizeLineSpace(null, delta).ops).toEqual([{
      insert: 'text',
      attributes: {
        linespace: 1.5
      }
    }]
    )
    delta = new Delta({
      ops: [{
        insert: 'text',
        attributes: {
          linespace: '1.2'
        }
      }]
    })
    expect(normolizeLineSpace(null, delta).ops).toEqual([{
      insert: 'text',
      attributes: {
        linespace: '1.2'
      }
    }]
    )
    delta = new Delta({
      ops: [{
        insert: 'text',
        attributes: {
          linespace: 1
        }
      }]
    })
    expect(normolizeLineSpace(null, delta).ops).toEqual([{
      insert: 'text',
      attributes: {
        linespace: 1
      }
    }]
    )
  })
})
