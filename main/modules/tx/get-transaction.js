import * as Promise from 'bluebird';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* (data) {
    const requests = data.transactionHash.map((txHash) => {
        return web3Api.instance.eth.getTransactionReceiptAsync(txHash);
    });
    return Promise.all(requests);
});
export default { execute, name: 'getTransaction' };
//# sourceMappingURL=get-transaction.js.map