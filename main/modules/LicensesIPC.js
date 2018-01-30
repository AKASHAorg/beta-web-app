import ModuleEmitter from '../event/ModuleEmitter';
import licencesModule from './licenses';
class LicensesIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'licenses';
        this.DEFAULT_MANAGED = ['getLicenceById'];
    }
    initListeners() {
        this._initMethods(licencesModule);
        this._manager();
    }
}
export default LicensesIPC;
//# sourceMappingURL=LicensesIPC.js.map