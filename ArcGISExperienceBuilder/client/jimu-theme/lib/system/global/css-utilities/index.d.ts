/// <reference types="react" />
import { React } from 'jimu-core';
import { type Theme } from '../../create-theme';
interface CssUtilitiesProviderProps {
    theme?: Theme;
}
export declare const CssUtilitiesProvider: (props: CssUtilitiesProviderProps) => React.JSX.Element;
export declare const classesUtils: {
    colorsUtilities: (colors: import("../..").ColorScheme) => {
        [x: string]: any;
    };
    borderColorUtilities: (theme: Theme) => {
        [x: string]: any;
    };
    spacingUtilities: (spacing: import("../..").Spacing) => {};
    shadowUtilities: (inputShadows: import("../..").Shadow) => {};
    shapeUtilities: <T extends object>(shape: T) => {
        '.rounded-0': {
            borderRadius: string;
        };
    };
    typographyUtilities: <T_1 extends object>(typography: T_1) => {};
};
export {};
