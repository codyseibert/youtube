import { Navigate } from "../router";
import { Mutations, Page } from "./mutations";
import { State, Todo } from "./state";
import { Getters } from "./getters";
import { getTodos, saveTodos } from "../services/todos";

export interface Actions {
  logout(): void;
  navigateToHome(): void;
  navigateToLogin(): void;
  navigateToRegister(): void;
  verifyLoggedIn(): boolean;
  goto(path: string): void;
  deleteTodo(todo: Todo): void;
  toggleTodo(todo: Todo): void;
  createTodo(text: string): void;
}

interface CreateActionsArgs {
  mutations: Mutations;
  getState: () => State;
  getters: Getters;
  navigate: Navigate;
}

export const createActions = ({
  mutations,
  getState,
  getters,
  navigate,
}: CreateActionsArgs): Actions => {
  const actions: Actions = {
    logout: () => {
      mutations.logout();
      actions.navigateToLogin();
    },
    deleteTodo: (todo) => {
      mutations.deleteTodo(todo);
      saveTodos({ todos: getState().todos, ...getState().credentials });
    },
    toggleTodo: (todo: Todo) => {
      mutations.toggleTodo(todo);
      saveTodos({ todos: getState().todos, ...getState().credentials });
    },
    createTodo: (text) => {
      mutations.createTodo(text);
      saveTodos({ todos: getState().todos, ...getState().credentials });
    },
    goto: (path) => {
      navigate(path);
    },
    navigateToHome: async () => {
      mutations.setPage(Page.Home);
      const todos = await getTodos({ ...getState().credentials });
      mutations.setTodos(todos);
    },
    navigateToLogin: () => {
      mutations.setPage(Page.Login);
    },
    navigateToRegister: () => {
      mutations.setPage(Page.Register);
    },
    verifyLoggedIn: () => {
      if (!getters.isLoggedIn()) {
        actions.navigateToLogin();
      }
      return getters.isLoggedIn();
    },
  };
  return actions;
};
