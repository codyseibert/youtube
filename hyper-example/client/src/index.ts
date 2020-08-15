import html from "hyperhtml";
import { createStore } from "./store/store";
import { App } from "./App";
import { startRouter, navigate } from "./router";

import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import "bootstrap";
import { State } from "./store/state";
import { Mutations, createMutations } from "./store/mutations";
import { Actions, createActions } from "./store/actions";
import { Getters, createGetters } from "./store/getters";

export interface Context {
  setState(state: object): void;
  state: State;
  mutations: Mutations;
  getters: Getters;
  html(...args: any): any;
  actions: Actions;
}
export const onStateUpdated = ({ setState, getState }) => {
  const stateClone = getState();

  const context: Context = {
    setState,
    state: stateClone,
    mutations,
    getters,
    html,
    actions,
  };

  return html(document.querySelector("#app"))`${App(context)}`;
};

const { getState, setState } = createStore({ onStateUpdated });

const getters = createGetters({ getState });
const mutations = createMutations({ getState, setState });
const actions = createActions({ mutations, getState, getters, navigate });

startRouter({ actions });
