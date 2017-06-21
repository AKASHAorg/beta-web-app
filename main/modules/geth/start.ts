import * as Promise from 'bluebird';
import { regenWeb3, web3Api } from '../../services';
import { gethStatus } from '../../event/responses';

const execute = Promise.coroutine(function*() {
    let connected = web3Api.instance.isConnected();
    console.log('web3 connected', connected);
    if (!connected) {
        web3Api.instance = regenWeb3();
        connected = web3Api.instance.isConnected();
    }
    if (connected && web3Api.instance.version.network !== 'loading') {
        gethStatus.process = true;
        gethStatus.api = true;
        gethStatus.version = yield web3Api.instance.version.getNodeAsync();
        gethStatus.networkID = yield web3Api.instance.version.getNetworkAsync();
        gethStatus.ethKey = web3Api.instance.eth.accounts[0];
    }
    return { started: connected };
});

export default { execute, name: 'startService' };