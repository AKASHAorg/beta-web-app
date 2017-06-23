import * as Promise from 'bluebird';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* (data) {
    const etherBase = (data.etherBase) ? data.etherBase : web3Api.instance.eth.defaultAccount;
    const unit = (data.unit) ? data.unit : 'ether';
    const weiAmount = yield web3Api.instance.eth.getBalanceAsync(etherBase);
    const balance = web3Api.instance.fromWei(weiAmount, unit);
    return { balance: balance.toString(10), unit, etherBase };
});
export default { execute, name: 'getBalance' };
//# sourceMappingURL=current-balance.js.map