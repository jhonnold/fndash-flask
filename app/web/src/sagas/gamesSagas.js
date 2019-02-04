import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../util/api';
import { types, actions } from '../ducks/games';

function* requestUserGames({ payload }) {
  try {
    const response = yield call(api.getUserGames, payload);
    yield put(actions.receivedUserGames(response.data));
  } catch (err) {
    yield put(actions.rejectedUserGames(err));
  }
}

export function* requestUserGamesSaga() {
  yield takeEvery(types.USER_GAMES_REQUESTED, requestUserGames);
}

export default {};
