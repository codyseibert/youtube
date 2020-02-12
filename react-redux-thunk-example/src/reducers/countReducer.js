import { INCREMENT_COUNT } from '../actions/incrementCountAction';

const initialState = 0;

export const countReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return state + 1;
    default:
      return state;
  }
};
