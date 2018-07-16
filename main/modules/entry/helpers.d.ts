import * as Promise from 'bluebird';
export declare const fetchFromPublish: (a1: {
    toBlock: number;
    limit: number;
    lastIndex?: number;
    args: any;
    reversed?: boolean;
}) => Promise<{}>;
export declare const fetchFromTagIndex: (a1: {
    toBlock: number;
    limit: number;
    lastIndex?: number;
    args: any;
    reversed?: boolean;
}) => Promise<{}>;
