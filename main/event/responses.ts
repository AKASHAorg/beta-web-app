import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { web3Api } from '../services';

class GethStatus {
    public shouldLogout: boolean = false;
    private _process: boolean;
    private _api: boolean;
    private _networkID: number;
    private _ethKey: string;
    private _version: string;
    private _akashaKey: string;

    public get process() {
        return this._process;
    }

    public set process(status: boolean) {
        this._process = status;
    }

    public get api() {
        return this._api;
    }

    public set api(status: boolean) {
        this._api = status;
    }

    public get networkID() {
        return this._networkID;
    }

    public set networkID(id: number) {
        this._networkID = id;
    }

    public get version() {
        return this._version;
    }

    public set version(nr: string) {
        this._version = nr;
    }

    public get ethKey() {
        if (web3Api.instance.eth.accounts[0] !== this._ethKey) {
            console.log('default account changed');
            this._ethKey = web3Api.instance.eth.accounts[0];
            this.shouldLogout = true;
        }
        return this._ethKey;
    }

    public set ethKey(address: string) {
        this._ethKey = address;
    }

    public get akashaKey() {
        return this._akashaKey;
    }

    public set akashaKey(address: string) {
        this._akashaKey = address;
    }

}

export const gethStatus = new GethStatus();

/**
 *
 * @param rawData
 * @param request
 * @returns {any}
 */
export const mainResponse = (rawData: any, request: any): MainResponse => {
    if (rawData.error) {
        return {
            data: {},
            services: {
                ipfs: IpfsConnector.getInstance().serviceStatus,
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
            ipfs: IpfsConnector.getInstance().serviceStatus,
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
