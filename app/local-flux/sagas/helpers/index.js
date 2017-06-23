import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { channel } from 'services';
export const actionChannels = {};
export const enabledChannels = [];

// this function creates an event channel from a given ipc client channel
export function createActionChannel (channel) {
    return eventChannel((emit) => {
        const handler = (resp) => {
            console.log(channel, resp);
            emit(resp);
        };
        channel.on(handler);

        const unsubscribe = () => {
            channel.removeListener(handler);
        };

        return unsubscribe;
    });
}

export function createActionChannels () {
    const modules = Object.keys(channel.instance.client);
    modules.forEach((module) => {
        const channels = Object.keys(channel.instance.client[module]);
        actionChannels[module] = {};
        channels.forEach((channel1) => {
            const actionChannel = createActionChannel(channel.instance.client[module][channel1]);
            actionChannels[module][channel1] = actionChannel;
        });
    });
}

export function enableChannel (channel, mananger) {
    const promise = new Promise((resolve, reject) => {
        if (enabledChannels.indexOf(channel.channel) !== -1) {
            resolve();
            return;
        }
        const enabled = channel.enable();
        if(enabled){
            enabledChannels.push(channel.channel);
            return resolve();
        }
        return reject(new Error(`Could not enable channel ${channel.channel}`))
    });
    return promise;
}

export function* registerListener ({ channel, successAction, errorAction }) {
    while (true) {
        const resp = take(channel);
        if (resp.error && errorAction) {
            yield put(errorAction());
        } else if (successAction) {
            yield put(successAction());
        }
    }
}
