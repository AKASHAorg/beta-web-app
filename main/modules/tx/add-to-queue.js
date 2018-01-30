import * as Promise from 'bluebird';
import web3Helper from '../helpers/web3-helper';
import schema from '../utils/jsonschema';
const addToQueue = {
    'id': '/addToQueue',
    'type': 'array',
    'items': {
        'type': 'object',
        'properties': {
            'tx': { 'type': 'string' }
        },
        'required': ['tx']
    }
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, addToQueue, { throwError: true });
    data.forEach((hash) => {
        web3Helper.addTxToWatch(hash.tx, false);
    });
    web3Helper.startTxWatch();
    return { watching: web3Helper.watching };
});
export default { execute, name: 'addToQueue' };
//# sourceMappingURL=add-to-queue.js.map