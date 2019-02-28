import { fork } from 'redux-saga/effects';
import { requestUsersSaga, requestUserSaga } from './usersSagas';
import { requestUserGamesSaga, requestUserRecordsSaga, requestRecentGamesSaga } from './gamesSagas';
import {
  requestKdChartSaga, requestPlacementChartSaga, requestGamesChartSaga, requestTimePlayedChartSaga,
} from './chartSagas';

export default function* () {
  yield [
    fork(requestUsersSaga),
    fork(requestRecentGamesSaga),
    fork(requestUserSaga),
    fork(requestUserGamesSaga),
    fork(requestUserRecordsSaga),
    fork(requestKdChartSaga),
    fork(requestPlacementChartSaga),
    fork(requestGamesChartSaga),
    fork(requestTimePlayedChartSaga),
  ];
}
