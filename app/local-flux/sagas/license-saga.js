import { apply, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { actionChannels, enableChannel } from './helpers';
import * as actions from '../actions/license-actions';
import * as types from '../constants';
import { channel as Channel } from 'services';

export function* licenseGetAll () {
    const channel = Channel.instance.server.licenses.getLicenses;
    yield call(enableChannel, channel, Channel.instance.client.licenses.manager);
    yield apply(channel, channel.send, []);
}

// Action watchers

function* watchLicenseGetAll () {
    yield takeLatest(types.LICENSE_GET_ALL, licenseGetAll);
}

// Channel watchers

function* watchLicenseGetAllChannel () {
    while (true) {
        const resp = yield take(actionChannels.licenses.getLicenses);
        if (resp.error) {
            yield put(actions.licenseGetAllError(resp.error));
        } else {
            yield put(actions.licenseGetAllSuccess(resp.data));
        }
    }
}

export function* watchLicenseActions () {
    yield fork(watchLicenseGetAll);
}

export function* registerLicenseListeners () {
    yield fork(watchLicenseGetAllChannel);
}
