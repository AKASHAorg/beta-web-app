/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
declare class AuthIPC extends ModuleEmitter {
    constructor();
    initListeners(): void;
}
export default AuthIPC;
