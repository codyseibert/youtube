const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/pagination", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const postSchema = new mongoose.Schema({
  text: String,
  title: String,
});

const Post = mongoose.model("Post", postSchema);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Post.countDocuments({});
  const posts = await Post.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    posts,
  });
});

const db = mongoose.connection;

db.once("open", () => {
  app.listen(4000);
});
