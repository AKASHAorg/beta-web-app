import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    if (!Array.isArray(data)) {
        throw new Error('data must be an array');
    }
    const requests = data.map((req) => {
        return contracts.instance.registry.addressOf(req.akashaId)
            .then((profileAddress) => {
            return contracts.instance.votes.getVoteOfProfile(req.entryId, profileAddress);
        })
            .then((weight) => {
            return { weight, entryId: req.entryId, akashaId: req.akashaId };
        });
    });
    const collection = yield Promise.all(requests);
    return { collection };
});
export default { execute, name: 'getVoteOf' };
//# sourceMappingURL=get-vote-of.js.map