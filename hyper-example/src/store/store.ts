import { cloneDeep } from "lodash";
import { createActions } from "./actions";
import { createGetters } from "./getters";
import { createMutations } from "./mutations";
import { createInitialState } from "./state";
import { Navigate } from "../router";

const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] === "object" && !Object.isFrozen(obj[prop]))
      deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

export const createStore = (render, navigate: Navigate) => {
  const state = createInitialState();

  const getState = () => deepFreeze(cloneDeep(state));

  const setState = (newState) => {
    Object.assign(state, newState);
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
