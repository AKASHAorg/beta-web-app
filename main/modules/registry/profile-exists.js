import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const exists = yield contracts.instance.registry.profileExists(data.akashaId);
    const idValid = yield contracts.instance.registry.checkFormat(data.akashaId);
    return { exists, idValid, akashaId: data.akashaId };
});
export default { execute, name: 'profileExists' };
//# sourceMappingURL=profile-exists.js.map