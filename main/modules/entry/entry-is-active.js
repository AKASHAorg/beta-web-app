import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* (data) {
    throw new Error('entry:isActive is no longer required');
});
export default { execute, name: 'isActive' };
//# sourceMappingURL=entry-is-active.js.map