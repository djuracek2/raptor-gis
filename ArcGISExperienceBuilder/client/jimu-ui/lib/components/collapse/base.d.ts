/// <reference types="react" />
import { React } from 'jimu-core';
import { type CollapseProps } from 'reactstrap';
export interface BaseCollapsablePanelProps extends Omit<CollapseProps, 'ref'> {
    /**
     * Whether to show the bottom line.
     * @default false
     */
    bottomLine?: boolean;
    /**
     * The header of the component.
     */
    header: React.ReactNode;
}
export declare const BaseCollapsablePanel: (props: BaseCollapsablePanelProps) => React.JSX.Element;
