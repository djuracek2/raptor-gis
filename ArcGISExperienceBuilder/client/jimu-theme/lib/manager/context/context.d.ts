/// <reference types="react" />
import { React, type IMThemeVariables } from 'jimu-core';
export interface ThemeProviderProps {
    /**
     * Theme variable for the current iframe.
     */
    theme: IMThemeVariables;
    /**
     * The theme variable for another iframe.
     * In the app-in-builder env, this variable points to the builder.
     * In the builder env, this variable points to the app.
     * In a single app env, this variable is null.
     */
    theme2?: IMThemeVariables;
    /**
     * The children of this component
     */
    children: React.ReactNode;
}
export declare const UseTheme2Context: React.Context<boolean>;
export declare const ClassicThemeFirstContext: React.Context<boolean>;
/**
 * The sub-components can be switched between two themes.
 * Note: `ThemeSwitcher` can only be used in the app in the builder environment.
 */
export declare const ThemeSwitcher: ({ children, useTheme2 }: {
    children: any;
    useTheme2?: boolean;
}) => React.JSX.Element;
export declare const Theme2Context: React.Context<IMThemeVariables>;
export declare const ThemeProvider: (props: ThemeProviderProps) => React.JSX.Element;
/**
 * Whether to use theme2.
 */
export declare const useUseTheme2: () => boolean;
/**
 * A React hook that provides the current theme as its value.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare const useTheme: () => IMThemeVariables;
/**
 * A React hook that provides the theme2 as its value.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare const useTheme2: () => IMThemeVariables;
/**
 * A React hook that get all theme values.
 */
export declare const useMultiThemeValue: () => {
    theme: IMThemeVariables;
    theme2?: IMThemeVariables;
    useTheme2: boolean;
};
/**
 * A React hook that provides the current theme as its value.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare const useMultiTheme: (multiTheme?: boolean) => {
    theme: IMThemeVariables;
    theme2?: IMThemeVariables;
    useTheme2: boolean;
};
