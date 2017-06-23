import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const collection = yield contracts.instance.tags.getTagsCreated(data);
    return { collection };
});
export default { execute, name: 'getTagsCreated' };
//# sourceMappingURL=fetch-tags.js.map