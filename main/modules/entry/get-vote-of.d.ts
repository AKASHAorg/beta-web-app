/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const getVoteOf: {
    'id': string;
    'type': string;
    'properties': {
        'list': {
            'type': string;
            'items': {
                'type': string;
                'properties': {
                    'entryId': {
                        'type': string;
                    };
                    'akashaId': {
                        'type': string;
                    };
                    'ethAddress': {
                        'type': string;
                        'format': string;
                    };
                };
                'required': string[];
            };
            'uniqueItems': boolean;
            'minItems': number;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        list: {
            entryId: string;
            akashaId?: string;
            ethAddress?: string;
        }[];
    }) => Promise<{}>;
    name: string;
};
export default _default;
