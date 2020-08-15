export const getTodos = ({ Todo }) => async (req, res) => {
  const user = req.user;
  const { todos } = await Todo.findOne({ userId: user._id }).exec();
  res.json(todos);
};
