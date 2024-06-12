/// <reference types="react" />
import { React } from 'jimu-core';
export declare const getAppTheme: () => import("jimu-core").IMThemeVariables;
export declare const useLoadedModuleComponent: <T>(entry: string, name: string) => [boolean, React.ComponentType<T>];
