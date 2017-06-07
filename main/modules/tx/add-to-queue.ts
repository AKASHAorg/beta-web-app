import * as Promise from 'bluebird';

const execute = Promise.coroutine(function*(data: AddToQueueRequest[]) {
    data.forEach((hash) => {
        gethHelper.addTxToWatch(hash.tx, false);
    });
    gethHelper.startTxWatch();
    return { watching: gethHelper.watching };
});

export default { execute, name: 'addToQueue' };