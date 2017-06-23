import BaseContract from './BaseContract';
import * as Promise from 'bluebird';
export default class Profile extends BaseContract {
    constructor(instance, web3) {
        super();
        this.web3 = web3;
        this.contract = instance;
    }
    getIpfs(address) {
        const profile = this.contract.at(address);
        const first = Promise.fromCallback((cb) => {
            profile._hash.call(0, cb);
        });
        const second = Promise.fromCallback((cb) => {
            profile._hash.call(1, cb);
        });
        return Promise.all([first, second]).then((parts) => this.flattenIpfs(parts));
    }
    getId(address) {
        const profile = this.contract.at(address);
        return Promise.fromCallback((cb) => {
            profile._id.call(cb);
        }).then((id) => this.web3.toUtf8(id));
    }
    updateHash(hash, address, gas) {
        const hashTr = this.splitIpfs(hash);
        const profile = this.contract.at(address);
        const extracted = profile.setHash.request(hashTr, { gas });
        return Promise.resolve(extracted.params[0]);
    }
    sendTip(receiver, value, unit = 'ether', gas = 500000) {
        const profile = this.contract.at(receiver);
        const weiValue = this.web3.toWei(value, unit);
        const extract = profile['sendTip'].request({ gas, value: weiValue });
        return Promise.resolve(extract.params[0]);
    }
}
//# sourceMappingURL=Profile.js.map