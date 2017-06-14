import ModuleEmitter from '../event/ModuleEmitter';
import entry from './entry/index';

class EntryIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'entry';
        this.DEFAULT_MANAGED = ['getScore', 'getEntry'];
    }

    public initListeners() {
        this._initMethods(entry);
        this._manager();
    }

}

export default EntryIPC;
