/** @jsx jsx */
import { jsx, type LinkResult, type ThemeNavType, type IconResult, type ThemeBoxStyles, type Color, type ImmutableArray } from 'jimu-core';
import { type NavProps } from './nav';
import { type IconPosition, type BoxShadowStyle, type LinkTarget } from '../types';
export type IconButtonStyles = Omit<ThemeBoxStyles, 'shadow'> & {
    icon?: {
        size?: string;
        color?: Color;
    };
    size: string;
    shadow: BoxShadowStyle;
};
export interface IconButtonStylesByState {
    default?: IconButtonStyles;
    hover?: IconButtonStyles;
    active?: IconButtonStyles;
    disabled?: IconButtonStyles & {
        opacity?: number;
    };
    focus?: IconButtonStyles;
}
export interface NavigationVariant {
    root?: IconButtonStyles;
    item?: IconButtonStylesByState;
}
export interface NavigationItem extends LinkResult {
    name?: string;
    icon?: IconResult;
    target?: LinkTarget;
    subs?: NavigationItem[];
    navLinkAriaControls?: string;
}
export interface NavigationProps extends Omit<NavProps, 'vertical'> {
    vertical?: boolean;
    isActive?: (value: NavigationItem) => boolean;
    data?: NavigationItem[] | ImmutableArray<NavigationItem>;
    type?: ThemeNavType;
    scrollable?: boolean;
    showText?: boolean;
    showIcon?: boolean;
    showTitle?: boolean;
    isUseNativeTitle?: boolean;
    /**
     * Alternate icons are enabled only when `showIcon` is `true `and no icon is defined in `data[i]`
     */
    alternateIcon?: IconResult;
    /**
      * Active icon will be enabled when item is actived
      */
    activedIcon?: IconResult;
    iconPosition?: IconPosition;
    navLinkRole?: string;
}
export declare const useNavMenuStyle: (gap: string) => import("jimu-core").SerializedStyles;
export declare const Navigation: (props: NavigationProps) => jsx.JSX.Element;
