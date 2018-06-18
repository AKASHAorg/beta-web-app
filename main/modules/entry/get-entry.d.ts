/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const getEntry: {
    'id': string;
    'type': string;
    'properties': {
        'entryId': {
            'type': string;
        };
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'akashaId': {
            'type': string;
        };
        'full': {
            'type': string;
        };
    };
    'required': string[];
};
export declare const findAuthor: (a1: string) => Promise<{}>;
declare const _default: {
    execute: (a1: EntryGetRequest) => Promise<{}>;
    name: string;
};
export default _default;
