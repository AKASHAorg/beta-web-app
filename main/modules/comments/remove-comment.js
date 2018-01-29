import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import schema from '../utils/jsonschema';
const removeComment = {
    'id': '/removeComment',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'commentId': { 'type': 'string' },
        'entryId': { 'type': 'string' },
        'token': { 'type': 'string' }
    },
    'required': ['ethAddress', 'entryId', 'token', 'commentId']
};
const execute = Promise.coroutine(function* (data, cb) {
    const v = new schema.Validator();
    v.validate(data, removeComment, { throwError: true });
    const txData = yield contracts.instance.Comments.deleteComment.request(data.entryId, data.ethAddress, data.commentId, { gas: 250000 });
    const transaction = yield contracts.send(txData, data.token, cb);
    return { tx: transaction.tx, receipt: transaction.receipt };
});
export default { execute, name: 'removeComment', hasStream: true };
//# sourceMappingURL=remove-comment.js.map