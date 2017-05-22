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
                ipfs: {},
                geth: {}
            },
            error: { message: rawData.error.message }, request
        };
    }
    return {
        data: rawData,
        services: {
            ipfs: {},
            geth: {}
        }, request
    };
};
