/** @jsx jsx */
import { jsx, type UseDataSource, type ImmutableArray } from 'jimu-core';
import { type SearchDataConfig } from '../type/type';
interface LayerSourceSidePopperProps {
    id: string;
    trigger: HTMLElement;
    isOpen: boolean;
    datasourceConfig: ImmutableArray<SearchDataConfig>;
    dsConfigItemIndex: number;
    toggle: () => void;
    updateConfigForLayerOptions: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    onSettingChange: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    useDataSources: ImmutableArray<UseDataSource>;
    popperFocusNode: HTMLElement;
    hideIconSetting: boolean;
    dsStatusChange: (dsId: string, isDsCreateSuccess?: boolean) => void;
}
declare const LayerSourceSidePopper: (props: LayerSourceSidePopperProps) => jsx.JSX.Element;
export default LayerSourceSidePopper;
