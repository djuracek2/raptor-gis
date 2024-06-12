/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, type IMLayoutItemJson } from 'jimu-core';
interface Props {
    area?: number;
    layoutId: string;
    layoutItem: IMLayoutItemJson;
}
export declare class FloatingAreaChooser extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    topLeft: () => void;
    topCenter: () => void;
    topRight: () => void;
    middleLeft: () => void;
    middleCenter: () => void;
    middleRight: () => void;
    bottomLeft: () => void;
    bottomCenter: () => void;
    bottomRight: () => void;
    constructor(props: any);
    updateFloatingArea(value: number): void;
    getSizeOfItem(): ClientRect;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
