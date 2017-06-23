import BaseContract from './BaseContract';
import * as Promise from 'bluebird';
import { unpad } from 'ethereumjs-util';
export default class Registry extends BaseContract {
    constructor(instance, web3) {
        super();
        this.web3 = web3;
        this.contract = Promise.promisifyAll(instance);
        this.contract.addressOf.callAsync = Promise.promisify(this.contract.addressOf.call);
        this.contract.addressOfKey.callAsync = Promise.promisify(this.contract.addressOfKey.call);
        this.contract.isRegistered.callAsync = Promise.promisify(this.contract.isRegistered.call);
        this.contract.check_format.callAsync = Promise.promisify(this.contract.check_format.call);
    }
    profileExists(id) {
        return this.contract
            .addressOf
            .callAsync(id)
            .then((exists) => {
            return !!unpad(exists);
        });
    }
    isRegistered(ethKey) {
        return this.contract
            .isRegistered
            .callAsync(ethKey);
    }
    addressOf(id) {
        return this.contract
            .addressOf
            .callAsync(id);
    }
    getByAddress(address) {
        return this.contract
            .addressOfKey
            .callAsync(address)
            .then((profileAddress) => {
            if (!!unpad(profileAddress)) {
                return profileAddress;
            }
            return '';
        });
    }
    checkFormat(id) {
        return this.contract
            .check_format
            .callAsync(id);
    }
    getLocalProfiles() {
        let keyList;
        const profileList = [];
        return this.web3
            .eth
            .getAccountsAsync()
            .then((list) => {
            if (!list) {
                return Promise.resolve([]);
            }
            list.sort();
            const checkForProfile = list.map((val) => {
                return this.getByAddress(val);
            });
            keyList = list;
            return Promise.all(checkForProfile);
        })
            .then((addrList) => {
            addrList.forEach((val, index) => {
                if (val) {
                    profileList.push({ key: keyList[index], profile: val });
                }
            });
            keyList = null;
            return profileList;
        });
    }
    register(id, ipfsHash, gas = 2000000) {
        const idTr = this.web3.fromUtf8(id);
        const ipfsHashTr = this.splitIpfs(ipfsHash);
        return this.profileExists(idTr)
            .then((address) => {
            const exists = unpad(address);
            if (exists) {
                throw new Error(`${id} already taken`);
            }
            if (ipfsHashTr.length !== 2) {
                throw new Error('Expected exactly 2 ipfs slices');
            }
            return this.contract
                .check_format
                .callAsync(id);
        }).then((isOK) => {
            if (!isOK) {
                throw new Error(`${id} has illegal characters`);
            }
            return this.evaluateData('register', gas, idTr, ipfsHashTr);
        });
    }
    unregister(id, gas = 2000000) {
        const idTr = this.web3.fromUtf8(id);
        return this.evaluateData('unregister', gas, idTr);
    }
    getRegistered(filter) {
        const { fromBlock, toBlock, address } = filter;
        const Registered = this.contract.Register(filter.index, { fromBlock, toBlock, address });
        Registered.getAsync = Promise.promisify(Registered.get);
        return Registered.getAsync();
    }
}
//# sourceMappingURL=Registry.js.map