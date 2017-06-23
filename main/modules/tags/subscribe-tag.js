import auth from '../auth/Auth';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.subs.subscribe(data.tagName, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx, tagName: data.tagName };
});
export default { execute, name: 'subscribe' };
//# sourceMappingURL=subscribe-tag.js.map