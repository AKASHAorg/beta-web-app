import { ApiListener, ApiRequest } from './ipcPreloader';

const hashPath = (...path: string[]) => {
    return path.join('/') + new Date().toISOString();
};

const Channels: any = {client: {}, server: {}};


export function registerChannel(module, method) {
    if (!Channels.client.hasOwnProperty(module)) {
        Channels.client[module] = {};
        Channels.server[module] = {};
    }
    Channels.client[module][method] = new ApiListener(hashPath('client', module, method), method);
    Channels.server[module][method] = new ApiRequest(hashPath('server', module, method), method);
}

export default function getChannels() {
    return {client: Channels.client, server: Channels.server};
}


