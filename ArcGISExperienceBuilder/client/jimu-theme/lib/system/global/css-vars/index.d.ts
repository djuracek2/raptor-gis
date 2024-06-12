/// <reference types="react" />
import { React } from 'jimu-core';
import type { Theme } from '../../create-theme';
interface CssVarsProviderProps {
    theme?: Theme;
}
export declare const CssVarsProvider: (props: CssVarsProviderProps) => React.JSX.Element;
export {};
