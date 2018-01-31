import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { bootstrap } from '../app/';
import initModules from './init-modules';
import { channel, ipfsApi, regenWeb3, web3Api } from './services';
import web3Helper from './modules/helpers/web3-helper';
import getChannels from './channels';
import contracts from './contracts';
declare const web3;

window.addEventListener('load', function () {
    let web3Local;
    if (typeof web3 !== 'undefined') {
        web3Local = regenWeb3();
    }
    console.log(web3, web3Local);
    startApp(web3Local);
});


const startApp = (web3) => {
    if (!web3) {
        return bootstrap();
    }
    web3Api.instance = web3;
    ipfsApi.instance = IpfsConnector.getInstance();
    console.time('bootstrap');

    // IpfsConnector.getInstance().setOption('SignalServer', 'akasha.cloud');
    // IpfsConnector.getInstance().setOption('config',
    //     {
    //         Addresses: {
    //             Swarm: [
    //                 '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss',
    //                 '/libp2p-webrtc-star/dns4/akasha.cloud/wss'
    //             ]
    //         }
    //     });
    IpfsConnector.getInstance().setOption('repo', 'ipfs#akasha-beta');
    initModules();
    channel.instance = getChannels();
    console.log(channel.instance);
    // for dev only
    Object.defineProperty(window, 'Channel', { value: channel.instance });
    Object.defineProperty(window, 'ipfs', { value: IpfsConnector });
    Object.defineProperty(window, 'contracts', { value: contracts });
    // end

    web3Helper.setChannel(channel.instance.client.tx.emitMined);
    console.timeEnd('bootstrap');
    bootstrap(true);
};
