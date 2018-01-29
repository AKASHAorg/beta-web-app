import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    throw new Error('commentsParentIterator:deprecated, use default iterator');
});
export default { execute, name: 'commentsParentIterator' };
//# sourceMappingURL=comments-parent-iterator.js.map