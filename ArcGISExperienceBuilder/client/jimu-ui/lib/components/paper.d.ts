/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * The Paper component props.
 */
export interface PaperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * The component used for the root node. Either a string to use an HTML element or a component.
     * @default div
     */
    component?: React.ComponentType<React.ComponentProps<any>>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
}
/**
 * The `Paper` component is a container for displaying content on a surface.
 *
 * ```ts
 * import { Paper } from 'jimu-ui'
 * ```
 */
export declare const Paper: import("@emotion/styled").StyledComponent<PaperProps, {}, {}>;
