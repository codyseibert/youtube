import { auth } from "./middleware/auth";

import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";

const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/todo", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());

import { User } from "./models/User";
import { Todo } from "./models/Todo";

import { register } from "./routes/auth/register";
import { login } from "./routes/auth/login";
import { getTodos } from "./routes/todos/getTodos";
import { postTodos } from "./routes/todos/postTodos";

// TODO: use auth middleware
app.post("/register", register({ User }));
app.post("/login", login({ User }));
app.get("/todos", auth({ User }), getTodos({ Todo }));
app.post("/todos", auth({ User }), postTodos({ Todo }));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
