import 'babel-polyfill';
import { initChannels } from './channels';
import injectApi from './preloader';
import initModules from './init-modules';
import contracts from './contracts';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import Web3 from 'web3';
declare const web3;

window.addEventListener('load', function () {
    let web3Regen;
    if (typeof web3 !== 'undefined') {
        web3Regen = new Web3(web3.currentProvider);
    }
    startApp(web3Regen);
});

const startApp = (web3) => {
    console.log('web3', web3);
    console.time('bootstrap');
    IpfsConnector.getInstance().setOption('SignalServer', 'akasha.cloud');
    initChannels();
    Object.defineProperty(window, 'Contracts', { value: contracts.init(web3) });
    Object.defineProperty(window, 'Channel', { value: injectApi() });
    Object.defineProperty(window, 'ipfs', { value: IpfsConnector });
    initModules();
    console.timeEnd('bootstrap');
};
