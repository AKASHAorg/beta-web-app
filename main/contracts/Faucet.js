import BaseContract from './BaseContract';
import * as Promise from 'bluebird';
export default class Faucet extends BaseContract {
    constructor(instance, web3) {
        super();
        this.web3 = web3;
        this.contract = instance;
        this.contract.getLastClaim.callAsync = Promise.promisify(this.contract.getLastClaim.call);
        this.contract.canClaim.callAsync = Promise.promisify(this.contract.canClaim.call);
    }
    claim(gas = 2000000) {
        return this.evaluateData('claim', gas);
    }
    getLastClaim(idAddress) {
        this.contract.getLastClaim.callAsync(idAddress).then((result) => result.toString());
    }
    canClaim(idAddress) {
        this.contract.canClaim.callAsync(idAddress);
    }
}
//# sourceMappingURL=Faucet.js.map