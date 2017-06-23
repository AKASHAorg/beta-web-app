import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const profileAddress = yield contracts.instance.registry.getByAddress(data.ethAddress);
    const akashaId = yield contracts.instance.profile.getId(profileAddress);
    return { profileAddress, akashaId };
});
export default { execute, name: 'getByAddress' };
//# sourceMappingURL=resolve-ethaddress.js.map