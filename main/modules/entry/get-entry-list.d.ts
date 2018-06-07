import * as Promise from 'bluebird';
export declare const getEntryList: {
    'id': string;
    'type': string;
    'items': {
        '$ref': string;
    };
    'uniqueItems': boolean;
    'minItems': number;
};
declare const _default: {
    execute: (a1: EntryGetRequest[], a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
