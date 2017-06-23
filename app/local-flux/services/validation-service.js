import BaseService from './base-service';
import { channel } from 'services';

class ValidationService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.registry.manager;
    }

    /**
     * Validate akashaId on blockchain
     * Request:
     * @param akashaId <String>
     * Response:
     * @param data = { akashaId: string, exists: Boolean }
     */
    validateakashaId = (akashaId, { onError, onSuccess }) => {
        const serverChannel = channel.instance.server.registry.profileExists;
        const clientChannel = channel.instance.client.registry.profileExists;

        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () => serverChannel.send({ akashaId }));
    };
}
export { ValidationService };
