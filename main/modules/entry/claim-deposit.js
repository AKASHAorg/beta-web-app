import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import auth from '../auth/Auth';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.entries.claimDeposit(data.entryId, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx, entryId: data.entryId };
});
export default { execute, name: 'claim' };
//# sourceMappingURL=claim-deposit.js.map