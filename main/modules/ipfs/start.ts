import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import {isEmpty} from 'ramda';
import {ipfsProvider} from '../../services';
import initSearchDbs from '../search/indexes';
import {
    AKASHA_BOOTSTRAP_PEERS,
    BASE_URL,
    defaultPath,
    generalSettings,
    IPFS_CIRCUIT_RELAYS
} from '../../config/settings';

const execute = Promise.coroutine(function* (data: IpfsStartRequest) {
    if (IpfsConnector.getInstance().serviceStatus.process) {
        throw new Error('IPFS is already running');
    }
    let peers;
    IpfsConnector.getInstance().setIpfsFolder(data.hasOwnProperty('storagePath') ? data.storagePath : defaultPath);
    yield initSearchDbs();
    yield IpfsConnector.getInstance().start(isEmpty(ipfsProvider.instance) ? null : ipfsProvider.instance);

    if (!isEmpty(ipfsProvider.instance)) {
        const nodeId = yield IpfsConnector.getInstance().api.apiClient.idAsync();
        if (nodeId && (nodeId.agentVersion).includes('go-ipfs')) {
            peers = IPFS_CIRCUIT_RELAYS;
        } else {
            peers = AKASHA_BOOTSTRAP_PEERS;
        }

        peers.forEach(peer => {
            IpfsConnector.getInstance().api.apiClient.swarm.connect(peer, (err) => {
                if (err) {
                    console.error('js-ipfs swarm connect error ', err);
                }
            });
        });
    }

    generalSettings.set(BASE_URL, 'https://ipfs.io/ipfs/');
    return {started: true};
});

export default {execute, name: 'startService'};