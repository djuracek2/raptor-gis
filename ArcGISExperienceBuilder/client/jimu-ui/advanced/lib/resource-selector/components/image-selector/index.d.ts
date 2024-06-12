/// <reference types="react" />
import { React, type IntlShape } from 'jimu-core';
import { type ButtonSize, type ImageParam, type ButtonType } from 'jimu-ui';
/**
 * The ImageSelector component props
 */
export interface ImageSelectorProps {
    /**
     * The ID of the widget using this component.
     */
    widgetId: string;
    /** @ignore */
    className?: string;
    /** @ignore */
    buttonClassName?: string;
    /** @ignore */
    buttonStyle?: React.CSSProperties;
    /**
     * The type of the button.
     */
    buttonType?: ButtonType;
    /**
     * The size of this component.
     * @default default
     */
    buttonSize?: ButtonSize;
    /**
     * The label for this component.
     */
    buttonLabel?: string;
    /**
     * The function will be called when the used image is being changed.
     */
    onChange?: (imageParam: ImageParam) => void;
    /** @ignore */
    disabled?: boolean;
    /**
     * Set selected image by default in this component.
     * This prop commonly comes from stored settings or `onChange` callback.
     */
    imageParam?: ImageParam;
    /**
     * If `left`, the side popper is next to left sidebar of builder.
     * If `right`, the side popper is next to right sidebar of builder.
     * @default right
     */
    position?: 'left' | 'right';
    /** @ignore */
    isSupportCrop?: boolean;
    /** @ignore */
    'aria-describedby'?: string;
    /** @ignore */
    'aria-label'?: string;
    /** This attribute is not required, most of the time we won't use it.
     *  And this is a temporary solution for SidePopper.
     *  Please see trigger props describe of SidePopper, they are the same.
     */
    trigger?: HTMLElement | HTMLElement[];
}
/** @ignore */
interface IntlProps {
    intl: IntlShape;
}
/**
 * The ImageSelector component is used to select an image from a file or a URL.
 */
export declare const ImageSelector: import("@emotion/styled").StyledComponent<Omit<ImageSelectorProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
}, {}, {}>;
export {};
