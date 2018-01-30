var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const initContracts = require('@akashaproject/contracts.js');
import { web3Api } from '../services';
import { descend, filter, last, prop, sortWith, take, uniq, head } from 'ramda';
import * as BlPromise from 'bluebird';
import auth from '../modules/auth/Auth';
export class Contracts {
    constructor() {
        this.watchers = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.instance = yield initContracts(web3Api.instance.currentProvider);
            return this.instance;
        });
    }
    reset() {
        this.instance = null;
    }
    send(data, token, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield auth.signData(data.params[0], token);
            cb(null, { tx });
            return Contracts.watchTx(tx);
        });
    }
    static watchTx(tx) {
        const timeout = 300000;
        const start = new Date().getTime();
        return new Promise((resolve, reject) => {
            const getReceipt = function () {
                web3Api
                    .instance
                    .eth.getTransactionReceipt(tx, (err, receipt) => {
                    if (receipt != null) {
                        return resolve({
                            tx: tx,
                            receipt: {
                                gasUsed: receipt.gasUsed,
                                cumulativeGasUsed: receipt.cumulativeGasUsed,
                                transactionHash: receipt.transactionHash,
                                blockNumber: receipt.blockNumber,
                                success: receipt.status === '0x1',
                                logs: receipt.logs
                            }
                        });
                    }
                    if (new Date().getTime() - start > timeout) {
                        return reject(new Error('Tx: ' + tx + ' timed out'));
                    }
                    setTimeout(getReceipt, 2000);
                });
            };
            getReceipt();
        });
    }
    createWatcher(ethEvent, args, fromBlock) {
        const currentWatcher = ethEvent(args, { fromBlock });
        this.watchers.push(currentWatcher);
        return currentWatcher;
    }
    stopAllWatchers() {
        this.watchers.forEach((watcher) => {
            return watcher.stopWatching(() => { });
        });
        this.watchers.length = 0;
        return BlPromise.delay(1000);
    }
    fromEvent(ethEvent, args, toBlock, limit, options) {
        const step = 5300;
        return new Promise((resolve, reject) => {
            let results = [];
            let filterIndex;
            if (!options.reversed) {
                filterIndex = (record) => record.blockNumber < toBlock ||
                    (record.blockNumber === toBlock && record.logIndex < options.lastIndex);
            }
            else {
                filterIndex = (record) => record.blockNumber > toBlock;
            }
            const fetch = (to) => {
                let fromBlock = (options.reversed) ? toBlock : to - step;
                if (fromBlock < 0) {
                    fromBlock = 0;
                }
                const event = ethEvent(args, { fromBlock, toBlock: (options.reversed) ? 'latest' : to });
                event.get((err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    const filteredData = (options.lastIndex) ? filter(filterIndex, data) : data;
                    results = uniq(results.concat(filteredData));
                    if (results.length < limit && fromBlock > 0 && !options.reversed) {
                        return fetch(fromBlock);
                    }
                    const sortedResults = take(limit, sortWith([descend(prop('blockNumber')),
                        descend(prop('logIndex'))], results));
                    const lastLog = options.reversed ? head(sortedResults) : last(sortedResults);
                    const lastIndex = lastLog ? lastLog.logIndex : 0;
                    let lastBlock;
                    if (options.reversed) {
                        lastBlock = lastLog ? lastLog.blockNumber : fromBlock;
                    }
                    else {
                        lastBlock = lastLog ? (sortedResults.length === limit && fromBlock !== 0) ? lastLog.blockNumber : 0 : 0;
                    }
                    return resolve({ results: sortedResults, fromBlock: lastBlock, lastIndex });
                });
            };
            fetch(toBlock);
        });
    }
    fromEventFilter(ethEvent, args, toBlock, limit, options, aditionalFilter) {
        const step = 8300;
        return new Promise((resolve, reject) => {
            let results = [];
            let filterIndex;
            if (!options.reversed) {
                filterIndex = (record) => record.blockNumber < toBlock ||
                    (record.blockNumber === toBlock && record.logIndex < options.lastIndex);
            }
            else {
                filterIndex = (record) => record.blockNumber > toBlock;
            }
            const fetch = (to) => {
                let fromBlock = (options.reversed) ? toBlock : to - step;
                if (fromBlock < 0) {
                    fromBlock = 0;
                }
                const event = ethEvent(args, { fromBlock, toBlock: (options.reversed) ? 'latest' : to });
                event.get((err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    const filteredData = filter(aditionalFilter, filter(filterIndex, data));
                    results = uniq(results.concat(filteredData));
                    if (results.length < limit && fromBlock > 0 && !options.reversed) {
                        return fetch(fromBlock);
                    }
                    const sortedResults = take(limit, sortWith([descend(prop('blockNumber')),
                        descend(prop('logIndex'))], results));
                    const lastLog = options.reversed ? head(sortedResults) : last(sortedResults);
                    const lastIndex = lastLog ? lastLog.logIndex : 0;
                    let lastBlock;
                    if (options.reversed) {
                        lastBlock = lastLog ? lastLog.blockNumber : fromBlock;
                    }
                    else {
                        lastBlock = lastLog ? (sortedResults.length === limit && fromBlock !== 0) ? lastLog.blockNumber : 0 : 0;
                    }
                    return resolve({ results: sortedResults, fromBlock: lastBlock, lastIndex });
                });
            };
            fetch(toBlock);
        });
    }
}
export default new Contracts();
//# sourceMappingURL=index.js.map