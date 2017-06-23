import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* (data) {
    const entryFund = yield contracts.instance.entries.getEntryFund(data.entryId);
    const weiBalance = yield web3Api.instance.eth.getBalanceAsync(entryFund);
    const ethBalance = (web3Api.instance.fromWei(weiBalance, 'ether')).toString(10);
    return { balance: ethBalance, entryId: data.entryId };
});
export default { execute, name: 'getDepositBalance' };
//# sourceMappingURL=get-deposit-balance.js.map