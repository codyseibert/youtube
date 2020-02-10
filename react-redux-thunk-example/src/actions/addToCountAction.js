export const INCREMENT_COUNT = 'INCREMENT_COUNT';

export const addToCountAction = amount => {
  return dispatch => {
    dispatch({
      type: INCREMENT_COUNT,
      payload: amount
    });
  };
};
