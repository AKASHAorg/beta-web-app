/// <reference types="bluebird" />
import * as Promise from 'bluebird';
declare const _default: {
    execute: (a1: {
        toBlock?: number;
        limit?: number;
        lastIndex?: number;
        reversed?: boolean;
        totalLoaded?: number;
        ethAddress?: string;
    }) => Promise<{}>;
    name: string;
};
export default _default;
