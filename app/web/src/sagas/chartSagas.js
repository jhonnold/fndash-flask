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