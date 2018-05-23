/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const resolveProfileIpfsHash: {
    'id': string;
    'type': string;
    'properties': {
        'ipfsHash': {
            'type': string;
            'items': {
                'type': string;
                'format': string;
            };
            'uniqueItems': boolean;
            'minItems': number;
        };
        'full': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        ipfsHash: string[];
        full?: boolean;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
