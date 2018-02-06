import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { web3Api } from '../services';
import { BASE_URL, generalSettings } from '../config/settings';
class GethStatus {
    constructor() {
        this.shouldLogout = false;
    }
    get process() {
        return this._process;
    }
    set process(status) {
        this._process = status;
    }
    get api() {
        return this._api;
    }
    set api(status) {
        this._api = status;
    }
    get networkID() {
        return this._networkID;
    }
    set networkID(id) {
        this._networkID = id;
    }
    get version() {
        return this._version;
    }
    set version(nr) {
        this._version = nr;
    }
    get ethKey() {
        if (web3Api.instance.eth.accounts[0] !== this._ethKey) {
            console.log('default account changed');
            this._ethKey = web3Api.instance.eth.accounts[0];
            this.shouldLogout = true;
        }
        return this._ethKey;
    }
    set ethKey(address) {
        this._ethKey = address;
    }
    get akashaKey() {
        return this._akashaKey;
    }
    set akashaKey(address) {
        this._akashaKey = address;
    }
}
export const gethStatus = new GethStatus();
export const mainResponse = (rawData, request) => {
    if (rawData.error) {
        return {
            data: {},
            services: {
                ipfs: Object.assign(IpfsConnector.getInstance().serviceStatus, { [BASE_URL]: generalSettings.get(BASE_URL) }),
                geth: {
                    process: gethStatus.process,
                    api: gethStatus.api,
                    networkID: gethStatus.networkID,
                    ethKey: gethStatus.ethKey,
                    akashaKey: gethStatus.akashaKey,
                    version: gethStatus.version,
                    shouldLogout: gethStatus.shouldLogout
                }
            },
            error: { message: rawData.error.message }, request
        };
    }
    return {
        data: rawData,
        services: {
            ipfs: Object.assign(IpfsConnector.getInstance().serviceStatus, { [BASE_URL]: generalSettings.get(BASE_URL) }),
            geth: {
                process: gethStatus.process,
                api: gethStatus.api,
                networkID: gethStatus.networkID,
                ethKey: gethStatus.ethKey,
                akashaKey: gethStatus.akashaKey,
                version: gethStatus.version,
                shouldLogout: gethStatus.shouldLogout
            }
        }, request
    };
};
//# sourceMappingURL=responses.js.map