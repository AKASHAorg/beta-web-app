import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const tagId = yield contracts.instance.tags.getTagId(data.tagName);
    return { tagId, tagName: data.tagName };
});
export default { execute, name: 'getTagId' };
//# sourceMappingURL=tag-id.js.map