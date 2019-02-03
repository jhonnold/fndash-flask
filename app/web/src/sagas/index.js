import { fork } from 'redux-saga/effects';
import { requestUsersSaga, requestUserSaga } from './usersSagas';

export default function* () {
  yield [fork(requestUsersSaga), fork(requestUserSaga)];
}
