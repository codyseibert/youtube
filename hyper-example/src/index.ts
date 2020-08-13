import html from "hyperhtml";
import { createStore } from "./store/store";
import { App } from "./App";
import { startRouter, navigate } from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import "bootstrap";
import { State } from "./store/state";
import { Mutations } from "./store/mutations";
import { Actions } from "./store/actions";
import { Getters } from "./store/getters";

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
  getters,
  actions,
  router,
}) => {
  const context: Context = {
    setState,
    state: getState(),
    mutations,
    getters,
    html,
    actions,
  };

  return html(document.querySelector("#app"))`${App(context)}`;
};

const store = createStore(render, navigate);
startRouter(store.actions);
