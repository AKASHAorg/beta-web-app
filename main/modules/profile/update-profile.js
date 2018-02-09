import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import getCurrentProfile from '../registry/current-profile';
import { create } from './ipfs';
import { decodeHash } from '../ipfs/helpers';
import schema from '../utils/jsonschema';
export const updateProfileData = {
    'id': '/updateProfileData',
    'type': 'object',
    'properties': {
        'ipfs': {
            'type': 'object',
            'properties': {
                'firstName': { 'type': 'string' },
                'lastName': { 'type': 'string' },
                'avatar': { 'type': 'any' },
                'backgroundImage': { 'type': 'any' },
                'about': { 'type': 'string' },
                'links': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'title': { 'type': 'string' },
                            'url': { 'type': 'string' },
                            'type': { 'type': 'string' },
                            'id': { 'type': 'number' }
                        },
                        'required': ['title', 'url', 'type', 'id']
                    }
                }
            }
        },
        'token': { 'type': 'string' }
    },
    'required': ['ipfs', 'token']
};
const execute = Promise.coroutine(function* (data, cb) {
    const v = new schema.Validator();
    v.validate(data, updateProfileData, { throwError: true });
    console.log('mainData', data);
    const ipfsHash = yield create(data.ipfs);
    console.log('mainipfsHash', ipfsHash);
    const decodedHash = decodeHash(ipfsHash);
    const currentProfile = yield getCurrentProfile.execute();
    if (!currentProfile.raw) {
        throw new Error('No profile found to update');
    }
    const txData = contracts.instance.ProfileResolver
        .setHash.request(currentProfile.raw, ...decodedHash);
    const transaction = yield contracts.send(txData, data.token, cb);
    return { tx: transaction.tx, receipt: transaction.receipt };
});
export default { execute, name: 'updateProfileData', hasStream: true };
//# sourceMappingURL=update-profile.js.map