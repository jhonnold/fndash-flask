import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../util/api';
import { types, actions } from '../ducks/charts';

function* requestKdChart({ payload: { id, mode }}) {
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