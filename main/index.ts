const WebRTCStar = require('libp2p-webrtc-star');
const WebSockets = require('libp2p-websockets');

const Multiplex = require('libp2p-multiplex');
const SPDY = require('libp2p-spdy');
const SECIO = require('libp2p-secio');
const Railing = require('libp2p-railing');
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
    const wstar = new WebRTCStar();
    const bootstrapers = [
        '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
        '/dns4/sfo-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx',
        '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
        '/dns4/sfo-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
        '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
        '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
        '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
        '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
        '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
        '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
    ];
    const modules = {
        transport: [
            wstar,
            new WebSockets()
        ],
        connection: {
            muxer: [
                Multiplex,
                SPDY
            ],
            crypto: [SECIO]
        },
        discovery: [
            wstar.discovery,
            new Railing(bootstrapers)
        ]
    };
    IpfsConnector.getInstance().setOption('config',
        {
            Addresses: {
                Swarm: [],
                API: '',
                Gateway: ''
            },
            Discovery: {
                MDNS: {
                    Enabled: false,
                    Interval: 10
                },
                webRTCStar: {
                    Enabled: true
                }
            },
            EXPERIMENTAL: {
                pubsub: true
            },
            libp2p: modules
        });
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
