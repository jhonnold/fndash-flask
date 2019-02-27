const KD_CHART_REQUESTED = 'fn-dash/charts/KD_CHART_REQUESTED';
const KD_CHART_RECEIVED = 'fn-dash/charts/KD_CHART_RECEIVED';
const KD_CHART_REJECTED = 'fn-dash/charts/KD_CHART_REJECTED';
const PLACEMENT_CHART_REQUESTED = 'fn-dash/charts/PLACEMENT_CHART_REQUESTED';
const PLACEMENT_CHART_RECEIVED = 'fn-dash/charts/PLACEMENT_CHART_RECEIVED';
const PLACEMENT_CHART_REJECTED = 'fn-dash/charts/PLACEMENT_CHART_REJECTED';
const GAMES_CHART_REQUESTED = 'fn-dash/charts/GAMES_CHART_REQUESTED';
const GAMES_CHART_RECEIVED = 'fn-dash/charts/GAMES_CHART_RECEIVED';
const GAMES_CHART_REJECTED = 'fn-dash/charts/GAMES_CHART_REJECTED';
const TIME_PLAYED_CHART_REQUESTED = 'fn-dash/charts/TIME_PLAYED_CHART_REQUESTED';
const TIME_PLAYED_CHART_RECEIVED = 'fn-dash/charts/TIME_PLAYED_CHART_RECEIVED';
const TIME_PLAYED_CHART_REJECTED = 'fn-dash/charts/TIME_PLAYED_CHART_REJECTED';

export const types = {
  KD_CHART_REQUESTED,
  KD_CHART_RECEIVED,
  KD_CHART_REJECTED,
  PLACEMENT_CHART_REQUESTED,
  PLACEMENT_CHART_RECEIVED,
  PLACEMENT_CHART_REJECTED,
  GAMES_CHART_REQUESTED,
  GAMES_CHART_RECEIVED,
  GAMES_CHART_REJECTED,
  TIME_PLAYED_CHART_REQUESTED,
  TIME_PLAYED_CHART_RECEIVED,
  TIME_PLAYED_CHART_REJECTED,
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
  placementChart: {
    error: null,
    loading: false,
    data: {
      solo: [],
      duo: [],
      squad: [],
    },
  },
  gamesChart: {
    error: null,
    loading: false,
    data: {
      labels: [],
      datasets: [],
    },
  },
  timePlayedChart: {
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
    case GAMES_CHART_REQUESTED: {
      return {
        ...state,
        gamesChart: {
          ...state.gamesChart,
          loading: true,
          error: null,
        },
      };
    }
    case GAMES_CHART_RECEIVED: {
      return {
        ...state,
        gamesChart: {
          ...state.gamesChart,
          loading: false,
          error: null,
          data: {
            labels: payload.labels,
            datasets: payload.datasets,
          },
        },
      };
    }
    case GAMES_CHART_REJECTED: {
      return {
        ...state,
        gamesChart: {
          ...state.gamesChart,
          loading: false,
          error: payload,
        },
      };
    }
    case PLACEMENT_CHART_REQUESTED: {
      return {
        ...state,
        placementChart: {
          ...state.placementChart,
          loading: true,
          error: null,
        },
      };
    }
    case PLACEMENT_CHART_RECEIVED: {
      return {
        ...state,
        placementChart: {
          ...state.placementChart,
          loading: false,
          error: null,
          data: payload,
        },
      };
    }
    case PLACEMENT_CHART_REJECTED: {
      return {
        ...state,
        placementChart: {
          ...state.placementChart,
          loading: false,
          error: payload,
        },
      };
    }
    case TIME_PLAYED_CHART_REQUESTED: {
      return {
        ...state,
        timePlayedChart: {
          ...state.timePlayedChart,
          loading: false,
          error: null,
        },
      };
    }
    case TIME_PLAYED_CHART_RECEIVED: {
      return {
        ...state,
        timePlayedChart: {
          ...state.timePlayedChart,
          loading: false,
          error: null,
          data: payload,
        },
      };
    }
    case TIME_PLAYED_CHART_REJECTED: {
      return {
        ...state,
        timePlayedChart: {
          ...state.timePlayedChart,
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

const requestGamesChart = (id, mode) => ({
  type: GAMES_CHART_REQUESTED,
  payload: {
    id,
    mode,
  },
});

const receivedGamesChart = axes => ({
  type: GAMES_CHART_RECEIVED,
  payload: axes,
});

const rejectedGamesChart = err => ({
  type: GAMES_CHART_REJECTED,
  payload: err.message,
});

const requestPlacementChart = id => ({
  type: PLACEMENT_CHART_REQUESTED,
  payload: id,
});

const receivedPlacementChart = data => ({
  type: PLACEMENT_CHART_RECEIVED,
  payload: data,
});

const rejectedPlacementChart = err => ({
  type: PLACEMENT_CHART_REJECTED,
  payload: err.message,
});

const requestTimePlayedChart = id => ({
  type: TIME_PLAYED_CHART_REQUESTED,
  payload: id,
});

const receivedTimePlayedChart = data => ({
  type: TIME_PLAYED_CHART_RECEIVED,
  payload: data,
});

const rejectedTimePayedChart = err => ({
  type: TIME_PLAYED_CHART_REJECTED,
  payload: err,
});

export const actions = {
  requestKdChart,
  receivedKdChart,
  rejectedKdChart,
  requestPlacementChart,
  receivedPlacementChart,
  rejectedPlacementChart,
  requestGamesChart,
  receivedGamesChart,
  rejectedGamesChart,
  requestTimePlayedChart,
  receivedTimePlayedChart,
  rejectedTimePayedChart,
};
