import ModuleEmitter from '../event/ModuleEmitter';
import registry from './registry/index';
class RegistryIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'registry';
        this.DEFAULT_MANAGED = ['getCurrentProfile', 'getByAddress'];
    }
    initListeners(webContents) {
        this.webContents = webContents;
        this._initMethods(registry);
        this._manager();
    }
}
export default RegistryIPC;
//# sourceMappingURL=RegistryIPC.js.map