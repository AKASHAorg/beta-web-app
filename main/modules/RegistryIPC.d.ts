/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
declare class RegistryIPC extends ModuleEmitter {
    constructor();
    initListeners(): void;
}
export default RegistryIPC;
