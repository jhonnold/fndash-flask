import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../util/api';
import { types, actions } from '../ducks/users';

function* requestUsers() {
  try {
    const response = yield call(api.getUsers);
    yield put(actions.receivedUserList(response.data));
  } catch (err) {
    yield put(actions.rejectedUserList(err));
  }
}

export function* requestUsersSaga() {
  yield takeEvery(types.USER_LIST_REQUESTED, requestUsers);
}

function* requestUser({ payload }) {
  try {
    const response = yield call(api.getUser, payload);
    yield put(actions.receivedUser(response.data));
  } catch (err) {
    yield put(actions.rejectedUser(err));
  }
}

export function* requestUserSaga() {
  yield takeEvery(types.USER_REQUESTED, requestUser);
}
