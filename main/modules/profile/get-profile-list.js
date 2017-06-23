import * as Promise from 'bluebird';
import getProfileData from './profile-data';
const execute = Promise.coroutine(function* (data) {
    const pool = data.map((profile) => {
        return getProfileData.execute(profile);
    });
    const collection = yield Promise.all(pool);
    return { collection: collection, resolve: data };
});
export default { execute, name: 'getProfileList' };
//# sourceMappingURL=get-profile-list.js.map