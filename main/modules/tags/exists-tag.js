import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const exists = yield contracts.instance.tags.exists(data.tagName);
    return { exists, tagName: data.tagName };
});
export default { execute, name: 'exists' };
//# sourceMappingURL=exists-tag.js.map