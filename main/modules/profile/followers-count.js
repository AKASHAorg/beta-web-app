import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.feed.getFollowersCount(data.akashaId);
    return { count, akashaId: data.akashaId };
});
export default { execute, name: 'getFollowersCount' };
//# sourceMappingURL=followers-count.js.map