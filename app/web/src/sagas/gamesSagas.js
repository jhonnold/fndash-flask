import { takeEvery, put, call } from 'redux-saga/effects';
import api, { api2 } from '../util/api';
import { types, actions } from '../ducks/games';

function* requestUserGames({ payload: { id, mode } }) {
  try {
    const response = yield call(api2.getUserGames, id, mode);
    yield put(actions.receivedUserGames(response.data));
  } catch (err) {
    yield put(actions.rejectedUserGames(err));
  }
}

export function* requestUserGamesSaga() {
  yield takeEvery(types.USER_GAMES_REQUESTED, requestUserGames);
}

function* requestUserRecords({ payload }) {
  try {
    const response = yield call(api2.getUserRecords, payload);
    yield put(actions.receivedUserRecords(response.data));
  } catch (err) {
    yield put(actions.rejectedUserRecords(err));
  }
}

export function* requestUserRecordsSaga() {
  yield takeEvery(types.USER_RECORDS_REQUESTED, requestUserRecords);
}

function* requestRecentGames() {
  try {
    const response = yield call(api.getRecentGames);
    yield put(actions.receivedRecentGames(response.data));
  } catch (err) {
    yield put(actions.rejectedRecentGames(err));
  }
}

export function* requestRecentGamesSaga() {
  yield takeEvery(types.RECENT_GAMES_REQUESTED, requestRecentGames);
}
