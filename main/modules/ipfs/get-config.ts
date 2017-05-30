import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';

const execute = Promise.coroutine(function*() {
    return {
        apiPort: IpfsConnector.getInstance().config.config.Addresses.API.split('/').pop(),
        storagePath: IpfsConnector.getInstance().config.repo
    };
});

export default { execute, name: 'getConfig' };