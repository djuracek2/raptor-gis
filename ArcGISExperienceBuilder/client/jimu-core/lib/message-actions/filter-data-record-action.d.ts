/// <reference types="seamless-immutable" />
import { AbstractMessageAction, MessageType, type Message, type MessageDescription } from '../message/message-base-types';
import { type DataSource } from '../data-sources/interfaces';
import { type UseDataSource } from '../../lib/types/app-config';
import { type ImmutableObject } from '../../index';
import { type SqlExpression } from '../types/sql-expression';
interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: any;
    enabledDataRelationShip?: boolean;
    enableQueryWithCurrentExtent?: boolean;
}
export type IMConfig = ImmutableObject<Config>;
export default class Action extends AbstractMessageAction {
    name: string;
    private lastMessage;
    private lastActionConfig;
    private readonly actionQuerySQLExpression;
    filterMessageDescription(messageDescription: MessageDescription): boolean;
    filterMessage(message: Message): boolean;
    getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string;
    onRemoveListen(messageType: MessageType, messageWidgetId?: string): void;
    concatQuerySqlExpressionOfSameAction: (message: Message, actionUseDataSourceId: string) => SqlExpression;
    getQuerySqlExpressionWidthOtherQuery: (message: Message, actionUseDataSourceId: string, SqlExpression: SqlExpression, isOnlyGetOtherActionQuerySQL?: boolean) => SqlExpression;
    getQueryWhenUseDataRelationShip: (message: Message, actionConfig: IMConfig, actionDataSource: DataSource) => {
        outFields: any[] | import("seamless-immutable").ImmutableArray<string>;
        where: any;
        returnGeometry: boolean;
        sqlExpression: any;
    };
    getQueryWhenNotUseDataRelationShip: (message: Message, actionConfig: IMConfig, actionDataSource: DataSource) => {
        outFields: any[] | import("seamless-immutable").ImmutableArray<string>;
        where: any;
        returnGeometry: boolean;
        sqlExpression: any;
    };
    onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean>;
}
export {};
