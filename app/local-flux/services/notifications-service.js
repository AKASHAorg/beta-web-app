import BaseService from './base-service';
import { channel } from 'services';

class NotificationsService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.notifications.manager;
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
            serverChannel: channel.instance.server.notifications.setFilter,
            clientChannel: channel.instance.client.notifications.setFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                channel.instance.client.notifications.setFilter.channelName
            )
        }, () => {
            channel.instance.server.notifications.setFilter.send({ profiles, blockNr, exclude });
        });
    }

    listenFeed ({ onError = () => {}, onSuccess, stop = false, newerThan = null }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.notifications.feed,
            clientChannel: channel.instance.client.notifications.feed,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                channel.instance.client.notifications.setFilter.feed
            )
        }, () => {
            channel.instance.server.notifications.feed.send({ stop, newerThan });
        });
    }

    includeFilter ({ profiles, onError = () => {}, onSuccess = () => {} }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.notifications.includeFilter,
            clientChannel: channel.instance.client.notifications.includeFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                channel.instance.client.notifications.includeFilter.channelName
            )
        }, () => {
            channel.instance.server.notifications.includeFilter.send({ profiles });
        });
    }

    excludeFilter ({ profiles, onError = () => {}, onSuccess = () => {} }) {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.notifications.excludeFilter,
            clientChannel: channel.instance.client.notifications.excludeFilter,
            listenerCb: this.createListener(
                onError,
                onSuccess,
                channel.instance.client.notifications.excludeFilter.channelName
            )
        }, () => {
            channel.instance.server.notifications.excludeFilter.send({ profiles });
        });
    }

    mention = ({ mention, entryId, commentId, onSuccess = () => {}, onError = () => {} }) => {
        const clientChannel = channel.instance.client.notifications.mention;
        const serverChannel = channel.instance.server.notifications.mention;
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
