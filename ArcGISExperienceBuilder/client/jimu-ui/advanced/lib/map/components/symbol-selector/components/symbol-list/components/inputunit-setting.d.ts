/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { type JimuSymbol } from '../index';
export interface InputUnitSettingProps {
    symbol: JimuSymbol;
    opacityPercentage: number;
    onSymbolChanged: (symbol: JimuSymbol) => void;
}
export declare const InputUnitSetting: React.MemoExoticComponent<(props: InputUnitSettingProps) => jsx.JSX.Element>;
