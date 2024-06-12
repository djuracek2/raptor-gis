import { type Editor, type RichSelection } from '../../../type';
export declare const useHandleEnter: (editor: Editor) => {
    key: number;
    handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
};
export declare const useHandleTab: (editor: Editor) => {
    key: number;
    handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
};
export declare const useKeyboardBindings: (editor: Editor) => {
    enter: {
        key: number;
        handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
    };
    tab: {
        key: number;
        handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
    };
};
export declare const useKeyboardModule: (editor: Editor) => {
    bindings: {
        enter: {
            key: number;
            handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
        };
        tab: {
            key: number;
            handler: (range: RichSelection, context: any) => [(range: RichSelection, context: any) => void];
        };
    };
};
