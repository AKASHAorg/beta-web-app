import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const count = yield contracts.instance.entries.getTagEntriesCount(data.tagName);
    return { count, tagName: data.tagName };
});
export default { execute, name: 'getTagEntriesCount' };
//# sourceMappingURL=entry-count-tag.js.map