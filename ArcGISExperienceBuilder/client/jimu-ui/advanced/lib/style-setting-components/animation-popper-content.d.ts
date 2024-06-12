/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, jsx, AnimationPlayMode, type AnimationSetting } from 'jimu-core';
interface OwnProps {
    effectSetting: AnimationSetting;
    oneByOneSetting: AnimationSetting;
    onSettingChange: (mode: AnimationPlayMode, setting: AnimationSetting) => void;
    previewEnabled?: boolean;
    supportOneByOne?: boolean;
    supportAsOne?: boolean;
    isRoot?: boolean;
    onPreviewClicked?: (mode: AnimationPlayMode) => void;
    formatMessage: (id: string) => string;
}
interface State {
    asOneOpened: boolean;
    oneByOneOpened: boolean;
}
interface StateToProps {
    selectedWidgetLabel: string;
}
declare class AnimationPopperContent extends React.PureComponent<OwnProps & StateToProps, State> {
    constructor(props: any);
    onAsOneSettingChange: (setting: AnimationSetting) => void;
    onOneByOneSettingChange: (setting: AnimationSetting) => void;
    previewAsOne: () => void;
    previewOneByOne: () => void;
    toggleAsOneOpened: () => void;
    toggleOneByOneOpened: () => void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof AnimationPopperContent, {
    ref?: React.LegacyRef<AnimationPopperContent>;
    key?: React.Key;
    effectSetting: AnimationSetting;
    oneByOneSetting: AnimationSetting;
    isRoot?: boolean;
    supportAsOne?: boolean;
    supportOneByOne?: boolean;
    previewEnabled?: boolean;
    onSettingChange: (mode: AnimationPlayMode, setting: AnimationSetting) => void;
    onPreviewClicked?: (mode: AnimationPlayMode) => void;
    formatMessage: (id: string) => string;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
