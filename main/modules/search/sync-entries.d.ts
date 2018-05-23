/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const syncEntries: {
    'id': string;
    'type': string;
    'properties': {
        'fromBlock': {
            'type': string;
        };
        'following': {
            'type': string;
            'items': {
                'type': string;
            };
            'uniqueItems': boolean;
            'minItems': number;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        fromBlock: number;
        following: string[];
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
