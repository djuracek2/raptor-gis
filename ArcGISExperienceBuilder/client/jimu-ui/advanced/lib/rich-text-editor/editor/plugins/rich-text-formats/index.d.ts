import { React } from 'jimu-core';
import { type RichTextFormatsPanelPorps } from './rich-formats';
import { type RichPluginRequiredProps } from '../plugin';
/**
 * The `RichTextFormats` component props.
 */
export interface RichTextFormatProps extends RichPluginRequiredProps, Omit<RichTextFormatsPanelPorps, 'onChange' | 'disableLink' | 'disableIndent'> {
}
/**
 * The `RichTextFormats` component is used to provide the user the ability to format rich text,
 * which must be used with component `RichTextEditor`.
 *
 * Note: This component can only be used in `Builder`.
 */
export declare const RichTextFormats: (props: RichTextFormatProps) => React.ReactElement;
