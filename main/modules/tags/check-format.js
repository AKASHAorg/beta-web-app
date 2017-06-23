import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const status = yield contracts.instance.tags.checkFormat(data.tagName);
    return { status, tagName: data.tagName };
});
export default { execute, name: 'checkFormat' };
//# sourceMappingURL=check-format.js.map