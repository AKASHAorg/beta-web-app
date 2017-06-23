import BaseService from './base-service';
import { channel } from 'services';


class CommentService extends BaseService {

    getEntryComments = ({ entryId, start, limit, reverse, onSuccess, onError }) =>
        this.openChannel({
            clientManager: channel.instance.client.comments.manager,
            serverChannel: channel.instance.server.comments.commentsIterator,
            clientChannel: channel.instance.client.comments.commentsIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            const payload = {
                entryId, limit, reverse
            };
            if (start) {
                payload.start = start;
            }
            channel.instance.server.comments.commentsIterator.send(payload);
        });
    // a separate listener should be used here!
    getNewEntryComments = ({ entryId, start, limit, reverse, onSuccess, onError }) => {
        this.openChannel({
            clientManager: channel.instance.client.comments.manager,
            serverChannel: channel.instance.server.comments.commentsIterator,
            clientChannel: channel.instance.client.comments.commentsIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.comments.commentsIterator.send({ entryId, start, limit, reverse });
        });
        // channel.instance.client.comments.manager.once((ev, res) => {
        //     // if (res.error) return onError(res.error);
        //     channel.instance.client.comments.commentsIterator.once((evnt, resp) => {
        //         if (resp.error) return onError(resp.error);
        //         return onSuccess(resp.data);
        //     });
        //     const payload = {
        //         entryId, limit, reverse
        //     };
        //     if (start) {
        //         payload.start = start;
        //     }
        //     channel.instance.server.comments.commentsIterator.send(payload);
        // });
        // channel.instance.server.comments.commentsIterator.enable();
    }

    getCommentsCount = ({ entryId, onSuccess, onError }) =>
        this.openChannel({
            clientManager: channel.instance.client.comments.manager,
            serverChannel: channel.instance.server.comments.commentsCount,
            clientChannel: channel.instance.client.comments.commentsCount,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.comments.commentsCount.send({ entryId });
        });

    publishComment = ({ onSuccess, onError, ...payload }) => {
        this.registerListener(
            channel.instance.client.comments.comment,
            this.createListener(onError, onSuccess)
        );
        channel.instance.server.comments.comment.send(payload);
    }
}
export { CommentService };
