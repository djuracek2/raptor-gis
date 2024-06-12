/// <reference types="react" />
/** @jsx jsx */
import { React, type LayoutInfo, jsx, type ImmutableObject, ReactRedux, AnimationPlayMode, type AnimationSetting, TransitionType, type TransitionDirection } from 'jimu-core';
import { type CommonLayoutItemSetting } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    layoutId: string;
    layoutItemId: string;
    onSettingChange?: (layoutInfo: LayoutInfo, setting: any) => void;
    formatMessage: (id: string) => string;
}
interface StateProps {
    setting: ImmutableObject<CommonLayoutItemSetting>;
    isWidget: boolean;
    isLayoutWidget: boolean;
    isSection: boolean;
    transitionType?: TransitionType;
    transitionDirection?: TransitionDirection;
    sectionId?: string;
}
interface State {
    animationType: 'in' | 'transition' | 'hover';
}
declare class LayoutItemAnimationSetting extends React.PureComponent<OwnProps & StateProps, State> {
    modalStyle: any;
    constructor(props: any);
    hasAnimationEffect(): boolean;
    hasHoverEffect(): boolean;
    onTransitionSettingChange: (setting: any) => void;
    onHoverEffectChange: (effect: any) => void;
    onEffectSettingChange: (mode: AnimationPlayMode, efffectSetting: AnimationSetting) => void;
    onSectionOneByOneEffectSettingChange: (efffectSetting: AnimationSetting) => void;
    previewAnimation: (mode: AnimationPlayMode) => void;
    previewTransition: (withOneByOne?: boolean) => void;
    previewTransitionAndOnebyOne: () => void;
    previewOneByOneInSection: () => void;
    previewHover: () => void;
    onPlayModeChange: (mode: AnimationPlayMode) => void;
    switchToIn: () => void;
    switchToTransition: () => void;
    switchToHover: () => void;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof LayoutItemAnimationSetting, {
    ref?: React.LegacyRef<LayoutItemAnimationSetting>;
    layoutId: string;
    layoutItemId: string;
    key?: React.Key;
    onSettingChange?: (layoutInfo: LayoutInfo, setting: any) => void;
    formatMessage: (id: string) => string;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export default _default;
