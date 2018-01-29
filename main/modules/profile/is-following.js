import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    throw new Error('deprecated, use isFollower');
});
export default { execute, name: 'isFollowing' };
//# sourceMappingURL=is-following.js.map