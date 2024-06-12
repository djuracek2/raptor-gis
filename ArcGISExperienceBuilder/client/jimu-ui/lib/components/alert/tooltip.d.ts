/// <reference types="react" />
import { React } from 'jimu-core';
import { type Placement } from '../overlay';
import { type TooltipProps } from '../tooltip/tooltip';
import { type AlertButtonProps } from './button';
interface _AlertTooltipProps extends AlertButtonProps {
    /**
     * Text content to display.
     */
    text?: string;
    /**
     * The placement of the tooltip.
     * @default bottom
     */
    placement?: Placement;
    /**
     * Defines the children of the element.
     */
    children?: React.ReactNode | undefined;
}
/**
 * The AlertTooltip component props.
 */
export type AlertTooltipProps = _AlertTooltipProps & Pick<TooltipProps, 'showArrow' | 'interactive' | 'leaveDelay'>;
/**
 * A component that displays warning messages in the form of tooltips.
 */
export declare const AlertTooltip: React.ForwardRefExoticComponent<_AlertTooltipProps & Pick<TooltipProps, "showArrow" | "interactive" | "leaveDelay"> & React.RefAttributes<HTMLButtonElement>>;
export {};
