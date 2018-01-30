/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import utils from './utils/index';

class UtilsIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'utils';
        this.DEFAULT_MANAGED = ['manaCosts', 'checkUpdate'];
    }

    /**
     *
     * @param webContents
     */
    public initListeners() {
        this._initMethods(utils);
        this._manager();
    }
}

export default UtilsIPC;
