import * as mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});

export const Todo = mongoose.model("Todos", todosSchema);
