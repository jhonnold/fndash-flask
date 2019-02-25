import { fork } from 'redux-saga/effects';
import { requestUsersSaga, requestUserSaga } from './usersSagas';
import { requestUserGamesSaga, requestUserRecordsSaga } from './gamesSagas';
import { requestKdChartSaga, requestPlacementChartSaga, requestGamesChartSaga, requestTimePlayedChartSaga } from './chartSagas';

export default function* () {
  yield [
    fork(requestUsersSaga),
    fork(requestUserSaga),
    fork(requestUserGamesSaga),
    fork(requestUserRecordsSaga),
    fork(requestKdChartSaga),
    fork(requestPlacementChartSaga),
    fork(requestGamesChartSaga),
    fork(requestTimePlayedChartSaga),
  ];
}
