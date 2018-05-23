/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare class GethHelper {
    watcher: any;
    txQueue: Map<any, any>;
    syncing: boolean;
    watching: boolean;
    private channel;
    setChannel(channel: any): void;
    inSync(): Promise<any>;
    startTxWatch(): any;
    hasKey(address: string): any;
    stopTxWatch(): any;
    addTxToWatch(tx: string, autoWatch?: boolean): this;
    getCurrentTxQueue(): IterableIterator<any>;
}
declare const _default: GethHelper;
export default _default;
