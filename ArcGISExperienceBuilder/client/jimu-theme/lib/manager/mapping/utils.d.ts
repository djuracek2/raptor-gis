import { type ImmutableObject, type ThemeVariables, type CustomThemeJson } from 'jimu-core';
export declare const remToPx: (input: string) => string;
export declare const getClassicCustomTheme: (_inputCustomTheme?: CustomThemeJson | ImmutableObject<CustomThemeJson>) => CustomThemeJson;
export declare const createClassicCustomTheme: (overwrite?: CustomThemeJson, customTheme?: ImmutableObject<CustomThemeJson>) => Partial<ThemeVariables>;
