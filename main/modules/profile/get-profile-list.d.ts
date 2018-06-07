import * as Promise from 'bluebird';
export declare const getProfileList: {
    'id': string;
    'type': string;
    'items': {
        '$ref': string;
    };
    'uniqueItems': boolean;
    'minItems': number;
};
declare const _default: {
    execute: (a1: ProfileDataRequest[], a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
