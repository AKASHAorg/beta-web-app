import * as Promise from 'bluebird';
export declare const voteCost: {
    'id': string;
    'type': string;
    'items': {
        'type': string;
    };
    'uniqueItems': boolean;
    'minItems': number;
};
declare const _default: {
    execute: (a1: number[]) => Promise<{}>;
    name: string;
};
export default _default;
