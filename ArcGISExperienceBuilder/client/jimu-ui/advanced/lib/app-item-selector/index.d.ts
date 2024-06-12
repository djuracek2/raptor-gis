import { type AppInfo } from 'jimu-core';
import { type DropdownButtonProps, type DropdownMenuProps, type PositioningStrategy } from 'jimu-ui';
interface AppItemSelectorProps {
    /**
     * Callback fired when the item is checked or unchecked.
     */
    portalUrl: string;
    /** @ignore */
    className?: string;
    /**
     * The types of item
     */
    itemtype?: string;
    /**
     * Do not search for items of this type
     */
    excludeType?: string;
    /**
     * Active items
     */
    activeItem?: ActiveItem;
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * Callback fired when the item is checked or unchecked.
     */
    onChange?: (valueObj: AppInfo) => void;
    /**
     * See {@link DropdownButtonProps} for details.
     */
    title?: string;
    /**
     * Whether to hide search input.
     * @default false
     */
    hideSearchInput?: boolean;
    /**
     * Defines the size of the dropdown button.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * See {@link DropdownButtonProps} for details.
     */
    'aria-label'?: string;
    /**
     * See {@link DropdownButtonProps} for details.
     */
    'a11y-description'?: string;
    /**
     * Applies to the internal DropdownButton component, except `size` property.
     * See {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'>;
    /**
     * Applies to the internal DropdownMenu component.
     * See {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     * Control multi-select's z-index,
     * but if appendToBody is true, it'll be invalid
     */
    zIndex?: number;
    /**
     * If `true`, the dropdown will take the full width of its parent container.
     */
    fluid?: boolean;
    /**
     * See {@link DropdownProps} for details.
     */
    autoWidth?: boolean;
    /**
     * Whether to put dropdown menu to body by ReactDOM.createPortal
     * @default true
     */
    appendToBody?: boolean;
    /**
     * Describes the positioning strategy to use.
     * @default absolute
     */
    strategy?: PositioningStrategy;
    /**
     * Whether to trigger click event in onkeyUp stage for `DropdownButton` and `DropdownItem`.
     * @default false
     * @ignore
     */
    useKeyUpEvent?: boolean;
}
export interface ActiveItem {
    id: string;
    title?: string;
}
export declare const AppItemSelector: import("@emotion/styled").StyledComponent<AppItemSelectorProps, {}, {}>;
export {};
