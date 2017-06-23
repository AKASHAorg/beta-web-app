import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const score = yield contracts.instance.votes.getScore(data.entryId);
    return { score, entryId: data.entryId };
});
export default { execute, name: 'getScore' };
//# sourceMappingURL=entry-score.js.map