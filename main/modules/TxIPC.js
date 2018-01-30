import ModuleEmitter from '../event/ModuleEmitter';
import txModule from './tx';
class TxIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'tx';
        this.DEFAULT_MANAGED = ['addToQueue', 'emitMined', 'getTransaction'];
    }
    initListeners() {
        this._initMethods(txModule);
        this._manager();
    }
}
export default TxIPC;
//# sourceMappingURL=TxIPC.js.map