import * as Promise from 'bluebird';
import web3Helper from '../helpers/web3-helper';
const execute = Promise.coroutine(function* (data) {
    (data.watch) ? web3Helper.startTxWatch() : web3Helper.stopTxWatch();
    return { watching: web3Helper.watching };
});
export default { execute, name: 'emitMined' };
//# sourceMappingURL=emit-mined.js.map