export const postTodos = ({ Todo }) => async (req, res) => {
  const user = req.user;
  const todosItems = req.body;
  const todos = await Todo.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todo.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
};
