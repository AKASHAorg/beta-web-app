class Service {
    protected _instance: any;

    public set instance(apiInstance: any) {
        this._instance = apiInstance;
    }

    public get instance() {
        return this._instance;
    }
}

export const web3Api = new Service();
export const ipfsApi = new Service();