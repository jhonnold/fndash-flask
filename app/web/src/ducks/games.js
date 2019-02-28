const USER_GAMES_REQUESTED = 'fn-dash/games/USER_GAMES_REQUESTED';
const USER_GAMES_RECEIVED = 'fn-dash/games/USER_GAMES_RECEIVED';
const USER_GAMES_REJECTED = 'fn-dash/games/USER_GAMES_REJECTED';
const USER_RECORDS_REQUESTED = 'fn-dash/games/USER_RECORDS_REQUESTED';
const USER_RECORDS_RECEIVED = 'fn-dash/games/USER_RECORDS_RECEIVED';
const USER_RECORDS_REJECTED = 'fn-dash/games/USER_RECORDS_REJECTED';
const ALL_GAMES_REQUESTED = 'fn-dash/games/ALL_GAMES_REQUESTED';
const ALL_GAMES_RECEIVED = 'fn-dash/games/ALL_GAMES_REQUESTED';
const ALL_GAMES_REJECTED = 'fn-dash/games/ALL_GAMES_REQUESTED';


export const types = {
  USER_GAMES_REQUESTED,
  USER_GAMES_RECEIVED,
  USER_GAMES_REJECTED,
  USER_RECORDS_REQUESTED,
  USER_RECORDS_RECEIVED,
  USER_RECORDS_REJECTED,
  ALL_GAMES_REQUESTED,
  ALL_GAMES_RECEIVED,
  ALL_GAMES_REJECTED,
};

const initialState = {
  error: null,
  loading: false,
  data: {
    games: [],
    records: {
      solo: {
        time_played: 0,
        game_type: 'solo',
        kills: 0,
        placement: 'Loss',
      },
      duo: {
        time_played: 0,
        game_type: 'duo',
        kills: 0,
        placement: 'Loss',
      },
      squad: {
        time_played: 0,
        game_type: 'squad',
        kills: 0,
        placement: 'Loss',
      },
    },
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
    case USER_RECORDS_REQUESTED: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case USER_RECORDS_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        data: {
          ...state.data,
          records: payload,
        },
      };
    }
    case USER_RECORDS_REJECTED: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case ALL_GAMES_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case ALL_GAMES_RECEIVED: {
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
    case ALL_GAMES_REJECTED: {
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

const requestUserRecords = id => ({
  type: USER_RECORDS_REQUESTED,
  payload: id,
});

const receivedUserRecords = records => ({
  type: USER_RECORDS_RECEIVED,
  payload: records,
});

const rejectedUserRecords = err => ({
  type: USER_RECORDS_REJECTED,
  payload: err.message,
});

const requestAllGames = () => ({
  type: ALL_GAMES_REQUESTED,
});

const receivedAllGames = games => ({
  type: ALL_GAMES_RECEIVED,
  payload: games,
});

const rejectedAllGames = err => ({
  type: ALL_GAMES_REJECTED,
  payload: err,
});

export const actions = {
  requestUserGames,
  receivedUserGames,
  rejectedUserGames,
  requestUserRecords,
  receivedUserRecords,
  rejectedUserRecords,
  requestAllGames,
  receivedAllGames,
  rejectedAllGames,
};
