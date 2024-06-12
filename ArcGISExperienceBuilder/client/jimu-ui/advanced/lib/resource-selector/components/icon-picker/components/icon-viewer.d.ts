/// <reference types="react" />
import { React, type IconResult, type IMIconResult, type IMThemeVariables, type IntlShape, ReactRedux } from 'jimu-core';
import { type PublicIconGroupType, type ConfigurableOption, type PreviewOptions } from '../types';
interface IconViewerProps {
    icon?: IconResult;
    isOpen?: boolean;
    configurableOption?: ConfigurableOption;
    previewOptions?: PreviewOptions;
    groups?: PublicIconGroupType | PublicIconGroupType[] | 'none';
    customIcons?: IconResult[];
    className?: string;
    onButtonClick?: (e: any) => void;
    onChange?: (result: IMIconResult) => void;
    onIconUploadError?: () => void;
}
interface ExtraProps {
    theme?: IMThemeVariables;
    theme2?: IMThemeVariables;
    intl?: IntlShape;
    appId?: string;
}
export declare const IconViewer: ReactRedux.ConnectedComponent<import("@emotion/styled").StyledComponent<Omit<IconViewerProps & ExtraProps & {
    intl: IntlShape;
}, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, {}, {}>, {
    icon?: IconResult;
    onChange?: (result: IMIconResult) => void;
    className?: string;
    isOpen?: boolean;
    forwardedRef?: React.Ref<any>;
    groups?: PublicIconGroupType | PublicIconGroupType[] | 'none';
    configurableOption?: ConfigurableOption;
    previewOptions?: PreviewOptions;
    customIcons?: IconResult[];
    onButtonClick?: (e: any) => void;
    onIconUploadError?: () => void;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export {};
