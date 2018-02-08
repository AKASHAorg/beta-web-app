import * as Promise from 'bluebird';
import schema from '../utils/jsonschema';
import { fetchFromPublish } from './helpers';
import { profileAddress } from '../profile/helpers';
import contracts from '../../contracts';
const entryProfileIterator = {
    'id': '/entryProfileIterator',
    'type': 'object',
    'properties': {
        'limit': { 'type': 'number' },
        'toBlock': { 'type': 'number' },
        'akashaId': { 'type': 'string' },
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'reversed': { 'type': 'boolean' }
    },
    'required': ['toBlock']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, entryProfileIterator, { throwError: true });
    const address = yield profileAddress(data);
    const entryCount = yield contracts.instance.Entries.getEntryCount(address);
    let maxResults = entryCount.toNumber() === 0 ? 0 : data.limit || 5;
    if (maxResults > entryCount.toNumber()) {
        maxResults = entryCount.toNumber();
    }
    if (!address) {
        return { collection: [], lastBlock: 0 };
    }
    return fetchFromPublish(Object.assign({}, data, { limit: maxResults, args: { author: address }, reversed: data.reversed || false }));
});
export default { execute, name: 'entryProfileIterator' };
//# sourceMappingURL=entry-profile-iterator.js.map