import ModuleEmitter from '../event/ModuleEmitter';
import profile from './profile/index';
class ProfileIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'profile';
        this.DEFAULT_MANAGED = ['getProfileData', 'getBalance'];
    }
    initListeners(webContents) {
        this.webContents = webContents;
        this._initMethods(profile);
        this._manager();
    }
}
export default ProfileIPC;
//# sourceMappingURL=ProfileIPC.js.map