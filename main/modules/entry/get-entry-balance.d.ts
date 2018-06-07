import * as Promise from 'bluebird';
export declare const getEntryBalance: {
    'id': string;
    'type': string;
    'properties': {
        'list': {
            'type': string;
            'items': {
                'type': string;
            };
            'uniqueItems': boolean;
            'minItems': number;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        list: string[];
    }) => Promise<{}>;
    name: string;
};
export default _default;
