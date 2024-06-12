import { React, lodash } from 'jimu-core'
import { RichTextFormats as JimuRichTextFormats, type RichTextFormatProps, useEditorSelectionFormats } from 'jimu-ui/advanced/rich-text-editor'

interface Props extends Omit<RichTextFormatProps, 'selection' | 'formats'> {}

export const RichTextFormats = (props: Props): React.ReactElement => {
  const { editor, ...others } = props
  const [_formats, selection] = useEditorSelectionFormats(editor, true)

  const formats = React.useMemo(() => {
    let formats = _formats
    if (formats?.link?.link != null) {
      formats = lodash.assign({}, formats, { link: formats.link.link })
    }
    return formats
  }, [_formats])

  return (
    <JimuRichTextFormats
      editor={editor}
      formats={formats}
      selection={selection}
      {...others}
    />
  )
}
