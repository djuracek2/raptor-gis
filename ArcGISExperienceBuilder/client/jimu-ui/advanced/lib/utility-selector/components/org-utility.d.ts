/** @jsx jsx */
import { jsx, type UseUtility, type ImmutableArray, type SupportedUtilityType } from 'jimu-core';
interface Props {
    keyword: string;
    serviceTypes: SupportedUtilityType[];
    isMultiple: boolean;
    pattern?: RegExp;
    useUtilities?: ImmutableArray<UseUtility>;
    onChange?: (utilities: ImmutableArray<UseUtility>) => void;
}
export declare function OrgUtilityTree(props: Props): jsx.JSX.Element;
export {};
