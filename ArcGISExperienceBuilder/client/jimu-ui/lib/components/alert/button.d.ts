/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { type AlertButtonSize, type AlertButtonType, type AlertType } from './type';
import { type StandardComponentProps } from '../types';
/**
 * The AlertButton component props.
 */
export interface AlertButtonProps extends StandardComponentProps {
    /**
     * The unique id added to the element.
     */
    id?: string;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Defines the title added to the element.
     */
    title?: string;
    /**
     * The type of `AlertButton`, which will represent different meanings, such as 'warning' and 'error'.
     * @default warning
     */
    type?: AlertType;
    /**
     * Display type of alert button, `tertiary` type represents no background.
     * @default default
     */
    buttonType?: AlertButtonType;
    /**
     * Defines the size of the button.
     * @default medium
     */
    size?: AlertButtonSize;
    /**
     * The `tabIndex` added to the element.
     */
    tabIndex?: number;
    /**
     * Fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.
     */
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    /**
       * Fired at an Element when the cursor of a pointing device (usually a mouse) is moved out of it.
       */
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}
/**
 * A component for the icon button used as an anchor for warning messages.
 */
export declare const AlertButton: React.ForwardRefExoticComponent<AlertButtonProps & React.RefAttributes<HTMLButtonElement>>;
