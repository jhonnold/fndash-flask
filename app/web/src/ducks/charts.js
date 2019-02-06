const KD_CHART_REQUESTED = 'fn-dash/charts/KD_CHART_REQUESTED';
const KD_CHART_RECEIVED = 'fn-dash/charts/KD_CHART_RECEIVED';
const KD_CHART_REJECTED = 'fn-dash/charts/KD_CHART_REJECTED';

export const types = {
  KD_CHART_REQUESTED,
  KD_CHART_RECEIVED,
  KD_CHART_REJECTED,
};

const initialState = {
  kdChart: {
    error: null,
    loading: false,
    data: {
      labels: [],
      datasets: [],
    },
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case KD_CHART_REQUESTED: {
      return {
        ...state,
        kdChart: {
          ...state.kdChart,
          loading: true,
          error: null,
        },
      };
    }
    case KD_CHART_RECEIVED: {
      return {
        ...state,
        kdChart: {
          ...state.kdChart,
          loading: false,
          error: null,
          data: {
            labels: payload.labels,
            datasets: payload.datasets,
          },
        },
      };
    }
    case KD_CHART_REJECTED: {
      return {
        ...state,
        kdChart: {
          ...state.kdChart,
          loading: false,
          error: payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const requestKdChart = (id, mode) => ({
  type: KD_CHART_REQUESTED,
  payload: {
    id,
    mode,
  },
});

const receivedKdChart = axes => ({
  type: KD_CHART_RECEIVED,
  payload: axes,
});

const rejectedKdChart = err => ({
  type: KD_CHART_REJECTED,
  payload: err.message,
});

export const actions = {
  requestKdChart,
  receivedKdChart,
  rejectedKdChart,
};
