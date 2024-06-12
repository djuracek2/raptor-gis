import { type UseDataSource, type IMSqlExpression, type ImmutableObject } from 'jimu-core';
export interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: IMSqlExpression;
    enabledDataRelationShip?: boolean;
    enableQueryWithCurrentExtent?: boolean;
}
export type IMConfig = ImmutableObject<Config>;
