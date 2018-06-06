import * as Promise from 'bluebird';
declare const _default: {
    execute: (a1: {
        toBlock: number;
        limit?: number;
        author?: string;
        entryType?: number;
        multi: {
            authors: string[];
            entryTypes: number[];
            tags: string[];
        };
    }) => Promise<{}>;
    name: string;
};
export default _default;
