import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const idValid = yield contracts.instance.registry.checkFormat(data.akashaId);
    return { idValid, akashaId: data.akashaId };
});
export default { execute, name: 'checkIdFormat' };
//# sourceMappingURL=check-id-format.js.map