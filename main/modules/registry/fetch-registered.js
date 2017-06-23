import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const collection = yield contracts.instance.registry.getRegistered(data);
    return { collection };
});
export default { execute, name: 'fetchRegistered' };
//# sourceMappingURL=fetch-registered.js.map