/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, type DataSource, type IMFieldSchema, type IntlShape, type CodedValue, type ClauseValueOptions, type ClauseValuePair, DataSourceManager, ReactRedux } from 'jimu-core';
import { type ClauseInputEditor } from '../default';
interface Props {
    value: ClauseValueOptions;
    dataSource: DataSource;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    codedValues?: CodedValue[];
    fieldObj?: IMFieldSchema;
    sql?: string;
    style?: React.CSSProperties;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface DatasourceProps {
    datasourceInfo: any;
    datasourceBelongInfo: any;
}
interface State {
    list: any[];
    listWithSetValues: any[];
    codedValues: any[];
    isOpen: boolean;
    isListReady: boolean;
}
export declare class _VIPillSelectorInner extends React.PureComponent<Props & DatasourceProps & IntlProps, State> {
    _isMounted: boolean;
    pillButton: any;
    dsManager: DataSourceManager;
    dataSource: DataSource;
    localDsRandomId: string;
    context: any;
    static contextType: React.Context<import("jimu-ui").QueryScopeContextProps>;
    static count: number;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getDataSource: () => DataSource;
    componentDidUpdate(prevProps: Props & DatasourceProps): void;
    /**
     * Sort value pairs by label.
    */
    sortValuePairs: (valuePairs: any) => any;
    isMultiple: () => boolean;
    i18nMessage: (id: string, values?: any) => string;
    updateList: (fieldObj?: IMFieldSchema) => Promise<void>;
    getListByPageSize: (realCount: number, queriedCount: number, page: number) => Promise<{
        list: CodedValue[];
        reducedCount: number;
    }>;
    getListWithSetValues: (list: any) => any;
    getDisplayLabel: (value: any) => string;
    onTogglePopper: () => void;
    isPillActive: (value: any) => boolean;
    onPillClick: (item: ClauseValuePair, e: any) => void;
    onDisplayChange: (inputEditor: ClauseInputEditor) => void;
    getSkeletons: () => React.JSX.Element;
    getPills: (list: any) => React.JSX.Element;
    render(): React.JSX.Element;
}
export declare const _VIPillSelector: ReactRedux.ConnectedComponent<typeof _VIPillSelectorInner, {
    ref?: React.LegacyRef<_VIPillSelectorInner>;
    style?: React.CSSProperties;
    value: ClauseValueOptions;
    dataSource: DataSource;
    onChange: (valueObj: ClauseValueOptions) => void;
    className?: string;
    key?: React.Key;
    intl: IntlShape;
    runtime: boolean;
    sql?: string;
    fieldObj?: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").FieldSchema> & {
        readonly jimuName: string;
        readonly type: import("jimu-core").JimuFieldType;
        readonly esriType?: import("jimu-core").EsriFieldType;
        readonly name: string;
        readonly alias?: string;
        readonly description?: string;
        readonly format?: import("seamless-immutable").ImmutableObject<import("jimu-core").FieldFormatSchema>;
        readonly originFields?: import("seamless-immutable").ImmutableArray<string>;
    };
    isSmallSize?: boolean;
    codedValues?: CodedValue[];
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").AnyAction>>;
    store?: import("redux").Store<any, import("redux").AnyAction>;
}>;
declare const VIPillSelector: import("@emotion/styled").StyledComponent<Omit<Props & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, {}, {}>;
export default VIPillSelector;
