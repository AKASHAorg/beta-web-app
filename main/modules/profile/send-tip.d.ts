import * as Promise from 'bluebird';
export declare const tip: {
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
        'value': {
            'type': string;
        };
        'tokenAmount': {
            'type': string;
        };
        'message': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        token: string;
        akashaId?: string;
        ethAddress?: string;
        value?: string;
        tokenAmount?: string;
        message?: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
