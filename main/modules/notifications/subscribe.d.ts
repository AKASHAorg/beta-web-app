/// <reference types="bluebird" />
import * as Promise from 'bluebird';
declare const _default: {
    execute: (a1: {
        settings?: {
            feed: boolean;
            donations: boolean;
            comments: boolean;
            votes: boolean;
        };
        profile: {
            ethAddress?: string;
            akashaId?: string;
        };
        fromBlock: number;
    }, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
