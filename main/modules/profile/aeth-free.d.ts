import * as Promise from 'bluebird';
export declare const freeAeth: {
    'id': string;
    'type': string;
    'properties': {
        'token': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        token: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
