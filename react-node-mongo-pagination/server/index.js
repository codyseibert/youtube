const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/pagination", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const postSchema = new mongoose.Schema({
  text: String,
});
const Post = mongoose.model("Post", postSchema);

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const page = parseInt(req.query.page || "0");
  const PAGE_SIZE = 3;
  const total = await Post.countDocuments({});
  const posts = await Post.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({ posts, pages: Math.ceil(total / PAGE_SIZE) });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
