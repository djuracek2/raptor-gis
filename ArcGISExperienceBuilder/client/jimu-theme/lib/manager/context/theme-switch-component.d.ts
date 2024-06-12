/// <reference types="react" />
import { React } from 'jimu-core';
interface ThemeSwitchComponentProps {
    useTheme2?: boolean;
    children: React.ReactNode;
}
/**
 * Used to create a context area that can switch between `theme` and `theme2`.
 */
export declare const ThemeSwitchComponent: (props: ThemeSwitchComponentProps) => React.JSX.Element;
export {};
