/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
declare class IpfsIPC extends ModuleEmitter {
    constructor();
    initListeners(): void;
}
export default IpfsIPC;
