import * as Promise from 'bluebird';
import { web3Api } from '../../services';
import schema from '../utils/jsonschema';

const getTransaction = {
    'id': '/getTransaction',
    'type': 'object',
    'properties': {
        'transactionHash': {
            'type': 'array',
            'items': { 'type': 'string' }
        }
    },
    'required': ['transactionHash']

};

const execute = Promise.coroutine(function* (data: TxRequestData) {
    const v = new schema.Validator();
    v.validate(data, getTransaction, { throwError: true });

    const requests = data.transactionHash.map((txHash) => {
        return web3Api.instance.eth.getTransactionReceiptAsync(txHash);
    });
    return Promise.all(requests);
});

export default { execute, name: 'getTransaction' };
