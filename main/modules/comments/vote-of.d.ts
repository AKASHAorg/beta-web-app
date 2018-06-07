import * as Promise from 'bluebird';
export declare const getVoteOf: {
    'id': string;
    'type': string;
    'items': {
        'type': string;
        'properties': {
            'commentId': {
                'type': string;
            };
            'akashaId': {
                'type': string;
            };
            'ethAddress': {
                'type': string;
                'format': string;
            };
        };
        'required': string[];
    };
    'uniqueItems': boolean;
    'minItems': number;
};
declare const _default: {
    execute: (a1: {
        commentId: string;
        akashaId?: string;
        ethAddress?: string;
    }[]) => Promise<{}>;
    name: string;
};
export default _default;
