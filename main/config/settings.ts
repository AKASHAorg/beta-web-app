export const generalSettings = new Map();
export const BASE_URL = 'baseUrl';

export const INSTANT_WAIT_TIME = 300;
export const SHORT_WAIT_TIME = 18000;
export const MEDIUM_WAIT_TIME = 15000;
export const FULL_WAIT_TIME = 36000;

export const FOLLOWING_LIST = 'followingList';
export const BLOCK_INTERVAL = 5300;
export const F_STREAM_I = 'followingStreamIterator';
export const A_STREAM_I = 'allStreamIterator';

export const BACKUP_KEYS_NAME = 'akasha_keystore.zip';

export const FAUCET_TOKEN = '0x7016aec60a8cb208833d8cd9a05f5705a3600b2c2796180503373f56b3e0d959';

export const FAUCET_URL = 'https://akasha.fun/get/faucet';

export const GETH_LOGGER = 'geth';
export const IPFS_LOGGER = 'ipfs';

export const defaultPath = 'ipfs#akasha-beta';

export const IPFS_PEER_ID = [
    '/ip4/46.101.103.114/tcp/4001/ipfs/QmYfXRuVWMWFRJxUSFPHtScTNR9CU2samRsTK15VFJPpvh',
    '/ip4/46.101.222.96/tcp/4001/ipfs/QmWfVX1MTacGQ1to1u17MtHPpgANR1UJk9h6JqtbYaRKre',
    '/ip4/207.154.192.173/tcp/4001/ipfs/QmSgTsiHrubEkLKEvdEjNtWHRasU1dUSgPfMjJpkR8KkBU',
    '/ip4/138.197.200.90/tcp/4001/ipfs/QmX9Nhr56k7K2JBQbu9JBpF2s1AQk8WpmZc6v4sqZERMRu',
    '/ip4/159.89.168.113/tcp/4001/ipfs/QmTfTyKZXjzRo2C8NV6p21HCsxZF54Mm5cZ9GsfY3zpG3T',
    '/ip4/138.197.108.157/tcp/4001/ipfs/QmTMSgsyw3zzVbcQnkoN5SRZk7WYUMorJ7EqkqVBLgn13i',
    '/ip4/188.166.216.1/tcp/4001/ipfs/QmdACfcTWdhB1YCzmRoN2xqLrVL1s4fBCEU8bNQovpwAW5',
    '/ip4/165.227.62.58/tcp/4001/ipfs/QmUjM53zcSRhsA8BCK28DchCdSJCNmEU6W6jPJHiSgxwTW'
];

export const IPFS_CIRCUIT_RELAYS = [
    '/p2p-circuit/ipfs/QmWfVX1MTacGQ1to1u17MtHPpgANR1UJk9h6JqtbYaRKre',
    '/p2p-circuit/ipfs/QmSgTsiHrubEkLKEvdEjNtWHRasU1dUSgPfMjJpkR8KkBU',
    '/p2p-circuit/ipfs/QmUjM53zcSRhsA8BCK28DchCdSJCNmEU6W6jPJHiSgxwTW',
    '/p2p-circuit/ipfs/QmTfTyKZXjzRo2C8NV6p21HCsxZF54Mm5cZ9GsfY3zpG3T',
    '/p2p-circuit/ipfs/QmTMSgsyw3zzVbcQnkoN5SRZk7WYUMorJ7EqkqVBLgn13i',
    '/p2p-circuit/ipfs/QmYfXRuVWMWFRJxUSFPHtScTNR9CU2samRsTK15VFJPpvh'
];
// default settings
generalSettings.set(BASE_URL, 'https://ipfs.io/ipfs');
