import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const entryEth = yield contracts.instance.entries.getEntry(data.entryId);
    return { ipfsHash: entryEth.ipfsHash };
});
export default { execute, name: 'getEntryIpfsHash' };
//# sourceMappingURL=get-entry-ipfs-hash.js.map