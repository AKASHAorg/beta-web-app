import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.votes.getVotesCount(data.entryId);
    return { count, entryId: data.entryId };
});
export default { execute, name: 'voteCount' };
//# sourceMappingURL=vote-count.js.map