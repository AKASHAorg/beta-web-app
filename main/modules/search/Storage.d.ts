import * as Promise from 'bluebird';
export default class StorageIndex {
    private _options;
    constructor(dbPath: string, additional?: any);
    init(): Promise<any>;
}
