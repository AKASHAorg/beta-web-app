import * as BlPromise from 'bluebird';
export declare class Contracts {
    instance: any;
    watchers: any[];
    init(): Promise<any>;
    reset(): void;
    send(data: any, token: string, cb: any): Promise<{}>;
    static watchTx(tx: string): Promise<{}>;
    createWatcher(ethEvent: any, args: any, fromBlock: number): any;
    stopAllWatchers(): BlPromise<void>;
    fromEvent(ethEvent: any, args: any, toBlock: number | string, limit: number, options: {
        lastIndex?: number;
        reversed?: boolean;
        stopOnFirst?: boolean;
    }): Promise<any>;
    fromEventFilter(ethEvent: any, args: any, toBlock: number | string, limit: number, options: {
        lastIndex?: number;
        reversed?: boolean;
    }, aditionalFilter: (data: any) => boolean): Promise<any>;
}
declare const _default: Contracts;
export default _default;
