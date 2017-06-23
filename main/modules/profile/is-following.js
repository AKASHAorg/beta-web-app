import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    if (!Array.isArray(data)) {
        throw new Error('data is must be an array');
    }
    const requests = data.map((req) => {
        return contracts.instance.feed.isFollowing(req.follower, req.akashaId)
            .then((result) => {
            return { result, follower: req.follower, akashaId: req.akashaId };
        });
    });
    const collection = yield Promise.all(requests);
    return { collection };
});
export default { execute, name: 'isFollowing' };
//# sourceMappingURL=is-following.js.map