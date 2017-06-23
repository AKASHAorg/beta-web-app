import auth from '../auth/Auth';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.registry.unregister(data.akashaId, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx };
});
export default { execute, name: 'unregister' };
//# sourceMappingURL=unregister-profile.js.map