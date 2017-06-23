import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const batch = data.map((profile) => {
        return contracts.instance.registry.addressOf(profile.akashaId);
    });
    const collection = yield Promise.all(batch);
    return { collection, request: data };
});
export default { execute, name: 'addressOf' };
//# sourceMappingURL=address-of-akashaid.js.map