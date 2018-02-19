// import IpfsConnector from '@akashaproject/ipfs-js-connector';
//
// self.addEventListener('install', (event) => {
//     console.log('install step');
//
//     event.waitUntil(self.skipWaiting());
// });
//
// self.addEventListener('activate', (event) => {
//     console.log('activate step');
//
//     IpfsConnector.getInstance().setOption('config',
//         {
//             Addresses: {
//                 Swarm: [
//                     // '/dns4/akasha.cloud/tcp/443/wss/p2p-webrtc-star' // webRTC not working in sw
//                 ],
//                 API: '',
//                 Gateway: ''
//             },
//             Bootstrap: [
//                 '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
//                 '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
//                 '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
//                 '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
//                 '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
//                 '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
//                 '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
//                 '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
//                 '/dns4/akasha.online/tcp/443/wss/ipfs/QmSgTsiHrubEkLKEvdEjNtWHRasU1dUSgPfMjJpkR8KkBU',
//                 '/dns4/akasha.observer/tcp/443/wss/ipfs/QmUjM53zcSRhsA8BCK28DchCdSJCNmEU6W6jPJHiSgxwTW'
//             ],
//             Discovery: {
//                 MDNS: {
//                     Enabled: false,
//                     Interval: 10
//                 }
//                 // ,
//                 // webRTCStar: {
//                 //     Enabled: true
//                 // }
//             },
//             EXPERIMENTAL: {
//                 pubsub: true
//             }
//         });
//     IpfsConnector.getInstance().setOption('repo', 'ipfs#sw#akasha-beta');
//     IpfsConnector.getInstance().start().then(d => console.log('started ipfs'));
//
//     event.waitUntil(self.clients.claim());
// });
//
// self.addEventListener('fetch', (event) => {
//     if (!event.request.url.startsWith(self.location.origin + '/ipfs')) {
//         return;
//     }
//
//     console.log('Handling fetch event for', event.request.url);
//
//     // meh, no peers from service worker
//     IpfsConnector.getInstance().api.apiClient.swarm.peers().then(d => console.log(d));
//     const headers = {
//         status: 200,
//         statusText: 'OK',
//         headers: {'Content-Type': 'application/json'},
//     };
//     const multihash = event.request.url.split('/ipfs/')[1];
//     event.respondWith(
//         IpfsConnector.getInstance().api.get(multihash).then(d => new Response(d, headers))
//     );
// });