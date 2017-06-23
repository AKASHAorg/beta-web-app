import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import auth from '../auth/Auth';
import { mixed } from '../models/records';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.feed.unFollow(data.akashaId, data.gas);
    const tx = yield auth.signData(txData, data.token);
    mixed.flush();
    return { tx, akashaId: data.akashaId };
});
export default { execute, name: 'unFollowProfile' };
//# sourceMappingURL=unfollow-profile.js.map