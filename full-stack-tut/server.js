const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const upload = multer();

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "full-stack-blog";
const client = new MongoClient(url);
let db = null;

app.use(express.static("public"));
app.use(cors());

app.get("/posts", async (req, res) => {
  const collection = db.collection("posts");
  const posts = await collection.find({}).toArray();
  res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const collection = db.collection("posts");
  const post = await collection.findOne({
    _id: new mongo.ObjectID(id),
  });
  res.json(post);
});

app.post("/posts", upload.none(), async (req, res) => {
  const collection = db.collection("posts");
  const post = await collection.insert(req.body);
  res.json(post.ops[0]);
});

client.connect((err) => {
  console.log(err);
  console.log("Connected successfully to server");
  db = client.db(dbName);
  console.log("server started on port 3000");
  app.listen(3000);
});
