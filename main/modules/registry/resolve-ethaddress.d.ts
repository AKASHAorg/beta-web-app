/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const getByAddress: {
    'id': string;
    'type': string;
    'properties': {
        'ethAddress': {
            'type': string;
            'format': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: ProfileByAddressRequest) => Promise<{}>;
    name: string;
};
export default _default;
