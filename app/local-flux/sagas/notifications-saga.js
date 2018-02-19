import { apply, call, cancel, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import getChannels from 'akasha-channels';
import { delay } from 'redux-saga';
import { actionChannels, enableChannel } from './helpers';
import * as actions from '../actions/notifications-actions';
import * as types from '../constants';
import { selectBlockNumber, selectLoggedEthAddress, selectNotificationsPanel,
    selectNotificationsPreference } from '../selectors';
import * as profileService from '../services/profile-service';

// Estimated number of blocks mined in one week
const ONE_WEEK = (7 * 24 * 3600) / 15;

function* notificationsSubscribe ({ notificationsPreferences }) {
    const channel = getChannels().server.notifications.subscribe;
    yield call(enableChannel, channel, getChannels().client.notifications.manager);
    const ethAddress = yield select(selectLoggedEthAddress);
    const settings = notificationsPreferences || (yield select(selectNotificationsPreference)).toJS();
    const lastBlock = yield apply(profileService, profileService.profileGetLastBlockNr, [ethAddress]);
    const currentBlock = yield select(selectBlockNumber);
    const fromBlock = Math.max(lastBlock, currentBlock - ONE_WEEK);
    const payload = { settings, profile: { ethAddress }, fromBlock };
    yield apply(
        channel,
        channel.send,
        [payload]
    );
}

function* notificationsLoaded () {
    yield call(delay, 5000);
    yield put(actions.notificationsLoaded());
}

// Channel watchers
function* watchNotificationsChannel () {
    let notifLoadedTask;
    let firstTime = true;
    while (true) {
        const resp = yield take(actionChannels.notifications.subscribe);
        const loggedEthAddress = yield select(selectLoggedEthAddress);
        if (resp.error) {
            yield put(actions.notificationsSubscribeError(resp.error, resp.request));
        } else if (loggedEthAddress === resp.request.profile.ethAddress) {
            if (notifLoadedTask) {
                yield cancel(notifLoadedTask);
                notifLoadedTask = yield fork(notificationsLoaded);
                firstTime = false;
            }
            if (firstTime) {
                notifLoadedTask = yield fork(notificationsLoaded);
            }
            const isPanelOpen = yield select(selectNotificationsPanel);
            yield put(actions.notificationsSubscribeSuccess(resp.data, isPanelOpen));
        }
    }
}

export function* registerNotificationsListeners () {
    yield fork(watchNotificationsChannel);
}

export function* watchNotificationsActions () {
    yield takeEvery(types.NOTIFICATIONS_SUBSCRIBE, notificationsSubscribe);
}
