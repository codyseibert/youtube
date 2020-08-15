import { State } from "./state";

export interface Getters {
  isLoggedIn(): boolean;
}

interface createGettersArgs {
  getState: () => State;
}

export const createGetters = ({ getState }: createGettersArgs) => ({
  isLoggedIn: () => {
    const state = getState();
    return (
      state.credentials &&
      !!state.credentials.username &&
      !!state.credentials.password
    );
  },
});
