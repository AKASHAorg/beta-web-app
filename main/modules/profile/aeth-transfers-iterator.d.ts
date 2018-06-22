/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const transfersIterator: {
    'id': string;
    'type': string;
    'properties': {
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'limit': {
            'type': string;
        };
        'toBlock': {
            'type': string;
        };
        'lastIndex': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        token: string;
        ethAddress: string;
        limit?: number;
        toBlock: number;
        lastIndex?: number;
        reversed?: boolean;
    }) => Promise<{}>;
    name: string;
};
export default _default;
