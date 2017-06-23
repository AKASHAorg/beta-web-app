import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
import { getCommentContent } from './ipfs';
import { SHORT_WAIT_TIME } from '../../config/settings';
import getProfile from '../profile/profile-data';
const execute = Promise.coroutine(function* (data) {
    const ethData = yield contracts.instance.comments.getComment(data.entryId, data.commentId);
    const profile = yield getProfile.execute({ profile: ethData.profile })
        .timeout(SHORT_WAIT_TIME)
        .then((d) => d).catch((e) => null);
    const content = yield getCommentContent(ethData.ipfsHash);
    ethData.profile = profile;
    return { data: Object.assign(ethData, content), entryId: data.entryId, commentId: data.commentId };
});
export default { execute, name: 'getComment' };
//# sourceMappingURL=get-comment.js.map