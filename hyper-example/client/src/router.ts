import Navigo from "navigo";
import { routerHash } from "./config";
import { Page, Mutations } from "./store/mutations";
import { Actions, createActions } from "./store/actions";

const root = null;
const useHash = true;

const navigoRouter = new Navigo(root, useHash, routerHash);

export interface Navigate {
  (url: string): void;
}

export const navigate: Navigate = (url) => {
  navigoRouter.navigate(url, null);
};

export const setPage = (setState, page) => {
  setState({
    page,
    errors: null,
  });
};

export interface setStateInterface {
  (state: object): void;
}

export interface GotoInterface {
  home(setState: setStateInterface): void;
  login(setState: setStateInterface): void;
  register(setState: setStateInterface): void;
}

interface startRouterArgs {
  actions: Actions;
}

export const startRouter = ({ actions }: startRouterArgs) => {
  navigoRouter
    .on({
      "/login": () => {
        actions.navigateToLogin();
      },
      "/register": () => {
        actions.navigateToRegister();
      },
      "/": () => {
        if (!actions.verifyLoggedIn()) return;
        actions.navigateToHome();
      },
    })
    .resolve();
};
