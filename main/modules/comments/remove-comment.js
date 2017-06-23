import auth from '../auth/Auth';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const txData = yield contracts.instance.comments.removeComment(data.entryId, data.commentId, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx };
});
export default { execute, name: 'removeComment' };
//# sourceMappingURL=remove-comment.js.map