import BaseService from './base-service';
import { channel } from 'services';

class SearchService extends BaseService {
    handshake = ({ onError, onSuccess }) => {
        this.registerListener(
            channel.instance.client.search.handshake,
            this.createListener(onError, onSuccess)
        );
        channel.instance.server.search.handshake.send({});
    };

    query = ({ text, offset = 0, pageSize = 5, onError, onSuccess }) => {
        this.registerListener(
            channel.instance.client.search.query,
            this.createListener(onError, onSuccess)
        );
        channel.instance.server.search.query.send({ text, offset, pageSize });
    };
}

export { SearchService };
