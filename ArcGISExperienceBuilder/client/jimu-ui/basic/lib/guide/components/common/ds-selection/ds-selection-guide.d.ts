/// <reference types="react" />
import { React, ReactRedux, type ImmutableObject, type ImmutableArray, type DataSourceInfo, type UseDataSource } from 'jimu-core';
import { type GuideProps } from '../../core/guide';
import { type Step, type Steps, type StepOnChangeCallBackProps } from '../../../types';
interface StateToProps {
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: DataSourceInfo;
    }>;
    widgetDs: ImmutableArray<UseDataSource>;
}
export declare const DataSourceSelectionGuide: ReactRedux.ConnectedComponent<(props: GuideProps & StateToProps) => React.JSX.Element, {
    disabled?: boolean;
    className?: string;
    widgetName?: string;
    steps: Steps;
    stepIndex?: number;
    run?: boolean;
    conditionalStepIndexes?: import("../../../types").ConditionalStepIndexes;
    onStepChange?: (data: StepOnChangeCallBackProps) => void;
    onActionClick?: (e: any, step: Step, index: number) => void;
    widgetJson?: import("jimu-core").WidgetJson;
    isInjected?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
export {};
