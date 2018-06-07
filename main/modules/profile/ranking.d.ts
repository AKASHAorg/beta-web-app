import * as Promise from 'bluebird';
export declare const karmaRanking: {
    'id': string;
    'type': string;
    'properties': {
        'following': {
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
        following: string[];
    }) => Promise<{}>;
    name: string;
};
export default _default;
