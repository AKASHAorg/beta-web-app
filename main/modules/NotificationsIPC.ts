import notifications from './notifications/index';
import ModuleEmitter from '../event/ModuleEmitter';

class NotificationsIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'notifications';
        this.DEFAULT_MANAGED = ['subscribe'];
    }

    public initListeners() {
        this._initMethods(notifications);
        this._manager();
    }

}

export default NotificationsIPC;

