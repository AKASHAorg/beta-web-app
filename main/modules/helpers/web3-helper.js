import { web3Api } from '../../services';
import * as Promise from 'bluebird';
export class GethHelper {
    constructor() {
        this.txQueue = new Map();
        this.syncing = true;
        this.watching = false;
    }
    setChannel(channel) {
        this.channel = channel;
    }
    inSync() {
        const rules = [
            web3Api.instance.eth.getSyncingAsync(),
            web3Api.instance.net.getPeerCountAsync()
        ];
        return Promise.all(rules).then((data) => {
            const timeStamp = Math.floor(new Date().getTime() / 1000);
            if (data[0]) {
                return [data[1], data[0]];
            }
            if (!data[0] && data[1] > 0) {
                return web3Api.instance
                    .eth
                    .getBlockAsync('latest')
                    .then((latestBlock) => {
                    if ((latestBlock.timestamp + 60 * 2) > timeStamp) {
                        this.syncing = false;
                        return [];
                    }
                    return [data[1]];
                });
            }
            return [data[1]];
        });
    }
    startTxWatch() {
        if (this.syncing) {
            return this.inSync().then(() => {
                if (this.syncing) {
                    throw new Error('Geth node is syncing, try calling #inSync() before this');
                }
                return this.startTxWatch();
            });
        }
        if (this.txQueue.size === 0) {
            return;
        }
        const currentQueue = [];
        this.watching = true;
        if (this.watcher) {
            return Promise.resolve(this.watching);
        }
        this.watcher = web3Api.instance.eth.filter('latest');
        this.watcher.watch((err, block) => {
            if (err) {
                return;
            }
            for (let hash of this.getCurrentTxQueue()) {
                currentQueue.push(web3Api.instance.eth.getTransactionReceiptAsync(hash));
            }
            Promise.all(currentQueue).then((receipt) => {
                receipt.forEach((tx) => {
                    if (tx) {
                        this.txQueue.delete(tx.transactionHash);
                        if (this.txQueue.size === 0) {
                            this.stopTxWatch();
                        }
                        this.channel.send({
                            data: {
                                mined: tx.transactionHash,
                                blockNumber: tx.blockNumber,
                                cumulativeGasUsed: tx.cumulativeGasUsed,
                                hasEvents: !!(tx.logs.length),
                                watching: this.watching
                            }
                        });
                    }
                });
            });
        });
        return Promise.resolve(this.watching);
    }
    hasKey(address) {
        return web3Api.instance
            .eth
            .getAccountsAsync()
            .then((list) => {
            return list.indexOf(address) !== -1;
        });
    }
    stopTxWatch() {
        this.watching = false;
        return (this.watcher) ? this.watcher.stopWatching(() => {
            this.watcher = null;
        }) : '';
    }
    addTxToWatch(tx, autoWatch = true) {
        this.txQueue.set(tx, '');
        if (!this.watching && autoWatch) {
            this.startTxWatch();
        }
        return this;
    }
    getCurrentTxQueue() {
        return this.txQueue.keys();
    }
}
export default new GethHelper();
//# sourceMappingURL=web3-helper.js.map