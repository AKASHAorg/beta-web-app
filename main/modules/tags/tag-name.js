import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const tagName = yield contracts.instance.tags.getTagName(data.tagId);
    return { tagName, tagId: data.tagId };
});
export default { execute, name: 'getTagName' };
//# sourceMappingURL=tag-name.js.map