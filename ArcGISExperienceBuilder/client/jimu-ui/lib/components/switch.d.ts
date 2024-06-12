/// <reference types="react" />
import { React } from 'jimu-core';
import { type SwitchBaseProps } from './_switchBase';
/**
 * The Switch component props.
 */
export interface SwitchProps extends Omit<SwitchBaseProps, 'size' | 'indeterminate' | 'tag' | 'htmlSize' | 'innerRef'> {
    /**
     * To define the size of the switch component.
     * @default default
     */
    size?: 'default' | 'sm';
}
/**
 * The `Switch` component provides the user the ability to toggle the state of a single setting on and off.
 *
 * ```ts
 * import { Switch } from 'jimu-ui'
 * ```
 */
export declare const _Switch: {
    (props: SwitchProps): React.JSX.Element;
    displayName: string;
};
/**
 * The `Switch` component provides the user the ability to toggle the state of a single setting on and off.
 *
 * ```ts
 * import { Switch } from 'jimu-ui'
 * ```
 */
export declare const Switch: import("@emotion/styled").StyledComponent<SwitchProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
