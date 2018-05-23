/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const isFollower: {
    'id': string;
    'type': string;
    'items': {
        'type': string;
        'properties': {
            'ethAddressFollower': {
                'type': string;
                'format': string;
            };
            'ethAddressFollowing': {
                'type': string;
                'format': string;
            };
            'akashaIdFollower': {
                'type': string;
            };
            'akashaIdFollowing': {
                'type': string;
            };
        };
    };
    'minItems': number;
};
declare const _default: {
    execute: (a1: {
        ethAddressFollower?: string;
        ethAddressFollowing?: string;
        akashaIdFollower?: string;
        akashaIdFollowing?: string;
    }[]) => Promise<{}>;
    name: string;
};
export default _default;
