/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const followersIterator: {
    'id': string;
    'type': string;
    'properties': {
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'akashaId': {
            'type': string;
        };
        'lastBlock': {
            'type': string;
        };
        'limit': {
            'type': string;
        };
        'totalLoaded': {
            'type': string;
        };
    };
};
declare const _default: {
    execute: (a1: {
        lastBlock?: number;
        limit?: number;
        akashaId?: string;
        ethAddress?: string;
        lastIndex?: number;
        totalLoaded?: number;
    }) => Promise<{}>;
    name: string;
};
export default _default;
