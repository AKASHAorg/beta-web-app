import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const subscribed = yield contracts.instance.subs.isSubscribed(data.akashaId, data.tagName);
    return { subscribed, akashaId: data.akashaId, tagName: data.tagName };
});
export default { execute, name: 'isSubscribed' };
//# sourceMappingURL=is-subscribed.js.map