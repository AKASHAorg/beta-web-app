import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    throw new Error('entry:getEntriesStream is no longer required');
});
export default { execute, name: 'getEntriesStream' };
//# sourceMappingURL=entry-stream.js.map