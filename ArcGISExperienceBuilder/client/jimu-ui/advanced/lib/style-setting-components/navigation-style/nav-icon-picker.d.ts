/// <reference types="react" />
import { React } from 'jimu-core';
import { type IconPickerProps } from 'jimu-ui/advanced/resource-selector';
export interface NavIconPickerProps extends Omit<IconPickerProps, 'groups' | 'customIcons'> {
    size?: number;
}
export declare const NavIconPicker: (props: NavIconPickerProps) => React.JSX.Element;
