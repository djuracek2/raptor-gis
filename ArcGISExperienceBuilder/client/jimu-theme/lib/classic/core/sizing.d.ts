import { type ThemeSize, type ThemeSizes } from 'jimu-core';
export declare const spacer: ThemeSize;
export declare const sizes: ThemeSizes;
export declare function calculateSizes(newSpacer?: ThemeSize): ThemeSizes;
export declare const gutters: ThemeSizes;
export declare function calculateGutters(newSpacer?: ThemeSize): Omit<ThemeSizes, 6>;
export declare const createSizes: (spacer: string, options?: ThemeSizes) => ThemeSizes;
export declare const createGutters: (spacer: string, options?: ThemeSizes) => Omit<ThemeSizes, 6>;
