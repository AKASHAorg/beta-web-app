import * as Promise from 'bluebird';
import web3Helper from '../helpers/web3-helper';

const execute = Promise.coroutine(function*(data: AddToQueueRequest[]) {
    data.forEach((hash) => {
        web3Helper.addTxToWatch(hash.tx, false);
    });
    web3Helper.startTxWatch();
    return { watching: web3Helper.watching };
});

export default { execute, name: 'addToQueue' };