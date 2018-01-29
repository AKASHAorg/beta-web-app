import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    throw new Error('getFollowingList:deprecated');
});
export default { execute, name: 'getFollowingList' };
//# sourceMappingURL=following-list.js.map