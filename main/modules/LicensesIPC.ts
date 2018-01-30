import ModuleEmitter from '../event/ModuleEmitter';
import licencesModule from './licenses';

class LicensesIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'licenses';
        this.DEFAULT_MANAGED = ['getLicenceById'];
    }

    public initListeners() {
        this._initMethods(licencesModule);
        this._manager();
    }
}
export default LicensesIPC;