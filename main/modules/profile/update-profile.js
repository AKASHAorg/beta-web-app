import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import getCurrentProfile from '../registry/current-profile';
import { create } from './ipfs';
import auth from '../auth/Auth';
const execute = Promise.coroutine(function* (data) {
    const ipfsHash = yield create(data.ipfs);
    const currentProfile = yield getCurrentProfile.execute();
    if (!currentProfile.profileAddress) {
        throw new Error('No profile found to update');
    }
    const txData = yield contracts.instance.profile
        .updateHash(ipfsHash, currentProfile.profileAddress, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx };
});
export default { execute, name: 'updateProfileData' };
//# sourceMappingURL=update-profile.js.map