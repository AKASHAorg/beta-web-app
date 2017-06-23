import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* () {
    const count = yield contracts.instance.tags.getTagsCount();
    return { count };
});
export default { execute, name: 'getTagCount' };
//# sourceMappingURL=tag-count.js.map