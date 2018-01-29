import * as Promise from 'bluebird';
import schema from '../utils/jsonschema';
import { fetchFromPublish } from './helpers';
const allStreamIterator = {
    'id': '/allStreamIterator',
    'type': 'object',
    'properties': {
        'limit': { 'type': 'number' },
        'toBlock': { 'type': 'number' },
        'lastIndex': { 'type': 'number' },
        'reversed': { 'type': 'boolean' }
    },
    'required': ['toBlock']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, allStreamIterator, { throwError: true });
    const maxResults = data.limit || 5;
    return fetchFromPublish(Object.assign({}, data, { limit: maxResults, args: {}, reversed: data.reversed || false }));
});
export default { execute, name: 'allStreamIterator' };
//# sourceMappingURL=all-stream-iterator.js.map