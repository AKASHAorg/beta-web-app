import * as Promise from 'bluebird';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* () {
    const blockNr = web3Api.instance.isConnected() ?
        yield web3Api.instance.eth.getBlockNumberAsync() : false;
    return { blockNr };
});
export default { execute, name: 'status' };
//# sourceMappingURL=status.js.map