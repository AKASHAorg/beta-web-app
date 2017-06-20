import IpfsConnector from '@akashaproject/ipfs-js-connector';

export const gethStatus = {
    process: false,
    api: false,
    version: ''
};

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
                geth: gethStatus
            },
            error: { message: rawData.error.message }, request
        };
    }
    return {
        data: rawData,
        services: {
            ipfs: IpfsConnector.getInstance().serviceStatus,
            geth: gethStatus
        }, request
    };
};
