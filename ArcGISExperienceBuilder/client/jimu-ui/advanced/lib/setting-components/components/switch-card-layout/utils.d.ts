import { type IMAppConfig } from 'jimu-core';
import { type CardLayout, type Status } from './type';
export interface SwitchCardLayoutOption {
    layout: CardLayout;
    config: any;
    widgetId: string;
    appConfig: IMAppConfig;
    status: Status;
    regularLayoutId?: string;
    desLayoutId?: string;
    label?: string;
    isCardWidget?: boolean;
}
export declare const setLayoutAuto: (option: SwitchCardLayoutOption) => void;
export declare const setLayoutCustom: (option: SwitchCardLayoutOption) => void;
