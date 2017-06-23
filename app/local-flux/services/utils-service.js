import BaseService from './base-service';
import { channel } from 'services';

class UtilsService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.utils.manager;
    }

    backupKeys = ({ target, onSuccess, onError }) => {
        const clientChannel = channel.instance.client.utils.backupKeys;
        const serverChannel = channel.instance.server.utils.backupKeys;
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
            serverChannel.send({ target });
        });
    };
}

export { UtilsService };
