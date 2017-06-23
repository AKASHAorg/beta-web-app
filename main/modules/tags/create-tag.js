import auth from '../auth/Auth';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.tags.add(data.tagName, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx, tagName: data.tagName };
});
export default { execute, name: 'create' };
//# sourceMappingURL=create-tag.js.map