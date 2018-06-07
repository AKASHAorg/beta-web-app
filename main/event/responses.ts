import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { web3Api } from '../services';
import { BASE_URL, generalSettings } from '../config/settings';

class GethStatus {
    public shouldLogout: boolean = false;
    public shouldUnlockVault: boolean = false;
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
        web3Api.instance.eth.getAccounts((err, accList) => {
            if (err) { throw err; }
            if (accList[0] !== this._ethKey) {
                console.log('default account changed');
                if (this._ethKey) {
                    location.reload();
                }

                if (!accList[0]) {
                    this.shouldUnlockVault = true;
                }
                this._ethKey = accList[0];
                if (this.shouldUnlockVault && this._ethKey) {
                    this.shouldUnlockVault = false;
                }
                this.shouldLogout = true;
            }
        });
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

export const gethStatus: any = new GethStatus();

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
                ipfs: Object.assign(IpfsConnector.getInstance().serviceStatus,
                    { [BASE_URL]: generalSettings.get(BASE_URL) }),
                geth: {
                    process: gethStatus.process,
                    api: gethStatus.api,
                    networkID: gethStatus.networkID,
                    ethAddress: gethStatus.ethKey,
                    version: gethStatus.version,
                    shouldLogout: gethStatus.shouldLogout,
                    shouldUnlockVault: gethStatus.shouldUnlockVault
                }
            },
            error: { message: rawData.error.message }, request
        };
    }
    return {
        data: rawData,
        services: {
            ipfs: Object.assign(IpfsConnector.getInstance().serviceStatus,
                { [BASE_URL]: generalSettings.get(BASE_URL) }),
            geth: {
                process: gethStatus.process,
                api: gethStatus.api,
                networkID: gethStatus.networkID,
                ethAddress: gethStatus.ethKey,
                version: gethStatus.version,
                shouldLogout: gethStatus.shouldLogout,
                shouldUnlockVault: gethStatus.shouldUnlockVault
            }
        }, request
    };
};
