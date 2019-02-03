const SET_GAME_MODE = 'fn-dash/ui/SET_GAME_MODE';

export const types = {
  SET_GAME_MODE,
};

const initialState = {
  mode: 'all',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GAME_MODE: {
      return {
        ...state,
        mode: payload,
      };
    }
    default: {
      return state;
    }
  }
};

const setGameMode = mode => ({
  type: SET_GAME_MODE,
  payload: mode,
});

export const actions = {
  setGameMode,
};
