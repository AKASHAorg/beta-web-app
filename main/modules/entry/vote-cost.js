import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    if (!Array.isArray(data.weight)) {
        throw new Error('data.weight must be an array');
    }
    const requests = data.weight.map((w) => {
        return contracts.instance.votes.getVoteCost(w)
            .then((cost) => {
            return { cost, weight: w };
        });
    });
    const collection = yield Promise.all(requests);
    return { collection };
});
export default { execute, name: 'voteCost' };
//# sourceMappingURL=vote-cost.js.map