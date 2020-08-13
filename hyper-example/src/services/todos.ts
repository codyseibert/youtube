import { Todo } from "../store/state";

let allTodos = JSON.parse(localStorage.getItem("todos") || "[]");

export const persistTodos = (todos) => {
  allTodos = todos;
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = (): Array<Todo> => {
  return allTodos;
};
