import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import schema from '../utils/jsonschema';
const canClaim = {
    'id': '/canClaim',
    'type': 'object',
    'properties': {
        'entryId': {
            'type': 'array',
            'items': {
                'type': 'string'
            },
            'uniqueItems': true,
            'minItems': 1
        }
    },
    'required': ['entryId']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    v.validate(data, canClaim, { throwError: true });
    const timeStamp = new Date().getTime() / 1000;
    const requests = data.entryId.map((id) => {
        return contracts.instance.Votes
            .canClaimEntry(id, timeStamp)
            .then((status) => {
            return { entryId: id, status };
        });
    });
    const collection = yield Promise.all(requests);
    return { collection };
});
export default { execute, name: 'canClaim' };
//# sourceMappingURL=can-claim.js.map