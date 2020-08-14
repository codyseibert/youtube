import html from "hyperhtml";
import { createStore } from "./store/store";
import { App } from "./App";
import { startRouter, navigate } from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
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

export const render = ({
  setState,
  getState,
  mutations,
  // getters,
  actions,
  router,
}) => {
  const stateClone = getState();
  const getters = createGetters(stateClone);
  const context: Context = {
    setState,
    state: stateClone,
    mutations,
    getters,
    html,
    actions: createActions(mutations, stateClone, getters, navigate),
  };

  return html(document.querySelector("#app"))`${App(context)}`;
};

const store = createStore(render, navigate);
startRouter(store.actions);
