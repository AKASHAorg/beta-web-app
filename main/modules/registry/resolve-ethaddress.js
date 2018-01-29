import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { unpad } from 'ethereumjs-util';
import { GethConnector } from '@akashaproject/geth-connector';
import schema from '../utils/jsonschema';
export const getByAddress = {
    'id': '/getByAddress',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' }
    },
    'required': ['ethAddress']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, getByAddress, { throwError: true });
    let resolved;
    let profileHex = yield contracts.instance.ProfileResolver.reverse(data.ethAddress);
    if (!unpad(profileHex)) {
        profileHex = null;
    }
    else {
        resolved = yield contracts.instance.ProfileResolver.resolve(profileHex);
    }
    const akashaId = (profileHex) ? GethConnector.getInstance().web3.toUtf8(resolved[0]) : '';
    return { ethAddress: data.ethAddress, akashaId, raw: profileHex };
});
export default { execute, name: 'getByAddress' };
//# sourceMappingURL=resolve-ethaddress.js.map