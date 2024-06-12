export type ComponentsVars = {
    [Name in keyof ComponentsVarsList]?: Partial<ComponentsVarsList[Name]>;
};
export interface ComponentsVarsList {
    header: {
        root: {
            color?: string;
            bg?: string;
        };
    };
    footer: {
        root: {
            color?: string;
            bg?: string;
        };
    };
}
