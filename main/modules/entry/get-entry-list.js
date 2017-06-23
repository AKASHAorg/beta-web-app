import * as Promise from 'bluebird';
import getEntry from './get-entry';
const execute = Promise.coroutine(function* (data) {
    const pool = data.map((entryObj) => {
        return getEntry.execute(entryObj);
    });
    const resolved = yield Promise.all(pool);
    return { collection: resolved };
});
export default { execute, name: 'getEntryList' };
//# sourceMappingURL=get-entry-list.js.map