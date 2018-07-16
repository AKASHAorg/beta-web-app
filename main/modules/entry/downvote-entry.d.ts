import * as Promise from 'bluebird';
export declare const downvote: {
    'id': string;
    'type': string;
    'properties': {
        'entryId': {
            'type': string;
        };
        'token': {
            'type': string;
        };
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'weight': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: EntryUpvoteRequest, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
