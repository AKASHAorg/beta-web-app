/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const syncTags: {
    'id': string;
    'type': string;
    'properties': {
        'fromBlock': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        fromBlock: number;
    }) => Promise<{}>;
    name: string;
};
export default _default;
