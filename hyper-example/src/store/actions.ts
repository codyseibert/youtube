import { Navigate } from "../router";
import { Mutations, Page } from "./mutations";
import { State, Todo } from "./state";
import { Getters } from "./getters";
import { persistTodos } from "../services/todos";

export interface Actions {
  logout(): void;
  navigateToHome(updateUrl: boolean): void;
  navigateToLogin(updateUrl: boolean): void;
  navigateToRegister(updateUrl: boolean): void;
  verifyLoggedIn(): void;
  deleteTodo(todo: Todo): void;
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
      localStorage.removeItem("credentials");
    },
    deleteTodo: (todo) => {
      mutations.deleteTodo(todo);
      persistTodos(state.todos);
    },
    toggleTodo: (todo: Todo) => {
      mutations.toggleTodo(todo);
      persistTodos(state.todos);
    },
    createTodo: (text) => {
      mutations.createTodo(text);
      persistTodos(state.todos);
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
