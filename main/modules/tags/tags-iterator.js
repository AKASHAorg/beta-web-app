import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import schema from '../utils/jsonschema';
import { web3Api } from '../../services';
const tagIterator = {
    'id': '/tagIterator',
    'type': 'object',
    'properties': {
        'limit': { 'type': 'number' },
        'toBlock': { 'type': 'number' },
    },
    'required': ['toBlock']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, tagIterator, { throwError: true });
    const collection = [];
    const maxResults = data.limit || 5;
    const fetched = yield contracts.fromEvent(contracts.instance.Tags.TagCreate, {}, data.toBlock, maxResults, {});
    for (let event of fetched.results) {
        collection.push({ tag: web3Api.instance.toUtf8(event.args.tag) });
        if (collection.length === maxResults) {
            break;
        }
    }
    return { collection: collection, lastBlock: fetched.fromBlock };
});
export default { execute, name: 'tagIterator' };
//# sourceMappingURL=tags-iterator.js.map