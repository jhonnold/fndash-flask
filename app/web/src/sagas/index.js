import { fork } from 'redux-saga/effects';
import {
  requestUsersSaga,
  requestUserSaga,
  requestJoinUserSaga,
  requestActiveUsersSaga,
  activeUserCycleSaga,
} from './usersSagas';
import { requestUserGamesSaga, requestUserRecordsSaga, requestRecentGamesSaga } from './gamesSagas';
import {
  requestKdChartSaga,
  requestPlacementChartSaga,
  requestGamesChartSaga,
  requestTimePlayedChartSaga,
} from './chartSagas';
import { requestAllDataSaga, requestModeDependantDataSaga } from './globalSagas';

export default function* () {
  yield [
    fork(requestUsersSaga),
    fork(requestJoinUserSaga),
    fork(requestRecentGamesSaga),
    fork(requestUserSaga),
    fork(requestUserGamesSaga),
    fork(requestUserRecordsSaga),
    fork(requestKdChartSaga),
    fork(requestPlacementChartSaga),
    fork(requestGamesChartSaga),
    fork(requestTimePlayedChartSaga),
    fork(requestAllDataSaga),
    fork(requestModeDependantDataSaga),
    fork(requestActiveUsersSaga),
    fork(activeUserCycleSaga),
  ];
}
