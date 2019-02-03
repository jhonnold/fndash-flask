const USER_LIST_REQUESTED = 'fn-dash/users/USER_LIST_REQUESTED';
const USER_LIST_RECEIVED = 'fn-dash/users/USER_LIST_RECEIVED';
const USER_LIST_REJECTED = 'fn-dash/users/USER_LIST_REJECTED';

const initialState = {
  error: null,
  loading: false,
  data: [],
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
      return {
        data: payload,
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
    default: {
      return state;
    }
  }
};

export const requestUserList = () => ({
  type: USER_LIST_REQUESTED,
});

export const receivedUserList = users => ({
  type: USER_LIST_RECEIVED,
  payload: users,
});

export const rejectedUserList = err => ({
  type: USER_LIST_REJECTED,
  payload: err.message,
});
