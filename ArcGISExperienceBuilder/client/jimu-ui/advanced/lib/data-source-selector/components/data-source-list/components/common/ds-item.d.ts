/// <reference types="react" />
import { React, type DataSource, type ImmutableArray, type IntlShape, type UseDataSource, type WidgetJson } from 'jimu-core';
interface Props {
    intl: IntlShape;
    ds: DataSource;
    widgetId?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    isMultiple?: boolean;
    onChange?: (useDataSources: UseDataSource[]) => void;
    onClickDisabledDsItem?: () => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
    className?: string;
}
export default class DsItem extends React.PureComponent<Props, unknown> {
    getWhetherSelected: () => boolean;
    getParentWidget: (widgetId: string) => WidgetJson;
    getUseDsWithoutFields: (useDs: UseDataSource) => UseDataSource;
    getUseDs: () => UseDataSource;
    getDsLabel: (ds: DataSource) => string;
    onItemClick: (e: any) => void;
    onDsSelected: (selectedDs: UseDataSource) => void;
    onDsRemoved: (removedDs: UseDataSource) => void;
    render(): React.JSX.Element;
}
export {};
