const TIME_PLAYED_REQUESTED = 'fn-dash/games/TIME_PLAYED_REQUESTED';
const TIME_PLAYED_RECEIVED = 'fn-dash/games/TIME_PLAYED_RECEIVED';
const TIME_PLAYED_REJECTED = 'fn-dash/games/TIME_PLAYED_REJECTED';

// eslint-disable-next-line import/prefer-default-export
export const types = {
  TIME_PLAYED_REQUESTED,
  TIME_PLAYED_RECEIVED,
  TIME_PLAYED_REJECTED,
};

const initialState = {
  error: null,
  loading: false,
  data: {
    solo: {
      time_played: 0,
    },
    duo: {
      time_played: 0,
    },
    squad: {
      time_played: 0,
    },
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TIME_PLAYED_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }
    case TIME_PLAYED_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        data: payload,
      };
    }
    case TIME_PLAYED_REJECTED: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

const requestTimePlayed = (id, mode) => ({
  type: TIME_PLAYED_REQUESTED,
  payload: {
    id,
    mode,
  },
});

const receivedTimePlayed = payload => ({
  type: TIME_PLAYED_RECEIVED,
  payload,
});

const rejectedTimePlayed = err => ({
  type: TIME_PLAYED_REJECTED,
  payload: err.message,
});

export const actions = {
  requestTimePlayed,
  receivedTimePlayed,
  rejectedTimePlayed,
};
