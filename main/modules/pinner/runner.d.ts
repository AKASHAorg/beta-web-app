/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare enum ObjectType {
    PROFILE = 1,
    ENTRY = 2,
    COMMENT = 3,
}
export declare enum OperationType {
    ADD = 1,
    REMOVE = 2,
}
declare const _default: {
    execute: (a1: {
        type: ObjectType;
        id: any;
        operation: OperationType;
    }) => Promise<{}>;
    name: string;
};
export default _default;
