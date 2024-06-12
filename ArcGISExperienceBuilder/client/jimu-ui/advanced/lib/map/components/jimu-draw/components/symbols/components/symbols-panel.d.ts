/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { type JimuSymbolType, type JimuSymbol, type JimuPointSymbol, type JimuPolylineSymbol, type JimuPolygonSymbol } from 'jimu-ui/advanced/map';
import { type MeasurementsRuntimeInfo, type MeasurementsUnitsInfo } from '../../measurements/constraints';
export type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol };
export interface Props {
    symbol: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    isShow: boolean;
    onPointSymbolChanged: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged: (symbol: JimuPolygonSymbol) => void;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
    handleMeasurementsInfoChanged: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => void;
    onA11yFocus: () => void;
}
export declare const SymbolsPanel: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
