import { takeEvery, put, call } from 'redux-saga/effects';
import api, { api2 } from '../util/api';
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
    const response = yield call(api2.getUser, payload);
    yield put(actions.receivedUser(response.data));
  } catch (err) {
    yield put(actions.rejectedUser(err));
  }
}

export function* requestUserSaga() {
  yield takeEvery(types.USER_REQUESTED, requestUser);
}

function* requestJoinUser({ payload }) {
  try {
    yield call(api.postNewUser, payload);
    yield put(actions.receivedJoinUser());
  } catch (err) {
    yield put(actions.rejectedJoinUser(err.response.data));
  }
}

export function* requestJoinUserSaga() {
  yield takeEvery(types.JOIN_USER_REQUESTED, requestJoinUser);
}
