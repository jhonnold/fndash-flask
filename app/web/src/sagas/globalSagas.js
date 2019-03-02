import { takeEvery, put, all } from 'redux-saga/effects';
import { types } from '../ducks/global';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import { actions as chartActions } from '../ducks/charts';

function* requestAllData({ payload: { id, mode } }) {
  yield all([
    put(userActions.requestUser(id)),
    put(gamesActions.requestUserGames(id, mode)),
    put(gamesActions.requestUserRecords(id)),
    put(chartActions.requestKdChart(id, mode)),
    put(chartActions.requestPlacementChart(id)),
    put(chartActions.requestGamesChart(id, mode)),
    put(chartActions.requestTimePlayedChart(id)),
  ]);
}

export function* requestAllDataSaga() {
  yield takeEvery(types.ALL_DATA_REQUESETED, requestAllData);
}

function* requestModeDependantData({ payload: { id, mode } }) {
  yield all([
    put(gamesActions.requestUserGames(id, mode)),
    put(chartActions.requestKdChart(id, mode)),
    put(chartActions.requestGamesChart(id, mode)),
  ]);
}

export function* requestModeDependantDataSaga() {
  yield takeEvery(types.MODE_DEPENDANT_DATA_REQUESTED, requestModeDependantData);
}
