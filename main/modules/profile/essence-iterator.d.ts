import * as Promise from 'bluebird';
export declare const essenceIterator: {
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
        'lastIndex': {
            'type': string;
        };
        'limit': {
            'type': string;
        };
        'reversed': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        lastBlock?: number;
        limit?: number;
        akashaId?: string;
        ethAddress?: string;
        lastIndex?: number;
        reversed?: boolean;
    }) => Promise<{}>;
    name: string;
};
export default _default;
