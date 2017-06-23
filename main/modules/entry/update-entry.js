import auth from '../auth/Auth';
import IpfsEntry from './ipfs';
import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const ipfsEntry = new IpfsEntry();
    const hash = yield ipfsEntry.create(data.content, data.tags);
    const txData = yield contracts.instance.entries.updateEntryContent(hash, data.entryId, data.gas);
    const tx = yield auth.signData(txData, data.token);
    return { tx };
});
export default { execute, name: 'update' };
//# sourceMappingURL=update-entry.js.map