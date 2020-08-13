import { Navigate } from "../router";
import { Mutations, Page } from "./mutations";
import { State, Todo } from "./state";
import { Getters } from "./getters";

export interface Actions {
  logout(): void;
  navigateToHome(updateUrl: boolean): void;
  navigateToLogin(updateUrl: boolean): void;
  navigateToRegister(updateUrl: boolean): void;
  verifyLoggedIn(): void;
  toggleTodo(todo: Todo): void;
  createTodo(text: string): void;
}

export const createActions = (
  mutations: Mutations,
  state: State,
  getters: Getters,
  navigate: Navigate
): Actions => {
  const actions: Actions = {
    logout: () => {
      mutations.logout();
      actions.navigateToLogin(true);
    },
    toggleTodo: (todo: Todo) => {
      mutations.toggleTodo(todo);
    },
    createTodo: (text) => {
      mutations.createTodo(text);
    },
    navigateToHome: (updateUrl) => {
      updateUrl && navigate("/");
      mutations.setPage(Page.Home);
    },
    navigateToLogin: (updateUrl) => {
      updateUrl && navigate("/login");
      mutations.setPage(Page.Login);
    },
    navigateToRegister: (updateUrl) => {
      updateUrl && navigate("/register");
      mutations.setPage(Page.Register);
    },
    verifyLoggedIn: () => {
      if (!getters.isLoggedIn()) {
        actions.navigateToLogin(true);
      }
    },
  };
  return actions;
};
