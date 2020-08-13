import { State } from "./state";

export interface Getters {
  isLoggedIn(): boolean;
}

export const createGetters = (state: State) => ({
  isLoggedIn: () =>
    state.credentials &&
    !!state.credentials.username &&
    !!state.credentials.password,
});
