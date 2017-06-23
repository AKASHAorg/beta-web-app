import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.comments.getCommentsCount(data.entryId);
    return { count, entryId: data.entryId };
});
export default { execute, name: 'commentsCount' };
//# sourceMappingURL=comments-count.js.map