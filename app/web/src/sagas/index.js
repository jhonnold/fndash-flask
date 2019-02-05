import { fork } from 'redux-saga/effects';
import { requestUsersSaga, requestUserSaga } from './usersSagas';
import { requestUserGamesSaga, requestUserRecordsSaga } from './gamesSagas';

export default function* () {
  yield [
    fork(requestUsersSaga),
    fork(requestUserSaga),
    fork(requestUserGamesSaga),
    fork(requestUserRecordsSaga),
  ];
}
