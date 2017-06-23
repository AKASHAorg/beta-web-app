import BaseContract from './BaseContract';
import * as Promise from 'bluebird';
export default class RegistryStore extends BaseContract {
    constructor(instance, web3) {
        super();
        this.web3 = web3;
        this.contract = instance;
        this.contract.can_store.callAsync = Promise.promisify(this.contract.can_store.call);
        this.contract.has_store.callAsync = Promise.promisify(this.contract.has_store.call);
    }
    canStore(id, owner) {
        this.contract.can_store.callAsync(id, owner);
    }
    hasStore(id, owner) {
        this.contract.has_store.callAsync(id, owner);
    }
}
//# sourceMappingURL=RegistryStore.js.map