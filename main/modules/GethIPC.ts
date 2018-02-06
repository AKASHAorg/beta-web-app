import ModuleEmitter from '../event/ModuleEmitter';
import gethModule from './geth';

class GethIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'geth';
        this.DEFAULT_MANAGED = ['startService', 'stopService', 'status', 'syncStatus'];
    }

    public initListeners() {
        this._initMethods(gethModule);
        this._manager();
    }
}
export default GethIPC;