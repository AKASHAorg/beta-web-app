import * as Promise from 'bluebird';
export default class BaseContract {
    flattenIpfs(ipfsHash) {
        return this.web3.toUtf8(ipfsHash[0]) +
            this.web3.toUtf8(ipfsHash[1]);
    }
    splitIpfs(ipfsHash) {
        const offset = Math.floor(ipfsHash.length / 2);
        return [
            this.web3.fromUtf8(ipfsHash.slice(0, offset)),
            this.web3.fromUtf8(ipfsHash.slice(offset))
        ];
    }
    getContract() {
        return this.contract;
    }
    extractData(method, ...params) {
        const payload = this.contract[method].request(...params);
        return payload.params[0];
    }
    estimateGas(method, ...params) {
        return Promise.fromCallback((cb) => {
            return this.contract[method].estimateGas(...params, cb);
        });
    }
    evaluateData(method, gas, ...params) {
        return this.estimateGas(method, ...params).then((estimatedGas) => {
            if (estimatedGas > gas) {
                throw new Error(`${method} GAS => { required: ${estimatedGas}, provided: ${gas} }`);
            }
            console.log('estimated gas for', method, estimatedGas);
            return this.extractData(method, ...params, { gas });
        });
    }
}
//# sourceMappingURL=BaseContract.js.map