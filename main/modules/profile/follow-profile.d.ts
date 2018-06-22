/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const followProfile: {
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
        'token': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: ProfileFollowRequest, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
