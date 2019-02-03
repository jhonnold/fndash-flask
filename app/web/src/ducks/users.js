const USER_LIST_REQUESTED = 'fn-dash/users/USER_LIST_REQUESTED';
const USER_LIST_RECEIVED = 'fn-dash/users/USER_LIST_RECEIVED';
const USER_LIST_REJECTED = 'fn-dash/users/USER_LIST_REJECTED';

const USER_REQUESTED = 'fn-dash/users/USER_REQUESTED';
const USER_RECEIVED = 'fn-dash/users/USER_RECEIVED';
const USER_REJECTED = 'fn-dash/users/USER_REJECTED';

export const types = {
  USER_LIST_REQUESTED,
  USER_LIST_RECEIVED,
  USER_LIST_REJECTED,
  USER_REQUESTED,
  USER_RECEIVED,
  USER_REJECTED,
};

const initialState = {
  error: null,
  loading: false,
  data: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case USER_LIST_RECEIVED: {
      const users = {};
      payload.forEach((u) => {
        users[u.id] = {
          ...state.data[u.id],
          ...u,
        };
      });
      return {
        data: users,
        error: null,
        loading: false,
      };
    }
    case USER_LIST_REJECTED: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case USER_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case USER_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        data: {
          ...state.data,
          [payload.id]: {
            ...state.data[payload.id],
            ...payload,
          },
        },
      };
    }
    case USER_REJECTED: {
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

const requestUserList = () => ({
  type: USER_LIST_REQUESTED,
});

const receivedUserList = users => ({
  type: USER_LIST_RECEIVED,
  payload: users,
});

const rejectedUserList = err => ({
  type: USER_LIST_REJECTED,
  payload: err.message,
});

const requestUser = id => ({
  type: USER_REQUESTED,
  payload: id,
});

const receivedUser = user => ({
  type: USER_RECEIVED,
  payload: user,
});

const rejectedUser = err => ({
  type: USER_REJECTED,
  payload: err.message,
});

export const actions = {
  requestUserList,
  receivedUserList,
  rejectedUserList,
  requestUser,
  receivedUser,
  rejectedUser,
};
