import BaseService from './base-service';
import getChannels from 'akasha-channels';


class NotificationsService extends BaseService {
    constructor () {
        super();
        this.clientManager = getChannels().client.notifications.manager;
    }

    // set profiles< address > to push notifications
    setFilter ({
        profiles = [],
        blockNr = 0,
        exclude = [],
        onError = () => { },
        onSuccess
    }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: getChannels().server.notifications.setFilter,
            clientChannel: getChannels().client.notifications.setFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                getChannels().client.notifications.setFilter.channelName
            )
        }, () => {
            getChannels().server.notifications.setFilter.send({ profiles, blockNr, exclude });
        });
    }

    listenFeed ({ onError = () => {}, onSuccess, stop = false, newerThan = null }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: getChannels().server.notifications.feed,
            clientChannel: getChannels().client.notifications.feed,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                getChannels().client.notifications.setFilter.feed
            )
        }, () => {
            getChannels().server.notifications.feed.send({ stop, newerThan });
        });
    }

    includeFilter ({ profiles, onError = () => {}, onSuccess = () => {} }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: getChannels().server.notifications.includeFilter,
            clientChannel: getChannels().client.notifications.includeFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                getChannels().client.notifications.includeFilter.channelName
            )
        }, () => {
            getChannels().server.notifications.includeFilter.send({ profiles });
        });
    }

    excludeFilter ({ profiles, onError = () => {}, onSuccess = () => {} }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: getChannels().server.notifications.excludeFilter,
            clientChannel: getChannels().client.notifications.excludeFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                getChannels().client.notifications.excludeFilter.channelName
            )
        }, () => {
            getChannels().server.notifications.excludeFilter.send({ profiles });
        });
    }

    mention = ({ mention, entryId, commentId, onSuccess = () => {}, onError = () => {} }) => {
        const clientChannel = getChannels().client.notifications.mention;
        const serverChannel = getChannels().server.notifications.mention;
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                clientChannel.channelName
            )
        }, () => {
            serverChannel.send({ mention, entryId, commentId });
        });
    };
}
export { NotificationsService };
