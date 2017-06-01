import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { IPFS_PEER_ID } from '../../config/settings';

const execute = Promise.coroutine(function*(data: IpfsStartRequest) {
    if (IpfsConnector.getInstance().serviceStatus.process) {
        throw new Error('IPFS is already running');
    }
    if (data.hasOwnProperty('storagePath')) {
        IpfsConnector.getInstance().setIpfsFolder(data.storagePath);
    }
    yield IpfsConnector.getInstance().start();
    IpfsConnector.getInstance()
        .api
        .apiClient
        .bootstrap
        .add(IPFS_PEER_ID, (err) => {
            if (err) {
                console.log('add ipfs peer err ', err);
            }
        });
    return {};
});

export default { execute, name: 'startService' };