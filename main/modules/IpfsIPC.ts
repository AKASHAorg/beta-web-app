/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import * as logger from 'loglevel';
import { IPFS_LOGGER } from '../config/settings';
import ipfsModule from './ipfs';

class IpfsIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'ipfs';
        this.DEFAULT_MANAGED = ['startService', 'stopService', 'status', 'resolve', 'setPorts', 'getPorts'];
    }

    public initListeners() {
        IpfsConnector.getInstance().setLogger(
            logger.getLogger(IPFS_LOGGER)
        );
        this._initMethods(ipfsModule);
        this._manager();
    }
}

export default IpfsIPC;
