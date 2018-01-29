import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import schema from '../utils/jsonschema';
const create = {
    'id': '/create',
    'type': 'object',
    'properties': {
        'tagName': { 'type': 'string' },
        'token': { 'type': 'string' }
    },
    'required': ['tagName', 'token']
};
const execute = Promise.coroutine(function* (data, cb) {
    const v = new schema.Validator();
    v.validate(data, create, { throwError: true });
    const txData = yield contracts.instance.Tags.add.request(data.tagName);
    const transaction = yield contracts.send(txData, data.token, cb);
    return { tx: transaction.tx, receipt: transaction.receipt, tagName: data.tagName };
});
export default { execute, name: 'create', hasStream: true };
//# sourceMappingURL=create-tag.js.map