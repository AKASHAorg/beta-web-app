/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import auth from './auth';

class AuthIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'auth';
        this.DEFAULT_MANAGED = ['login', 'logout', 'requestEther'];
    }

    initListeners() {
        this._initMethods(auth);
        this._manager();
    }

}

export default AuthIPC;
