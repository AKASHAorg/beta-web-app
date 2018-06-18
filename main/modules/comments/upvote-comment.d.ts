import * as Promise from 'bluebird';
export declare const upvote: {
    'id': string;
    'type': string;
    'properties': {
        'entryId': {
            'type': string;
        };
        'token': {
            'type': string;
        };
        'commentId': {
            'type': string;
        };
        'weight': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        entryId: string;
        weight: number;
        commentId: string;
        token: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
