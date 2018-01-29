import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* (data) {
    throw new Error('entry:voteCount is deprecated');
});
export default { execute, name: 'voteCount' };
//# sourceMappingURL=vote-count.js.map