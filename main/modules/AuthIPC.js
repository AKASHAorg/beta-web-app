import ModuleEmitter from '../event/ModuleEmitter';
import auth from './auth';
class AuthIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'auth';
        this.DEFAULT_MANAGED = ['login', 'logout', 'requestEther'];
    }
    initListeners(webContents) {
        this.webContents = webContents;
        this._initMethods(auth);
        this._manager();
    }
}
export default AuthIPC;
//# sourceMappingURL=AuthIPC.js.map