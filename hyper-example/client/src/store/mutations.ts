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
  setTodos(todos: Array<Todo>): void;
  toggleTodo(todo: Todo): void;
  deleteTodo(todo: Todo): void;
}

interface createMutationsArgs {
  getState: () => State;
  setState: (Object) => void;
}

export const createMutations = ({
  getState,
  setState,
}: createMutationsArgs): Mutations => ({
  setCredentials: ({ username, password }) => {
    setState({
      credentials: {
        username,
        password,
      },
    });
  },
  deleteTodo: (todo) => {
    setState({
      todos: getState().todos.filter((t) => t.id !== todo.id),
    });
  },
  setTodos: (todos) => {
    setState({
      todos,
    });
  },
  toggleTodo: (todoToToggle) => {
    const todos = getState().todos;
    const todo = todos.find((t) => t.id === todoToToggle.id);
    todo.checked = !todo.checked;
    setState({
      todos,
    });
  },
  createTodo: (text) => {
    getState().todos.push({
      id: uuid(),
      text,
      checked: false,
    });
    setState({
      todos: getState().todos,
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
