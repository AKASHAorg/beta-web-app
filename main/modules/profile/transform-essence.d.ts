/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const transformEssence: {
    'id': string;
    'type': string;
    'properties': {
        'amount': {
            'type': string;
        };
        'token': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        amount: string;
        token: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
