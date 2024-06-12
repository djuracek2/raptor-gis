/// <reference types="react" />
import { React } from 'jimu-core';
import { type JimuDrawUIOptions } from '..';
export interface LayoutContextStates {
    enableSymbolSelectorFunRef: (enableFlag: boolean) => void;
    uiOptions: JimuDrawUIOptions;
    disableSymbolSelector: boolean;
    isExpandSymbolList: boolean;
    symbolsWapperPositionRef: Element;
}
interface LayoutContexAction {
    type: string;
    payload: any;
}
export declare const actionType: {
    UIOptionsChanged: string;
    DisableSymbolSelectorChanged: string;
    IsExpandSymbolListChanged: string;
    SymbolsWapperPositionRefChanged: string;
};
export declare const UIOptionsChangedAction: (uiOptions: JimuDrawUIOptions) => {
    type: string;
    payload: JimuDrawUIOptions;
};
export declare const DisableSymbolSelectorChangedAction: (disableSymbolSelector: boolean) => {
    type: string;
    payload: boolean;
};
export declare const IsExpandSymbolListChangedAction: (isExpand: boolean) => {
    type: string;
    payload: boolean;
};
export declare const SymbolsWapperPositionRefChangedAction: (ref: Element) => {
    type: string;
    payload: Element;
};
export declare const init: (initStates: any) => LayoutContextStates;
export declare const reducer: (state: LayoutContextStates, action: LayoutContexAction) => {
    uiOptions: any;
    enableSymbolSelectorFunRef: (enableFlag: boolean) => void;
    disableSymbolSelector: boolean;
    isExpandSymbolList: boolean;
    symbolsWapperPositionRef: Element;
} | {
    disableSymbolSelector: any;
    enableSymbolSelectorFunRef: (enableFlag: boolean) => void;
    uiOptions: JimuDrawUIOptions;
    isExpandSymbolList: boolean;
    symbolsWapperPositionRef: Element;
} | {
    isExpandSymbolList: any;
    enableSymbolSelectorFunRef: (enableFlag: boolean) => void;
    uiOptions: JimuDrawUIOptions;
    disableSymbolSelector: boolean;
    symbolsWapperPositionRef: Element;
} | {
    symbolsWapperPositionRef: any;
    enableSymbolSelectorFunRef: (enableFlag: boolean) => void;
    uiOptions: JimuDrawUIOptions;
    disableSymbolSelector: boolean;
    isExpandSymbolList: boolean;
};
export declare const LayoutContext: React.Context<{
    layoutContextStates: LayoutContextStates;
    dispatchLayoutActions: React.Dispatch<LayoutContexAction>;
}>;
export declare const LayoutContextProvider: (props: any) => React.JSX.Element;
export {};
