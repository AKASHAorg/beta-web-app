import * as Promise from 'bluebird';
export declare const resolveEntriesIpfsHash: {
    'id': string;
    'type': string;
    'properties': {
        'ipfsHash': {
            'type': string;
            'items': {
                'type': string;
            };
            'uniqueItems': boolean;
            'minItems': number;
        };
        'full': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: {
        ipfsHash: string[];
        full?: string;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
