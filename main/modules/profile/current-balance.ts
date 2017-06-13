import * as Promise from 'bluebird';
import { web3Api } from '../../services';

/**
 * Get eth balance converted to specified unit
 * @type {Function}
 */
const execute = Promise.coroutine(function*(data: BalanceRequest) {
    const etherBase = (data.etherBase) ? data.etherBase : web3Api.instance.eth.defaultAccount;
    const unit = (data.unit) ? data.unit : 'ether';
    const weiAmount = yield web3Api.instance.getBalanceAsync(etherBase);
    const balance = web3Api.instance.web3.fromWei(weiAmount, unit);
    return { balance: balance.toString(10), unit, etherBase };
});

export default { execute, name: 'getBalance' };
