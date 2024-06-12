/** @jsx jsx */
import { jsx } from 'jimu-core';
import { type NavigationVariant } from 'jimu-ui';
export type ComponentState = 'default' | 'hover' | 'active' | 'disabled';
/**
 * The `NavStyleSettingByState` components props.
 */
export interface NavStyleSettingByStateProps {
    /**
     * The value of this component.
     */
    variant?: NavigationVariant;
    /**
     * Callback when values change.
     */
    onChange?: (state: ComponentState, key: string, value: any) => void;
    /**
     * Specifies the state of the setting.
     */
    states?: ComponentState[];
    /**
     * Whether to display icon-related settings.
     */
    icon?: boolean;
    /**
     * Whether to display text-related settings.
     */
    text?: boolean;
    /**
     * Whether to display icon related settings in text settings.
     */
    iconInText?: boolean;
    /**
     * For border settings, whether to only set its color.
     */
    onlyBorderColor?: boolean;
}
/**
 * The `NavStyleSettingByState` component is used to provide the user the ability to setting styles for nav related widget.
 *
 * Note: use in Builder only.
 */
export declare const NavStyleSettingByState: (props: NavStyleSettingByStateProps) => jsx.JSX.Element;
