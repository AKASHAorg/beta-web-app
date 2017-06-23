import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    if (!data.limit) {
        data.limit = 1;
    }
    let currentId = yield contracts.instance.tags.getFirstTag();
    let currentName = yield contracts.instance.tags.getTagName(currentId);
    const results = [];
    if (currentName.includes(data.tagName)) {
        results.push(currentName);
    }
    while (results.length < data.limit) {
        currentId = yield contracts.instance.tags.getNextTag(currentId);
        if (currentId === '0') {
            break;
        }
        let currentName = yield contracts.instance.tags.getTagName(currentId);
        if (currentName.includes(data.tagName)) {
            results.push(currentName);
        }
    }
    return { collection: results, tagName: data.tagName };
});
export default { execute, name: 'searchTag' };
//# sourceMappingURL=search-tag.js.map