import * as Promise from 'bluebird';
export declare const addressOf: {
    'id': string;
    'type': string;
    'items': {
        '$ref': string;
    };
    'uniqueItems': boolean;
    'minItems': number;
};
declare const _default: {
    execute: (a1: ProfileExistsRequest[]) => Promise<{}>;
    name: string;
};
export default _default;
