/// <reference types="react" />
import { React } from 'jimu-core';
import { type IconButtonStyles } from 'jimu-ui';
export interface IconStyleSettingProps {
    variant?: IconButtonStyles;
    onChange?: (property: string, value: any) => void;
}
export declare const IconStyleSetting: (props: IconStyleSettingProps) => React.JSX.Element;
