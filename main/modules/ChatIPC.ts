import ModuleEmitter from '../event/ModuleEmitter';
import chat from './chat/index';

class ChatIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'chat';
        this.DEFAULT_MANAGED = ['join', 'post', 'leave', 'peerCount', 'getRooms'];
    }

    public initListeners() {
        this._initMethods(chat);
        this._manager();
    }

}

export default ChatIPC;
