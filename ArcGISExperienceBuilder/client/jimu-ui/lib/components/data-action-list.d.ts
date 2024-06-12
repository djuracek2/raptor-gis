/// <reference types="react" />
/** @jsx jsx */
import { React, type IMThemeVariables, type DataRecordSet, type ThemeButtonType } from 'jimu-core';
import { type ButtonSize } from './button';
export declare enum DataActionListStyle {
    IconList = "ICON_LIST",
    List = "LIST",
    Dropdown = "DROPDOWN"
}
export declare enum IconListDirection {
    Horizontal = "HORIZONTAL",
    Vertical = "VERTICAL"
}
interface Props {
    /** The widget id that is using this data-action list */
    widgetId: string;
    /** The dataSets used for generating data-action list */
    dataSets: DataRecordSet[];
    /** The data-action-list style, could be 'list', 'icon-list' or 'dropdown' */
    listStyle?: DataActionListStyle;
    /** The dropdown-button type */
    buttonType?: ThemeButtonType;
    /** The dropdown-button size */
    buttonSize?: ButtonSize;
    /** The icon list's direction, the list could be horizontal or vertical */
    iconListDirection?: IconListDirection;
    /** Hide the dataSource level actions */
    disableDataSourceLevelActions?: boolean;
    /** Hide the group title when there is ONLY one group type */
    hideGroupTitle?: boolean;
    /** Return null when no action is supported */
    shouldHideEmptyList?: boolean;
    /** Fired when the actual leaf action node is clicked */
    onActionListItemClick?: () => void;
    /** Always display the dropdown icon in batch-style even if there's only one dataSet */
    alwaysShowBatchIcon?: boolean;
    /** The node used as the reference node for the list mode's popper */
    actionPanelRefDOM?: HTMLElement;
}
/** This component displays available DataAction in an list, icon-list or dropdown style.
 * Widgets that need to use DataAction can use this component.
 * To display in a specific style, just pass `listStyle` with 'list', 'icon-list' or 'dropdown'
 *
 * You can use this component by:
 *
 * `import { DataActionList } from 'jimu-ui'`
 */
export declare const DataActionList: React.ForwardRefExoticComponent<Pick<Props, keyof Props> & {
    theme?: IMThemeVariables;
}>;
export {};
