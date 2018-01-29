import ModuleEmitter from '../event/ModuleEmitter';
import channels from '../channels';
import { mainResponse } from '../event/responses';
import { getLicence, LicencesList } from './models/Licenses';
class LicensesIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'licenses';
        this.DEFAULT_MANAGED = ['getLicenceById'];
    }
    initListeners(webContents) {
        this.webContents = webContents;
        this
            ._getLicenses()
            ._getLicenceById()
            ._manager();
    }
    _getLicenses() {
        this.registerListener(channels.server[this.MODULE_NAME].getLicenses, (event, data) => {
            const response = mainResponse({ licenses: LicencesList }, data);
            this.fireEvent(channels.client[this.MODULE_NAME].getLicenses, response, event);
        });
        return this;
    }
    _getLicenceById() {
        this.registerListener(channels.server[this.MODULE_NAME].getLicenceById, (event, data) => {
            const response = mainResponse({ license: getLicence(data.id) }, data);
            this.fireEvent(channels.client[this.MODULE_NAME].getLicenceById, response, event);
        });
        return this;
    }
}
export default LicensesIPC;
//# sourceMappingURL=LicensesIPC.js.map