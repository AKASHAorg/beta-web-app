import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { profileAddress } from './helpers';
import schema from '../utils/jsonschema';
import { web3Api } from '../../services';

export const transfer = {
    'id': '/transfer',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'akashaId': { 'type': 'string' },
        'token': { 'type': 'string' },
        'value': { 'type': 'string' },
        'tokenAmount': { 'type': 'string' },
    },
    'required': ['token']
};

const execute = Promise.coroutine(
    function* (data: {
        token: string,
        akashaId?: string,
        ethAddress?: string,
        value?: string,
        tokenAmount?: string,
    }, cb) {
        const v = new schema.Validator();
        v.validate(data, transfer, { throwError: true });

        if (data.tokenAmount && data.value) {
            throw new Error('Can only send eth or aeth token individually, not combined');
        }
        const address = yield profileAddress(data);
        const tokenAmount = web3Api.instance.toWei(data.tokenAmount || 0, 'ether');
        const ethAmount = web3Api.instance.toWei(data.value || 0, 'ether');
        let txData;
        if (data.tokenAmount) {
            txData = contracts.instance.AETH.transfer.request(address, tokenAmount, { gas: 200000 });
        } else if (data.value) {
            txData = web3Api.instance.eth.sendTransaction.request({ to: address, value: ethAmount, gas: 50000 });
        }
        const transaction = yield contracts.send(txData, data.token, cb);
        return {
            tx: transaction.tx,
            receipt: transaction.receipt,
            receiver: address,
            akashaId: data.akashaId
        };
    });

export default { execute, name: 'transfer', hasStream: true };
