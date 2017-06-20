import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { bootstrap } from '../app';
import { initChannels } from './channels';
import injectApi from './preloader';
import initModules from './init-modules';
import { channel, ipfsApi, web3Api, regenWeb3 } from './services';
import web3Helper from './modules/helpers/web3-helper';
declare const web3;

window.addEventListener('load', function () {
    let web3Local;
    if (typeof web3 !== 'undefined') {
        web3Local = regenWeb3();
    }
    console.log('web3', web3Local);
    startApp(web3Local);
});


const startApp = (web3) => {
    if (!web3) {
        return bootstrap();
    }
    web3Api.instance = web3;
    ipfsApi.instance = IpfsConnector.getInstance();
    console.time('bootstrap');
    IpfsConnector.getInstance().setOption('SignalServer', 'akasha.cloud');
    IpfsConnector.getInstance().setOption('config', { Addresses: { Swarm: ['/libp2p-webrtc-star/dns4/akasha.cloud/wss'] } });
    initChannels();
    const channels = injectApi();
    channel.instance = channels;
    initModules();
    // for dev only
    Object.defineProperty(window, 'Channel', { value: channels });
    Object.defineProperty(window, 'ipfs', { value: IpfsConnector });
    // end

    web3Helper.setChannel(channels.client.tx.emitMined);
    console.timeEnd('bootstrap');
    bootstrap(true);
};
