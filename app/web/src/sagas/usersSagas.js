import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../util/api';
import { types, actions as usersActions } from '../ducks/users';

function* requestUsers() {
  try {
    const response = yield call(api.getUsers);
    yield put(usersActions.receivedUserList(response.data));
  } catch (err) {
    yield put(usersActions.rejectedUserList(err));
  }
}

export function* requestUsersSaga() {
  yield takeEvery(types.USER_LIST_REQUESTED, requestUsers);
}

function* requestUser({ payload }) {
  try {
    const response = yield call(api.getUser, payload);
    yield put(usersActions.receivedUser(response.data));
  } catch (err) {
    yield put(usersActions.rejectedUser(err));
  }
}

export function* requestUserSaga() {
  yield takeEvery(types.USER_REQUESTED, requestUser);
}
