import { Todo } from "./state";
import { State } from "./state";

import { v4 as uuid } from "uuid";

interface SetCredentialsOptions {
  username: string;
  password: string;
}

export enum Page {
  Home = "HOME",
  Login = "LOGIN",
  About = "ABOUT",
  Register = "REGISTER",
}

export interface Mutations {
  setCredentials(SetCredentialsOptions): void;
  logout(): void;
  setPage(page: string): void;
  createTodo(text: string): void;
  toggleTodo(todo: Todo): void;
}

export const createMutations = (state: State, setState): Mutations => ({
  setCredentials: ({ username, password }) => {
    setState({
      credentials: {
        username,
        password,
      },
    });
  },
  toggleTodo: (todoToToggle) => {
    const todos = state.todos;
    const todo = todos.find((t) => t.id === todoToToggle.id);
    todo.checked = !todo.checked;
    setState({
      todos,
    });
  },
  createTodo: (text) => {
    state.todos.push({
      id: uuid(),
      text,
      checked: false,
    });
    setState({
      todos: state.todos,
    });
  },
  logout: () => {
    setState({
      credentials: null,
    });
  },
  setPage: (page: Page) => {
    setState({
      page: page,
    });
  },
});
