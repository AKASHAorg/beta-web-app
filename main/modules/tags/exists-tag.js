import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import schema from '../utils/jsonschema';
const existsSchema = {
    'id': '/existsSchema',
    'type': 'object',
    'properties': {
        'tagName': { 'type': 'string' },
    },
    'required': ['tagName']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, existsSchema, { throwError: true });
    const exists = yield contracts.instance.Tags.exists(data.tagName);
    return { exists, tagName: data.tagName };
});
export default { execute, name: 'exists' };
//# sourceMappingURL=exists-tag.js.map