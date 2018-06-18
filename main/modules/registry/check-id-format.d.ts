/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const checkIdFormat: {
    'id': string;
    'type': string;
    'properties': {
        'akashaId': {
            'type': string;
            'minLength': number;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: ProfileExistsRequest) => Promise<{}>;
    name: string;
};
export default _default;
