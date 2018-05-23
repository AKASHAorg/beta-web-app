/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const cacheKey = "search:tags:all";
declare const _default: {
    execute: (a1: {
        tagName: string;
        limit: number;
    }) => Promise<{}>;
    name: string;
};
export default _default;
