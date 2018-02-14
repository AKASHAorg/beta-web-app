import BaseService from './base-service';
import getChannels from 'akasha-channels';

/**
 * Default managed channels: [startService, stopService, status]
 */
class GethService extends BaseService {
    constructor () {
        super();
        this.clientManager = getChannels().client.geth.manager;
        this.gethLoggerInterval = null;
    }

    /**
     * sends start Geth command to main process w/o options
     * @param {object} options Optional params
     * @return promise
     */
    start = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = getChannels().server.geth.startService;
        const clientChannel = getChannels().client.geth.startService;
        const gethOptions = {};

        Object.keys(options).forEach((key) => {
            if (key !== 'name' && options[key] !== null && options[key] !== false) {
                gethOptions[key] = options[key];
            }
        });

        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
        serverChannel.send(gethOptions);
    };

    /**
     * Register stop geth listener
     */
    registerStopListener ({ onError = () => {}, onSuccess }) {
        const clientChannel = getChannels().client.geth.stopService;
        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
    }

    /**
     * Stop Geth process
     */
    stop = ({ options = {} }) => {
        const serverChannel = getChannels().server.geth.stopService;
        serverChannel.send(options);
    }
    /**
     * Restart Geth
     * @params timer? <Number> milliseconds to wait before starting again
     */
    restart = ({ options = { timer: 6000 }, onError = () => {}, onSuccess }) => {
        const serverChannel = getChannels().server.geth.restartService;
        const clientChannel = getChannels().client.geth.restartService;

        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () =>
            serverChannel.send(options)
        );
    };
    /**
     *  Retrieve Geth logs
     */
    getLogs = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = getChannels().server.geth.logs;
        const clientChannel = getChannels().client.geth.logs;

        this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () => {
            this.gethLoggerInterval = setInterval(() => {
                serverChannel.send(options);
            }, 2000);
        });
    };

    stopLogger = () => {
        const serverChannel = getChannels().server.geth.logs;
        const clientChannel = getChannels().client.geth.logs;

        clearInterval(this.gethLoggerInterval);
        this.closeChannel(serverChannel, clientChannel);
    };

    /**
     *  Get current status of geth;
     *  @response data = {
     *      downloading?: boolean;
     *      starting?: boolean;
     *      api: boolean;
     *      process: boolean;
     *      started?: boolean;
     *      stopped?: boolean;
     *  }
     */
    getStatus = ({ options = {}, onError = () => {}, onSuccess }) => {
        const serverChannel = getChannels().server.geth.status;
        const clientChannel = getChannels().client.geth.status;

        this.registerListener(
            clientChannel,
            this.createListener(onError, onSuccess, clientChannel.channelName)
        );
        serverChannel.send(options);
    };
    /**
     * Retrieve options used by geth
     */
    getOptions = ({ options = {}, onError = () => {}, onSuccess }) => {
        const clientChannel = getChannels().client.geth.options;
        const serverChannel = getChannels().server.geth.options;
        return this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () => {
            serverChannel.send(options);
        });
    };
    /**
     * Update sync status sent by main process
     * @param {function} cb callback
     */
    getSyncStatus = ({ options = {}, onError = () => {}, onSuccess }) => {
        const clientChannel = getChannels().client.geth.syncStatus;
        const serverChannel = getChannels().server.geth.syncStatus;

        this.openChannel({
            clientManager: this.clientManager,
            serverChannel,
            clientChannel,
            listenerCb: this.createListener(onError, onSuccess, clientChannel.channelName)
        }, () =>
            serverChannel.send(options)
        );
    };
    closeSyncChannel = () => {
        // this.closeChannel(
        //     this.serverManager,
        //     getChannels().server.geth.syncStatus,
        //     getChannels().client.geth.syncStatus
        // );
    }
}

export { GethService };
