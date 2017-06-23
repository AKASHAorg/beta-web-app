import BaseService from './base-service';
import tagsDB from './db/tags';
import { channel } from 'services';

/** Tag Service */
class TagService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.tags.manager;
    }

    getLocalTagsCount = () =>
        tagsDB.blockTags.count();

    createPendingTag = ({ tagObj, onSuccess, onError }) =>
        tagsDB.pendingTags.put(tagObj)
            .then(() => onSuccess(tagObj))
            .catch(reason => onError(reason));

    updatePendingTag = ({ tagObj, onSuccess, onError }) =>
        tagsDB.pendingTags.update(tagObj.tag, tagObj)
            .then(() => onSuccess(tagObj))
            .catch(error => onError(error));

    deletePendingTag = ({ tagObj, onSuccess, onError }) =>
        tagsDB.pendingTags.delete(tagObj.tag)
            .then(() => onSuccess(tagObj))
            .catch(error => onError(error));

    getPendingTags = ({ profile, onSuccess, onError }) =>
        tagsDB.pendingTags.where('profile').equals(profile).toArray()
            .then(results => onSuccess(results))
            .catch(reason => onError(reason));

    registerTag = ({ tagName, token, gas, onSuccess, onError }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.tags.create,
            clientChannel: channel.instance.client.tags.create,
            listenerCb: this.createListener(
                onError,
                (data) => {
                    onSuccess({ tag: tagName, tx: data.tx });
                },
            )
        }, () => {
            channel.instance.server.tags.create.send({ tagName, token, gas });
        });
    };

    checkExistingTags = (tag, cb) => {
        channel.instance.client.tags.exists.on(cb);
        channel.instance.server.tags.exists.send({ tagName: tag });
    };

    removeExistsListeners = () => {
        channel.instance.client.tags.exists.removeAllListeners();
    };

    getSelectedTag = ({
        akashaId,
        onError = () => {
        },
        onSuccess
    }) =>
        tagsDB.selectedTag.where('akashaId').equals(akashaId).toArray()
            .then(results => onSuccess(results[0]))
            .catch(reason => onError(reason));

    saveTag = ({
        akashaId,
        tagName,
        onError = () => {
        },
        onSuccess
    }) => {
        tagsDB.selectedTag.put({ akashaId, tagName });
        return tagsDB.selectedTag
            .where('akashaId')
            .equals(akashaId)
            .toArray()
            .then(results => onSuccess(results[0]))
            .catch(reason => onError(reason));
    };

    tagIterator = ({
        start,
        limit,
        onError = () => {
        },
        onSuccess
    }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.tags.tagIterator,
            clientChannel: channel.instance.client.tags.tagIterator,
            listenerCb: this.createListener(
                onError,
                onSuccess,
            )
        }, () => {
            channel.instance.server.tags.tagIterator.send({ start, limit });
        });

    subscribeTag = ({
        token,
        tagName,
        gas = 2000000,
        onError = () => {
        },
        onSuccess
    }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.tags.subscribe,
            clientChannel: channel.instance.client.tags.subscribe,
            listenerCb: this.createListener(
                onError,
                onSuccess,
            )
        }, () => {
            channel.instance.server.tags.subscribe.send({ token, tagName, gas });
        });

    unsubscribeTag = ({
        token,
        tagName,
        gas = 2000000,
        onError = () => {
        },
        onSuccess
    }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.tags.unSubscribe,
            clientChannel: channel.instance.client.tags.unSubscribe,
            listenerCb: this.createListener(
                onError,
                onSuccess,
            )
        }, () => {
            channel.instance.server.tags.unSubscribe.send({ token, tagName, gas });
        });
}

export { TagService };

export const getTagMargins = () =>
    new Promise((resolve, reject) =>
        tagsDB.margins
            .toArray()
            .then(data => resolve(data[0]))
            .catch(err => reject(err))
    );

export const getTagSuggestions = tag =>
    new Promise((resolve, reject) =>
        tagsDB.allTags
            .filter(item => item.tagName.includes(tag))
            .toArray()
            .then(data => resolve(data.slice(0, 5).map(item => item.tagName)))
            .catch(err => reject(err))
    );

export const saveTags = ({ collection }) =>
    new Promise((resolve, reject) =>
        tagsDB.allTags.bulkPut(collection)
            .then(() =>
                tagsDB.margins
                    .toArray()
                    .then((data) => {
                        const oldMargins = data[0];
                        let margins;
                        let firstTag = collection[collection.length - 1].tagId;
                        let lastTag = collection[0].tagId;
                        if (!oldMargins) {
                            margins = { firstTag, lastTag };
                            tagsDB.margins.put({ ...margins, staticId: 'staticId' })
                                .then(() => resolve(margins))
                                .catch(err => reject(err));
                        } else {
                            firstTag = Number(firstTag) < Number(oldMargins.firstTag) ?
                                firstTag :
                                oldMargins.firstTag;
                            lastTag = Number(lastTag) > Number(oldMargins.lastTag) ?
                                lastTag :
                                oldMargins.lastTag;
                            margins = { firstTag, lastTag };
                            tagsDB.margins.put({ ...margins, staticId: 'staticId' })
                                .then(() => resolve(margins))
                                .catch(err => reject(err));
                        }
                    })
            )
            .catch(err => reject(err))
    );
