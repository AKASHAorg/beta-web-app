import BaseContract from './BaseContract';
import * as Promise from 'bluebird';

export default class RegistryStore extends BaseContract {
    /**
     *
     * @param instance
     * @param web3
     */
    constructor(instance: any, web3: any) {
        super();
        this.web3 = web3;
        this.contract = instance;
        this.contract.can_store.callAsync = Promise.promisify(this.contract.can_store.call);
        this.contract.has_store.callAsync = Promise.promisify(this.contract.has_store.call);
    }

    /**
     *
     * @param id
     * @param owner
     */
    public canStore(id: string, owner: string) {
        this.contract.can_store.callAsync(id, owner);
    }

    /**
     *
     * @param id
     * @param owner
     */
    public hasStore(id: string, owner: string) {
        this.contract.has_store.callAsync(id, owner);
    }
}
