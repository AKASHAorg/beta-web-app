import Web3 from 'web3';
import * as Promise from 'bluebird';
import contracts from './contracts';
declare const web3;

class Service {
    protected _instance: any;

    public set instance(apiInstance: any) {
        this._instance = apiInstance;
    }

    public get instance() {
        if (!this._instance) {
            throw new Error('No instance available');
        }
        return this._instance;
    }
}

export const regenWeb3 = () => {
    let web3Regen;
    web3Regen = new Web3(web3.currentProvider);
    web3Regen.eth = Promise.promisifyAll(web3Regen.eth);
    web3Regen.shh = Promise.promisifyAll(web3Regen.shh);
    web3Regen.personal = Promise.promisifyAll(web3Regen.personal);
    web3Regen.net = Promise.promisifyAll(web3Regen.net);
    web3Regen.version = Promise.promisifyAll(web3Regen.version);
    const contr = contracts.init();
    // for dev purpose
    Object.defineProperty(window, 'contracts', { value: contr });
    return web3Regen;
};

export const web3Api = new Service();
export const ipfsApi = new Service();
export const channel = new Service();