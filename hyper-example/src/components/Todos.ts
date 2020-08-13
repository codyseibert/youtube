import { Context } from "..";
import "./Todos.css";

export const Todos = (context: Context) => {
  const Todo = (todo) => {
    const onchange = () => {
      context.actions.toggleTodo(todo);
    };

    const deleteTodo = () => {
      context.actions.deleteTodo(todo);
    };

    return context.html`
      <div class="todo">
        <input type="checkbox" checked=${todo.checked} onchange=${onchange} />
        <label>${todo.text}</label>
        <button onclick=${deleteTodo}>delete</button>
      </div>
    `;
  };

  const createTodo = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const text = `${form.get("todo")}`;
    if (!text) return;
    context.actions.createTodo(text);
    document.getElementById("todo-text").focus();
  };

  return context.html`
    <div>
      ${context.state.todos.map((todo) => Todo(todo))}
      <form class="form-group" onsubmit=${createTodo}>
        <input id="todo-text" placeholder="your todo item" name="todo" class="form-control" type="text" name="new-todo" />
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  `;
};
