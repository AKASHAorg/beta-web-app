import ModuleEmitter from '../event/ModuleEmitter';
import tags from './tags/index';
class TagsIPC extends ModuleEmitter {
    constructor() {
        super();
        this.MODULE_NAME = 'tags';
        this.DEFAULT_MANAGED = ['exists', 'getTagId', 'getTagName', 'searchTag'];
    }
    initListeners(webContents) {
        this.webContents = webContents;
        this._initMethods(tags);
        this._manager();
    }
}
export default TagsIPC;
//# sourceMappingURL=TagsIPC.js.map