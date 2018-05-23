/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const getCommentsCount: {
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
    };
};
declare const _default: {
    execute: (a1: GetFollowerCountRequest) => Promise<{}>;
    name: string;
};
export default _default;
