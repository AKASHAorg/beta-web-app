import * as Promise from 'bluebird';
export declare const fetchRegistered: {
    'id': string;
    'type': string;
    'properties': {
        'toBlock': {
            'type': string;
        };
        'limit': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        toBlock: number;
        limit?: number;
    }) => Promise<{}>;
    name: string;
};
export default _default;
