/// <reference path="../typings/main.d.ts" />
import ModuleEmitter from '../event/ModuleEmitter';
import search from './search/index';

class SearchIPC extends ModuleEmitter {

    constructor() {
        super();
        this.MODULE_NAME = 'search';
        this.DEFAULT_MANAGED = ['query', 'syncTags', 'findTags', 'syncEntries', 'findProfiles'];
    }

    /**
     *
     * @param webContents
     */
    public initListeners() {
        this._initMethods(search);
        this._manager();
    }
}

export default SearchIPC;
