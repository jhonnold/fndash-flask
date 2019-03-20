const ACTIVE_USERS_REQUESTED = 'fn-dash/users/ACTIVE_USERS_REQUESTED';
const ACTIVE_USERS_RECEIVED = 'fn-dash/users/ACTIVE_USERS_RECIEVED';
const ACTIVE_USERS_REJECTED = 'fn-dash/users/ACTIVE_USERS_REJECTED';
const START_REQUESTING_ACTIVE_USERS = 'fn-dash/users/START_REQUESTING_ACTIVE_USERS';
const STOP_REQUESTING_ACTIVE_USERS = 'fn-dash/users/STOP_REQUESTING_ACTIVE_USERS';

const USER_LIST_REQUESTED = 'fn-dash/users/USER_LIST_REQUESTED';
const USER_LIST_RECEIVED = 'fn-dash/users/USER_LIST_RECEIVED';
const USER_LIST_REJECTED = 'fn-dash/users/USER_LIST_REJECTED';

const USER_REQUESTED = 'fn-dash/users/USER_REQUESTED';
const USER_RECEIVED = 'fn-dash/users/USER_RECEIVED';
const USER_REJECTED = 'fn-dash/users/USER_REJECTED';

const JOIN_USER_REQUESTED = 'fn-dash/user/NEW_USER_REQUESTED';
const JOIN_USER_RECEIVED = 'fn-dash/user/NEW_USER_RECEIVED';
const JOIN_USER_REJECTED = 'fn-dash/user/NEW_USER_REJECTED';

export const types = {
  ACTIVE_USERS_REQUESTED,
  ACTIVE_USERS_RECEIVED,
  ACTIVE_USERS_REJECTED,
  START_REQUESTING_ACTIVE_USERS,
  STOP_REQUESTING_ACTIVE_USERS,
  USER_LIST_REQUESTED,
  USER_LIST_RECEIVED,
  USER_LIST_REJECTED,
  USER_REQUESTED,
  USER_RECEIVED,
  USER_REJECTED,
  JOIN_USER_REQUESTED,
  JOIN_USER_RECEIVED,
  JOIN_USER_REJECTED,
};

const initialState = {
  error: null,
  loading: false,
  data: {
    activeUsers: [],
  },
  signedUp: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIVE_USERS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case ACTIVE_USERS_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        data: {
          ...state.data,
          activeUsers: payload,
        },
      };
    }
    case ACTIVE_USERS_REJECTED: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case JOIN_USER_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        signedUp: false,
      };
    }
    case JOIN_USER_RECEIVED: {
      return {
        ...state,
        error: null,
        loading: false,
        signedUp: true,
      };
    }
    case JOIN_USER_REJECTED: {
      return {
        ...state,
        error: payload,
        loading: false,
        signedUp: false,
      };
    }
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
        data: {
          ...state.data,
          ...users,
        },
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

const requestActiveUsers = () => ({
  type: ACTIVE_USERS_REQUESTED,
});

const receivedActiveUsers = activeUsers => ({
  type: ACTIVE_USERS_RECEIVED,
  payload: activeUsers,
});

const rejectedActiveUsers = err => ({
  type: ACTIVE_USERS_REJECTED,
  payload: err,
});

const startRequestingActiveUsers = () => ({
  type: START_REQUESTING_ACTIVE_USERS,
});

const stopRequestingActiveUsers = () => ({
  type: STOP_REQUESTING_ACTIVE_USERS,
});

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

const requestJoinUser = username => ({
  type: JOIN_USER_REQUESTED,
  payload: username,
});

const receivedJoinUser = () => ({
  type: JOIN_USER_RECEIVED,
});

const rejectedJoinUser = err => ({
  type: JOIN_USER_REJECTED,
  payload: err,
});

export const actions = {
  requestActiveUsers,
  receivedActiveUsers,
  rejectedActiveUsers,
  startRequestingActiveUsers,
  stopRequestingActiveUsers,
  requestUserList,
  receivedUserList,
  rejectedUserList,
  requestUser,
  receivedUser,
  rejectedUser,
  requestJoinUser,
  receivedJoinUser,
  rejectedJoinUser,
};
