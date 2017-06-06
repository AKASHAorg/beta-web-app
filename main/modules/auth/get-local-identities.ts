import * as Promise from 'bluebird';
import contracts from '../../contracts/index';

const execute = Promise.coroutine(function*() {
    const profiles = yield contracts.instance.registry.getLocalProfiles();
    for (let profile of profiles) {
        profile.akashaId = yield contracts.instance.profile.getId(profile.profile);
    }
    return profiles;
});

export default { execute, name: 'getLocalIdentities' };
