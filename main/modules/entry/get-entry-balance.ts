import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { web3Api } from '../../services';

/**
 * Get current balance of an entry
 * @type {Function}
 */
const execute = Promise.coroutine(
    /**
     *
     * @param data
     * @returns {{collection: any}}
     */
    function*(data: { entryId: string[], unit: 'ether' }) {
        if (!Array.isArray(data.entryId)) {
            throw new Error('data.entryId must be an array');
        }

        const requests = data.entryId.map((id) => {
            return contracts.instance.entries
                .getEntryFund(id)
                .then((balanceAddress) => {
                    if (!balanceAddress) {
                        return { balance: 'claimed', unit: data.unit, entryId: id };
                    }
                    return web3Api.instance.eth.getBalanceAsync(balanceAddress)
                        .then((weiAmount) => {
                            const balance = web3Api.instance.fromWei(weiAmount, data.unit);
                            return { balance: balance.toString(10), unit: data.unit, entryId: id };
                        });
                });
        });

        const collection = yield Promise.all(requests);
        return { collection };
    });

export default { execute, name: 'getEntryBalance' };
