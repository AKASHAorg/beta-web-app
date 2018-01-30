import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { web3Api } from '../../services';
import schema from '../utils/jsonschema';
export const fetchRegistered = {
    'id': '/fetchRegistered',
    'type': 'object',
    'properties': {
        'toBlock': { 'type': 'number' },
        'limit': { 'type': 'number' }
    },
    'required': ['toBlock']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, fetchRegistered, { throwError: true });
    const collection = [];
    const maxResults = data.limit || 5;
    const fetched = yield contracts.fromEvent(contracts.instance.ProfileRegistrar.Register, {}, data.toBlock, maxResults, {});
    for (let event of fetched.results) {
        collection.push({ akashaId: web3Api.instance.toUtf8(event.args.label) });
    }
    return { collection: collection, lastBlock: fetched.fromBlock };
});
export default { execute, name: 'fetchRegistered' };
//# sourceMappingURL=fetch-registered.js.map