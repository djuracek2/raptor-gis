/// <reference types="react" />
import { React } from 'jimu-core';
import { TreeSelctionStyle } from './tree-types';
export declare const TreeContext: React.Context<{
    isTree: boolean;
    uuid: string;
    selectionStyle: TreeSelctionStyle;
    multiLevel: boolean;
}>;
