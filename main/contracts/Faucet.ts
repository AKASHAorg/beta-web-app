import BaseContract from './BaseContract';
import * as Promise from 'bluebird';

export default class Faucet extends BaseContract {
    /**
     *
     * @param instance
     * @param web3
     */
    constructor(instance: any, web3: any) {
        super();
        this.web3 = web3;
        this.contract = instance;
        this.contract.getLastClaim.callAsync = Promise.promisify(this.contract.getLastClaim.call);
        this.contract.canClaim.callAsync = Promise.promisify(this.contract.canClaim.call);
    }

    public claim(gas: number = 2000000) {
        return this.evaluateData('claim', gas);
    }

    public getLastClaim(idAddress: string) {
        this.contract.getLastClaim.callAsync(idAddress).then((result) => result.toString()); // returns block number
    }

    public canClaim(idAddress: string) {
        this.contract.canClaim.callAsync(idAddress);
    }
}
