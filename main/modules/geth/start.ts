import * as Promise from 'bluebird';
import { regenWeb3, web3Api } from '../../services';
import { gethStatus } from '../../event/responses';
import contracts from '../../contracts';

const execute = Promise.coroutine(function*() {
    let connected = web3Api.instance.isConnected();

    if (!connected && window.hasOwnProperty('ethereum')) {
        web3Api.instance = regenWeb3(window['ethereum']);
        connected = web3Api.instance.isConnected();
    }
    if (connected) {
        gethStatus.process = true;
        gethStatus.api = true;
        gethStatus.version = yield web3Api.instance.version.getNodeAsync();
        gethStatus.networkID = yield web3Api.instance.version.getNetworkAsync();

        const accounts = yield web3Api.instance.eth.getAccountsAsync();
        if (accounts.length) {
            gethStatus.ethKey = accounts[0];
        }
    }
    yield contracts.init();
    return { started: connected };
});

export default { execute, name: 'startService' };