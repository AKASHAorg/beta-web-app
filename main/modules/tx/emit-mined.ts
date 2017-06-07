import * as Promise from 'bluebird';

const execute = Promise.coroutine(function*(data: EmitMinedRequest) {
    (data.watch) ? gethHelper.startTxWatch() : gethHelper.stopTxWatch();
    return { watching: gethHelper.watching };
});

export default { execute, name: 'emitMined' };