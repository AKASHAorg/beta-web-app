import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { profileAddress } from './helpers';
import schema from '../utils/jsonschema';
import { web3Api } from '../../services';
export const tip = {
    'id': '/tip',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'akashaId': { 'type': 'string' },
        'token': { 'type': 'string' },
        'value': { 'type': 'string' },
        'tokenAmount': { 'type': 'string' },
        'message': { 'type': 'string' }
    },
    'required': ['token']
};
const execute = Promise.coroutine(function* (data, cb) {
    const v = new schema.Validator();
    v.validate(data, tip, { throwError: true });
    const tokenAmount = web3Api.instance.toWei(data.tokenAmount || 0, 'ether');
    const ethAmount = web3Api.instance.toWei(data.value || 0, 'ether');
    const address = yield profileAddress(data);
    const txData = contracts.instance.AETH.donate.request(address, tokenAmount, data.message || '', {
        value: ethAmount,
        gas: 200000
    });
    const transaction = yield contracts.send(txData, data.token, cb);
    return {
        tx: transaction.tx,
        receipt: transaction.receipt,
        receiver: address,
        akashaId: data.akashaId
    };
});
export default { execute, name: 'tip', hasStream: true };
//# sourceMappingURL=send-tip.js.map