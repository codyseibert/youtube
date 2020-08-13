import { Context } from "..";

export const Todos = (context: Context) => {
  const Todo = (todo) => {
    const onchange = () => {
      context.actions.toggleTodo(todo);
    };

    return context.html`
      <div>
        <input type="checkbox" checked=${todo.checked} onchange=${onchange} />
        <label>${todo.text}</label>
      </div>
    `;
  };

  const createTodo = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const text = `${form.get("todo")}`;
    if (!text) return;
    context.actions.createTodo(text);
  };

  return context.html`
    <div>
      ${context.state.todos.map((todo) => Todo(todo))}
      <form class="form-group" onsubmit=${createTodo}>
        <input placeholder="your todo item" name="todo" class="form-control" type="text" name="new-todo" />
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  `;
};
