const searchIndex = require('search-index');
import * as Promise from 'bluebird';

export default class StorageIndex {
    private _options: any;

    constructor(dbPath: string, additional?: any) {
        this._options = Object.assign({},
            { indexPath: dbPath, appendOnly: false, preserveCase: false, nGramLength: {gte: 1, lte: 4}},
            additional)
        ;
    }

    /**
     *
     * @returns {Bluebird<any>}
     */
    init() {
        return Promise.fromCallback((cb) => searchIndex(this._options, cb));
    }
}
