import * as Promise from 'bluebird';
import resolveEth from '../registry/resolve-ethaddress';
import { uniq } from 'ramda';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* () {
    const accounts = yield web3Api.instance.eth.getAccountsAsync();
    if (!accounts || !accounts.length) {
        return { collection: [] };
    }
    const profiles = uniq(accounts).map((address) => {
        return resolveEth.execute({ ethAddress: address });
    });
    const collection = yield Promise.all(profiles);
    return { collection: collection || [] };
});
export default { execute, name: 'getLocalIdentities' };
//# sourceMappingURL=get-local-identities.js.map