import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import initSearchDbs from '../search/indexes';
import { defaultPath, IPFS_PEER_ID, IPFS_CIRCUIT_RELAYS, generalSettings, BASE_URL } from '../../config/settings';

const execute = Promise.coroutine(function*(data: IpfsStartRequest) {
    if (IpfsConnector.getInstance().serviceStatus.process) {
        throw new Error('IPFS is already running');
    }
    console.log(data);
    IpfsConnector.getInstance().setIpfsFolder(data.hasOwnProperty('storagePath') ? data.storagePath : defaultPath);
    yield initSearchDbs();
    yield IpfsConnector.getInstance().start();
    generalSettings.set(BASE_URL, 'https://ipfs.io/ipfs/');
    return { started: true };
});

export default { execute, name: 'startService' };