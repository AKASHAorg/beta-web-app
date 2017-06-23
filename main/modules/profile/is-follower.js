import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    if (!Array.isArray(data)) {
        throw new Error('data must be an array');
    }
    const requests = data.map((req) => {
        return contracts.instance.feed
            .isFollower(req.akashaId, req.following)
            .then((result) => {
            return { result, following: req.following, akashaId: req.akashaId };
        });
    });
    const collection = yield Promise.all(requests);
    return { collection };
});
export default { execute, name: 'isFollower' };
//# sourceMappingURL=is-follower.js.map