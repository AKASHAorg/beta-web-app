import BaseService from './base-service';
import { channel } from 'services';

/**
 * Ipfs process management
 * default open channels => ['startService', 'stopService', 'status', 'resolve']
 * channels => ['manager', 'startService', 'stopService', 'status', 'resolve']
 */
class IpfsService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.ipfs.manager;
        this.ipfsLoggerInterval = null;
    }

    /**
     * Send start IPFS service command to main process.
     * @param {object} options
     * @return promise
     */
    start = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = channel.instance.server.ipfs.startService;
        const clientChannel = channel.instance.client.ipfs.startService;

        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
        serverChannel.send(options);
    };
    /**
     * Register stop ipfs listener
     */
    registerStopListener = ({ onError = () => {}, onSuccess }) => {
        const clientChannel = channel.instance.client.ipfs.stopService;
        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
    };
    /**
     * Stop ipfs service
     */
    stop = ({ options = {} }) => {
        const serverChannel = channel.instance.server.ipfs.stopService;
        serverChannel.send(options);
    };
    /**
     * get ipfs status
     * @response data = {
     *      downloading?: boolean;
     *      api: boolean;
     *      process: boolean;
     *      started?: boolean;
     *      stopped?: boolean;
     * }
     */
    getStatus = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = channel.instance.server.ipfs.status;
        const clientChannel = channel.instance.client.ipfs.status;
        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
        serverChannel.send(options);
    };

    resolve = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = channel.instance.server.ipfs.resolve;
        const clientChannel = channel.instance.client.ipfs.resolve;
        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
        serverChannel.send(options);
    };
    /**
     * Retrieve config used by ipfs
     */
    getConfig = ({ options = {}, onError = () => {}, onSuccess }) => {
        const clientChannel = channel.instance.client.ipfs.getConfig;
        const serverChannel = channel.instance.server.ipfs.getConfig;

        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess)
        }, () =>
                serverChannel.send(options)
        );
    };

    /**
     * Retrieve ports used by ipfs
     */
    getPorts = ({ options = {}, onError = () => {}, onSuccess }) => {
        const clientChannel = channel.instance.client.ipfs.getPorts;
        const serverChannel = channel.instance.server.ipfs.getPorts;

        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess)
        }, () =>
                serverChannel.send(options)
        );
    };

    setPorts = ({ ports, restart = false, onError = () => {}, onSuccess }) => {
        const clientChannel = channel.instance.client.ipfs.setPorts;
        const serverChannel = channel.instance.server.ipfs.setPorts;
        const portsObj = { api: ports.apiPort, gateway: ports.gatewayPort, swarm: ports.swarmPort};
        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess)
        }, () =>
            serverChannel.send({ ports: portsObj, restart })
        );
    };

    /**
     *  Retrieve IPFS logs
     */
    getLogs = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = channel.instance.server.ipfs.logs;
        const clientChannel = channel.instance.client.ipfs.logs;

        this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () => {
            this.ipfsLoggerInterval = setInterval(() => {
                serverChannel.send(options);
            }, 2000);
        });
    };

    stopLogger = () => {
        const serverChannel = channel.instance.server.ipfs.logs;
        const clientChannel = channel.instance.client.ipfs.logs;

        clearInterval(this.ipfsLoggerInterval);
        this.closeChannel(serverChannel, clientChannel);
    };
}

export { IpfsService };
