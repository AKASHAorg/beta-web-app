/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import * as logger from 'loglevel';
import { IPFS_LOGGER, IPFS_PEER_ID } from '../config/settings';
import ipfsModule from './ipfs';
import getChannels from '../channels';
import { mainResponse } from '../event/responses';

class IpfsIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'ipfs';
        this.DEFAULT_MANAGED = ['startService', 'stopService', 'status', 'resolve'];
        this.attachEmitters();
    }

    public initListeners() {
        IpfsConnector.getInstance().setLogger(
            logger.getLogger(IPFS_LOGGER)
        );
        this._initMethods(ipfsModule);
        this._manager();
    }

    public attachEmitters() {
        this._download()
            ._starting()
            ._catchCorrupted()
            ._catchFailed()
            ._catchError()
            ._started()
            ._stopped();
        return true;
    }

    private _download() {
        IpfsConnector.getInstance().on(
            ipfsEvents.DOWNLOAD_STARTED,
            () => {
                this.fireEvent(getChannels().client.ipfs.startService, mainResponse({ downloading: true }, {}));
            }
        );
        return this;
    }

    private _starting() {
        IpfsConnector.getInstance().on(
            ipfsEvents.SERVICE_STARTING,
            () => {
                this.fireEvent(getChannels().client.ipfs.startService, mainResponse({ starting: true }, {}));
            }
        );
        return this;
    }

    private _started() {
        IpfsConnector.getInstance().on(
            ipfsEvents.SERVICE_STARTED,
            () => {
                this.fireEvent(getChannels().client.ipfs.startService, mainResponse({ started: true }, {}));
                IpfsConnector.getInstance()
                    .api
                    .apiClient
                    .bootstrap
                    .add(IPFS_PEER_ID, (err) => {
                        if (err) {
                            console.log('add ipfs peer err ', err);
                        }
                    });
            }
        );
        return this;
    }

    private _stopped() {
        IpfsConnector.getInstance().on(
            ipfsEvents.SERVICE_STOPPED,
            () => {
                this.fireEvent(getChannels().client.ipfs.stopService, mainResponse({ stopped: true }, {}));
            }
        );
        return this;
    }

    private _catchCorrupted() {
        IpfsConnector.getInstance().once(
            ipfsEvents.UPGRADING_BINARY, (message: string) => {
                this.fireEvent(getChannels().client.ipfs.startService,
                    mainResponse({ upgrading: true, message }, {})
                );
            });
        IpfsConnector.getInstance().on(
            ipfsEvents.BINARY_CORRUPTED,
            (err: Error) => {
                this.fireEvent(
                    getChannels().client.ipfs.startService,
                    mainResponse({ error: err }, {})
                );
            }
        );
        return this;
    }

    private _catchFailed() {
        IpfsConnector.getInstance().on(
            ipfsEvents.SERVICE_FAILED,
            (err: Error) => {
                this.fireEvent(
                    getChannels().client.ipfs.startService,
                    mainResponse({ error: err }, {})
                );
            }
        );
        return this;
    }

    private _catchError() {
        IpfsConnector.getInstance().on(
            ipfsEvents.ERROR,
            (message: string) => {
                this.fireEvent(
                    getChannels().client.ipfs.startService,
                    mainResponse({ error: message }, {})
                );
            });
        return this;
    }
}

export default IpfsIPC;
