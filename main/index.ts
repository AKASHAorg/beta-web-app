import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import Web3 from 'web3';
import { initChannels } from './channels';
import injectApi from './preloader';
import initModules from './init-modules';
import contracts from './contracts';
import {web3Api, ipfsApi} from './services';
declare const web3;

window.addEventListener('load', function () {
    let web3Regen;
    if (typeof web3 !== 'undefined') {
        web3Regen = new Web3(web3.currentProvider);
        web3Regen.eth = Promise.promisifyAll(web3Regen.eth);
        web3Regen.shh = Promise.promisifyAll(web3Regen.shh);
        web3Regen.personal = Promise.promisifyAll(web3Regen.personal);
        web3Regen.net = Promise.promisifyAll(web3Regen.net);
        web3Regen.version = Promise.promisifyAll(web3Regen.version);
    }
    startApp(web3Regen);
});


const startApp = (web3) => {
    console.log('web3', web3);
    web3Api.instance = web3;
    ipfsApi.instance = IpfsConnector.getInstance();
    console.time('bootstrap');
    IpfsConnector.getInstance().setOption('SignalServer', 'akasha.cloud');
    IpfsConnector.getInstance().setOption('config', { Addresses : { Swarm: ['/libp2p-webrtc-star/dns4/akasha.cloud/wss'] } });
    initChannels();
    // for debug
    Object.defineProperty(window, 'Contracts', { value: contracts.init(web3) });
    Object.defineProperty(window, 'Channel', { value: injectApi() });
    Object.defineProperty(window, 'ipfs', { value: IpfsConnector });
    Object.defineProperty(window, 'web3', { value: web3 });
     //
    initModules();
    console.timeEnd('bootstrap');
};
