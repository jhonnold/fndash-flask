const USER_GAMES_REQUESTED = 'fn-dash/games/USER_GAMES_REQUESTED';
const USER_GAMES_RECEIVED = 'fn-dash/games/USER_GAMES_RECEIVED';
const USER_GAMES_REJECTED = 'fn-dash/games/USER_GAMES_REJECTED';

export const types = {
  USER_GAMES_REQUESTED,
  USER_GAMES_RECEIVED,
  USER_GAMES_REJECTED,
};

const initialState = {
  error: null,
  loading: false,
  data: {
    games: [],
    records: [],
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_GAMES_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case USER_GAMES_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        data: {
          ...state.data,
          games: payload,
        },
      };
    }
    case USER_GAMES_REJECTED: {
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

const requestUserGames = (id, mode) => ({
  type: USER_GAMES_REQUESTED,
  payload: {
    id,
    mode,
  },
});

const receivedUserGames = games => ({
  type: USER_GAMES_RECEIVED,
  payload: games,
});

const rejectedUserGames = err => ({
  type: USER_GAMES_REJECTED,
  payload: err.message,
});

export const actions = {
  requestUserGames,
  receivedUserGames,
  rejectedUserGames,
};
