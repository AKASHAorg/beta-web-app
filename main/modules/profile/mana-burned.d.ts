/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const manaBurned: {
    'id': string;
    'type': string;
    'properties': {
        'akashaId': {
            'type': string;
        };
        'ethAddress': {
            'type': string;
            'format': string;
        };
    };
};
declare const _default: {
    execute: (a1: {
        akashaId?: string;
        ethAddress?: string;
    }) => Promise<{}>;
    name: string;
};
export default _default;
