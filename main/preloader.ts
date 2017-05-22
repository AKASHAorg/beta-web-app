import getChannel from './channels';
import { ApiListener, ApiRequest } from './ipcPreloader';

export default function injectApi() {
    const Channel = getChannel();
    const AkashaApi = Object.assign({}, Channel);

    Object.keys(Channel.client).forEach((module) => {
        Object.keys(Channel.client[module]).forEach((method) => {
            AkashaApi.client[module][method] = new ApiListener(Channel.client[module][method], method);
            AkashaApi.server[module][method] = new ApiRequest(Channel.server[module][method], method);
        });
    });

    return AkashaApi;
}