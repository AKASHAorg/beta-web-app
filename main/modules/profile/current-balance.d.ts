/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const getBalance: {
    'id': string;
    'type': string;
    'properties': {
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'unit': {
            'type': string;
        };
    };
};
declare const _default: {
    execute: (a1: BalanceRequest) => Promise<{}>;
    name: string;
};
export default _default;
