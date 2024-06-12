/// <reference types="systemjs" />
import type JimuConfig from './jimu-config';
import type * as Bowser from 'bowser';
import { type WidgetManifest } from './manifest';
import { type IMThemeVariables } from './theme';
import type React from 'react';
import { type SVGProps } from 'jimu-ui';
interface Pubsub {
    publish: (message: string, data?: any) => void;
    publishSync: (message: string, data?: any) => void;
    subscribe: (message: string, fun: (message: string, data?: any) => void) => void;
    unsubscribe: (any: any) => void;
}
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        __webpack_public_path: string;
        __karma__: any;
        _builderPubsub: Pubsub;
        _widgetManager: any;
        _widgetSettingManager: any;
        _extensionManager: any;
        _dataSourceManager: any;
        _utilityManager: any;
        _appDataSourceManager: any;
        _mapViewManager: any;
        _messageManager: any;
        _appResourceManager: any;
        _sessionManager: any;
        _mutableStoreManager: any;
        _serviceManager: any;
        _dataActionManager: any;
        _widgetDataSourceQueryManager: any;
        _guideManager: any;
        _checkAppConfig: any;
        _appStore: any;
        _appState: any;
        _getCleanAppConfig: any;
        _dragging_widget_item: any;
        _appWindow: Window;
        _cachedModules: any;
        _jimuHistory: any;
        _cachedRequests: any;
        SystemJS: typeof System;
        jimuConfig: JimuConfig;
        env: string;
        jimuUA: Bowser.Parser.ParsedResult;
        dojoConfig?: any;
        locale: string;
        widgetsManifest: {
            [uri: string]: WidgetManifest;
        };
        runtimeInfo: {
            widgets: {
                [widgetId: string]: any;
            };
            animationPlayId?: number;
        };
        _theme?: IMThemeVariables;
        SVG?: React.MemoExoticComponent<React.ForwardRefExoticComponent<SVGProps>>;
    }
}
export {};
