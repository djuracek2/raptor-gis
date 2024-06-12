/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { type AlertType } from './type';
import { type StandardComponentProps } from '../types';
/**
 * The AlertPanel component props.
 */
export interface AlertPanelProps extends StandardComponentProps {
    /**
     * The unique id added to the element.
     */
    id?: string;
    /**
     * The type of `AlertButton`, which will represent different meanings, such as 'warning' and 'error'.
     * @default warning
     */
    type?: AlertType;
    /**
     * Text content to display.
     */
    text?: string;
    /**
     * Defines the title added to the element.
     */
    title?: string;
    /**
     * Can the panel be closed.
     * @default false
     */
    closable?: boolean;
    /**
     * Whether to display the icon for the type.
     * @default false
     */
    withIcon?: boolean;
    /**
     * Whether the panel is visible.
     * @default true
     */
    open?: boolean;
    /**
     * Whether to automatically focus on the close button when open.
     * @ignore
     * @default false
     */
    autoFocus?: boolean;
    /**
     * If `cloable` is true, this event will be triggered when the close button is clicked.
     * @event
     */
    onClose?: () => void;
    /**
     * Fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.
     */
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    /**
     * Fired at an Element when the cursor of a pointing device (usually a mouse) is moved out of it.
     */
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    /**
     * Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
     * @default polite
     */
    'aria-live'?: 'off' | 'assertive' | 'polite';
    /**
     * The `tabIndex` added to the element.
     */
    tabIndex?: number;
    /**
     * Defines the children of the element.
     */
    children?: React.ReactNode | undefined;
}
/**
 * A component used to display warning messages.
 */
export declare const AlertPanel: React.ForwardRefExoticComponent<AlertPanelProps & React.RefAttributes<HTMLDivElement>>;
/**
 * The UncontrolledAlertPanel props.
 */
export interface UncontrolledAlertPanelProps extends Omit<AlertPanelProps, 'open' | 'onClose'> {
}
/**
 * An uncontrolled component used to display warning messages.
 */
export declare const UncontrolledAlertPanel: React.ForwardRefExoticComponent<AlertPanelProps & React.RefAttributes<HTMLDivElement>>;
