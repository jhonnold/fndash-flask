import { fork } from 'redux-saga/effects';
import { requestUsersSaga } from './usersSagas';

export default function* () {
  yield [fork(requestUsersSaga)];
}
