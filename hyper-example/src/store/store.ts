import { cloneDeep } from "lodash";
import { createActions } from "./actions";
import { createGetters } from "./getters";
import { createMutations } from "./mutations";
import { createInitialState } from "./state";
import { Navigate } from "../router";

export const createStore = (render, navigate: Navigate) => {
  const state = createInitialState();

  const getState = () => cloneDeep(state);

  const setState = (newState) => {
    Object.assign(state, newState);
    console.log("state changed to: ", state);
    render({
      setState,
      getState,
      getters,
      actions,
      mutations,
    });
  };

  const getters = createGetters(state);
  const mutations = createMutations(state, setState);
  const actions = createActions(mutations, state, getters, navigate);

  setState(state);

  return {
    setState,
    getState,
    mutations,
    getters,
    actions,
  };
};
