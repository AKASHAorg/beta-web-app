import * as Promise from 'bluebird';
export declare const toggleDonations: {
    'id': string;
    'type': string;
    'properties': {
        'status': {
            'type': string;
        };
        'token': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        status: boolean;
        token: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
