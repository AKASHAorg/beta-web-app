import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.entries.getProfileEntriesCount(data.akashaId);
    return { count, akashaId: data.akashaId };
});
export default { execute, name: 'getProfileEntriesCount' };
//# sourceMappingURL=entry-count-profile.js.map