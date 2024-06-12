/// <reference types="react" />
import { React, type IntlShape } from 'jimu-core';
/**
 * The `AlertPopup` component props.
 */
export interface AlertPopupProps {
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Whether the popup is open.
     */
    isOpen?: boolean;
    /**
     * The title of the popup.
     */
    title?: string;
    /**
     * Whether to show or hide `OK` button.
     */
    hideOK?: boolean;
    /**
     * Whether to show or hide `Cancel` button.
     */
    hideCancel?: boolean;
    /**
     * Whether to show or hide `Header`.
     */
    hideHeader?: boolean;
    /**
     * Toggle to open/close the popup.
     */
    toggle?: (isOk?: boolean) => void;
    /**
     * The label of `OK` button.
     */
    okLabel?: string;
    /**
   * The label of `Cancel` button.
   */
    cancelLabel?: string;
    /**
     * Callback when `Close` button is clicked.
     */
    onClickClose?: () => void;
    /**
     * Callback when `OK` button is clicked.
     */
    onClickOk?: () => void;
    children?: React.ReactNode;
}
interface IntlProps {
    intl: IntlShape;
}
/**
 * The `AlertPopup` component provides the user the ability to display prompt message in modal.
 *
 * ```ts
 * import { AlertPopup } from 'jimu-ui'
 * ```
 */
export declare class _AlertPopup extends React.PureComponent<AlertPopupProps & IntlProps, {
    isOpen: boolean;
}> {
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    handleCloseBtn: () => void;
    handleOkBtn: () => void;
    handleToggle: () => void;
    render(): React.JSX.Element;
}
/**
 * The `AlertPopup` component provides the user the ability to display prompt message in modal.
 *
 * ```ts
 * import { AlertPopup } from 'jimu-ui'
 * ```
 */
export declare const AlertPopup: import("@emotion/styled").StyledComponent<Omit<AlertPopupProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, {}, {}>;
export {};
