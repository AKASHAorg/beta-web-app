import BaseService from './base-service';
import getChannels from 'akasha-channels';


class CommentService extends BaseService {
    getEntryComments = ({ entryId, start, limit, reverse, onSuccess, onError }) =>
        this.openChannel({
            clientManager: getChannels().client.comments.manager,
            serverChannel: getChannels().server.comments.commentsIterator,
            clientChannel: getChannels().client.comments.commentsIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            const payload = {
                entryId, limit, reverse
            };
            if (start) {
                payload.start = start;
            }
            getChannels().server.comments.commentsIterator.send(payload);
        });
    // a separate listener should be used here!
    getNewEntryComments = ({ entryId, start, limit, reverse, onSuccess, onError }) => {
        this.openChannel({
            clientManager: getChannels().client.comments.manager,
            serverChannel: getChannels().server.comments.commentsIterator,
            clientChannel: getChannels().client.comments.commentsIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            getChannels().server.comments.commentsIterator.send({ entryId, start, limit, reverse });
        });
        // getChannels().client.comments.manager.once((ev, res) => {
        //     // if (res.error) return onError(res.error);
        //     getChannels().client.comments.commentsIterator.once((evnt, resp) => {
        //         if (resp.error) return onError(resp.error);
        //         return onSuccess(resp.data);
        //     });
        //     const payload = {
        //         entryId, limit, reverse
        //     };
        //     if (start) {
        //         payload.start = start;
        //     }
        //     getChannels().server.comments.commentsIterator.send(payload);
        // });
        // getChannels().server.comments.commentsIterator.enable();
    }

    getCommentsCount = ({ entryId, onSuccess, onError }) =>
        this.openChannel({
            clientManager: getChannels().client.comments.manager,
            serverChannel: getChannels().server.comments.commentsCount,
            clientChannel: getChannels().client.comments.commentsCount,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            getChannels().server.comments.commentsCount.send({ entryId });
        });

    publishComment = ({ onSuccess, onError, ...payload }) => {
        this.registerListener(
            getChannels().client.comments.comment,
            this.createListener(onError, onSuccess)
        );
        getChannels().server.comments.comment.send(payload);
    }
}
export { CommentService };
