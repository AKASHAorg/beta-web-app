import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.subs.subsCount(data.akashaId);
    return { count, akashaId: data.akashaId };
});
export default { execute, name: 'subsCount' };
//# sourceMappingURL=subs-count.js.map