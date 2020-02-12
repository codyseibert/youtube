import {
  REQUEST_USERS,
  RECEIVE_USERS
} from '../actions/requestUsersAction';

const initialState = {
  isLoading: false,
  entries: []
};

export const usersReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_USERS:
      return {
        isLoading: false,
        entries: action.payload
      };
    default:
      return state;
  }
};
