export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

const requestUsers = () => ({
  type: REQUEST_USERS
});

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  payload: users
});

export const requestUsersAction = () => {
  return async dispatch => {
    dispatch(requestUsers());
    const users = await (await fetch('./users.json'))
      .json()
      .then(
        json =>
          new Promise(resolve =>
            setTimeout(() => resolve(json), 2000)
          )
      );
    dispatch(receiveUsers(users));
  };
};
