/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import registry from './registry/index';

class RegistryIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'registry';
        this.DEFAULT_MANAGED = ['getCurrentProfile', 'getByAddress'];
    }

    public initListeners() {
        this._initMethods(registry);
        this._manager();
    }
}

export default RegistryIPC;
