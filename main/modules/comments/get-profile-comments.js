import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    throw new Error('getProfileComments:deprecated, use default iterator');
});
export default { execute, name: 'getProfileComments' };
//# sourceMappingURL=get-profile-comments.js.map