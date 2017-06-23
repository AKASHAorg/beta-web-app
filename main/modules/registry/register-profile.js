import auth from '../auth/Auth';
import { create } from '../profile/ipfs';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import profileExists from './profile-exists';
import { web3Api } from '../../services';
const execute = Promise.coroutine(function* (data) {
    const tmpProfile = yield profileExists.execute({ akashaId: data.akashaId });
    const hasProfile = yield contracts.instance.registry.isRegistered(web3Api.instance.eth.accounts[0]);
    if (tmpProfile.exists || !tmpProfile.idValid) {
        throw new Error(`${data.akashaId} is already reserved or not valid.`);
    }
    if (hasProfile) {
        throw new Error(`Address ${web3Api.instance.eth.accounts[0]} has already a profile attached.`);
    }
    const ipfsHash = yield create(data.ipfs);
    const txData = yield contracts.instance.registry.register(data.akashaId, ipfsHash, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx };
});
export default { execute, name: 'registerProfile' };
//# sourceMappingURL=register-profile.js.map