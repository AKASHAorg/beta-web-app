import { apply, fork, put, take, takeEvery } from 'redux-saga/effects';
import getChannels from 'akasha-channels';
import { actionChannels } from './helpers';
import * as actionActions from '../actions/action-actions';
import * as draftActions from '../actions/draft-actions';
import * as actions from '../actions/transaction-actions';
import * as types from '../constants';
import * as actionStatus from '../../constants/action-status';


export function* transactionGetStatus ({ txs, ids, checkFalseNegative }) {
    const channel = getChannels().server.tx.getTransaction;
    yield apply(channel, channel.send, [{ transactionHash: txs, actionIds: ids, checkFalseNegative }]);
}

function* watchTransactionGetStatus () {
    yield takeEvery(types.TRANSACTION_GET_STATUS, transactionGetStatus);
}

function* watchTransactionGetStatusChannel () {
    while (true) {
        const resp = yield take(actionChannels.tx.getTransaction);
        if (resp.error) {
            yield put(actions.transactionGetStatusError(resp.error));
        } else {
            const updates = [];
            resp.data.forEach((tx, index) => {
                if (tx && tx.blockNumber) {
                    const { blockNumber, cumulativeGasUsed, success } = tx;
                    const id = resp.request.actionIds[index];
                    const changes = {
                        id,
                        blockNumber,
                        cumulativeGasUsed,
                        status: actionStatus.published,
                        success
                    };
                    updates.push(changes);
                }
            });
            for (let i = 0; i < updates.length; i++) {
                if (resp.request.checkFalseNegative && !updates[i].success) {
                    yield put(draftActions.draftPublishError({}, updates[i].id));
                }
                yield put(actionActions.actionUpdate(updates[i]));
            }
        }
    }
}

export function* registerTransactionListeners () {
    yield fork(watchTransactionGetStatusChannel);
}

export function* watchTransactionActions () {
    yield fork(watchTransactionGetStatus);
}
