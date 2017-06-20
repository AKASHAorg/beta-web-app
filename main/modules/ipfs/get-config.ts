import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';

const execute = Promise.coroutine(function*() {
    console.log(IpfsConnector.getInstance().config);
    return {
        apiPort: (IpfsConnector.getInstance().config.config.Addresses.API) ?
            IpfsConnector.getInstance().config.config.Addresses.API.split('/').pop() : '',
        storagePath: IpfsConnector.getInstance().config.repo
    };
});

export default { execute, name: 'getConfig' };