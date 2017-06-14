const hashPath = (...path: string[]) => {
    return path.join('/');
};

const channels = {

    auth: ['login', 'logout', 'requestEther', 'generateEthKey', 'getLocalIdentities', 'regenSession'],

    tags: ['checkFormat', 'create', 'tagIterator', 'tagSubIterator', 'exists', 'getTagsCreated', 'subsCount',
        'subscribe', 'getTagId', 'getTagName', 'unSubscribe', 'isSubscribed', 'searchTag', 'getTagCount'],

    entry: ['getProfileEntriesCount', 'getTagEntriesCount', 'isActive', 'getEntry', 'publish', 'update', 'canClaim', 'claim',
        'downvote', 'getScore', 'getDepositBalance', 'upvote', 'voteCost', 'voteCount', 'entryTagIterator',
        'entryProfileIterator', 'votesIterator', 'getEntriesStream', 'getVoteOf', 'getEntryBalance', 'getEntryList',
        'editEntry', 'pin', 'followingStreamIterator', 'allStreamIterator', 'getLatestEntryVersion', 'getEntryIpfsHash',
        'resolveEntriesIpfsHash'],

    comments: ['getComment', 'comment', 'commentsCount', 'removeComment', 'commentsIterator', 'commentsParentIterator',
    'getProfileComments', 'resolveCommentsIpfsHash'],

    geth: ['options', 'startService', 'stopService', 'restartService', 'syncStatus', 'logs', 'status'],

    ipfs: ['startService', 'stopService', 'status', 'resolve', 'getConfig', 'setPorts', 'getPorts', 'logs', 'createImage'],

    profile: ['getBalance', 'followProfile', 'getFollowersCount', 'getFollowingCount', 'getProfileData',
        'unFollowProfile', 'updateProfileData', 'followersIterator', 'followingIterator', 'isFollower', 'isFollowing',
        'getFollowingList', 'getProfileList', 'tip'],

    registry: ['fetchRegistered', 'addressOf', 'checkIdFormat', 'getCurrentProfile', 'profileExists', 'registerProfile',
        'getByAddress', 'unregister'],

    tx: ['addToQueue', 'emitMined', 'getTransaction'],

    licenses: ['getLicenceById', 'getLicenses'],

    utils: ['osInfo']
};

const processes = ['server', 'client'];
const EVENTS: any = {client: {}, server: {}};

export function initChannels() {
    Object.keys(channels).forEach((attr) => {
        channels[attr].forEach((endpoint: string) => {
            processes.forEach((proc) => {
                if (!EVENTS[proc].hasOwnProperty(attr)) {
                    EVENTS[proc][attr] = {};
                }

                EVENTS[proc][attr][endpoint] = hashPath(proc, attr, endpoint);
            });
        });
    });
    return {client: EVENTS.client, server: EVENTS.server};
}

export default function getChannels() {
    return {client: EVENTS.client, server: EVENTS.server};
}


