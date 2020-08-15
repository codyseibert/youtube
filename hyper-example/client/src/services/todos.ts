import { Todo } from "../store/state";
import axios from "axios";

export const saveTodos = ({ todos, username, password }) => {
  return axios
    .post("http://localhost:4000/todos", todos, {
      headers: {
        Authorization: `Bearer ${username}:${password}`,
      },
    })
    .then(({ data }) => data);
};

export const getTodos = ({ username, password }): Promise<Array<Todo>> => {
  return axios
    .get("http://localhost:4000/todos", {
      headers: {
        Authorization: `Bearer ${username}:${password}`,
      },
    })
    .then(({ data }) => data);
};
