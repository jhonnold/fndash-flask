import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../util/api';
import { types, actions } from '../ducks/charts';

function* requestKdChart({ payload: { id, mode } }) {
  try {
    const response = yield call(api.getKdChart, id, mode);
    yield put(actions.receivedKdChart(response.data));
  } catch (err) {
    yield put(actions.rejectedKdChart(err));
  }
}

export function* requestKdChartSaga() {
  yield takeEvery(types.KD_CHART_REQUESTED, requestKdChart);
}

function* requestGamesChart({ payload: { id, mode } }) {
  try {
    const response = yield call(api.getGamesPerDayChart, id, mode);
    yield put(actions.receivedGamesChart(response.data));
  } catch (err) {
    yield put(actions.rejectedGamesChart(err));
  }
}

export function* requestGamesChartSaga() {
  yield takeEvery(types.GAMES_CHART_REQUESTED, requestGamesChart);
}

function* requestPlacementChart({ payload }) {
  try {
    const response = yield call(api.getPlacementChart, payload);
    yield put(actions.receivedPlacementChart(response.data));
  } catch (err) {
    yield put(actions.rejectedPlacementChart(err));
  }
}

export function* requestPlacementChartSaga() {
  yield takeEvery(types.PLACEMENT_CHART_REQUESTED, requestPlacementChart);
}

function* requestTimePlayedChart({ payload }) {
  try {
    const response = yield call(api.getTimePlayedChart, payload);
    yield put(actions.receivedTimePlayedChart(response.data));
  } catch (err) {
    yield put(actions.rejectedTimePayedChart(err));
  }
}

export function* requestTimePlayedChartSaga() {
  yield takeEvery(types.TIME_PLAYED_CHART_REQUESTED, requestTimePlayedChart);
}
