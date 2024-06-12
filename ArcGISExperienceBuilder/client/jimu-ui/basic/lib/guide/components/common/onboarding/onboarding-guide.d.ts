/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, jsx, PageMode, type ImmutableObject, type UrlParameters } from 'jimu-core';
import { type GuideProps } from '../../core/guide';
import { type Step, type Steps, type ConditionalStepIndexes } from '../../../types';
interface StateToProps {
    queryObject: ImmutableObject<UrlParameters>;
    pageMode: PageMode;
}
interface State {
    stepIndex: number;
    steps: Steps;
    conditionalStepIndexes: ConditionalStepIndexes;
    run: boolean;
}
export declare class _OnboardingGuide extends React.PureComponent<GuideProps & StateToProps, State> {
    private readonly currentStep;
    constructor(props: any);
    componentDidUpdate(prevProps: GuideProps & StateToProps): void;
    private readonly handleChange;
    private readonly handleClick;
    render(): jsx.JSX.Element;
}
export declare const OnboardingGuide: ReactRedux.ConnectedComponent<typeof _OnboardingGuide, {
    ref?: React.LegacyRef<_OnboardingGuide>;
    disabled?: boolean;
    className?: string;
    key?: React.Key;
    widgetName?: string;
    steps: Steps;
    stepIndex?: number;
    run?: boolean;
    conditionalStepIndexes?: ConditionalStepIndexes;
    onStepChange?: (data: import("../../../types").StepOnChangeCallBackProps) => void;
    onActionClick?: (e: any, step: Step, index: number) => void;
    widgetJson?: import("jimu-core").WidgetJson;
    isInjected?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export {};
