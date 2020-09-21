import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";
import { verifyIsAdmin } from "../../../utils/verifyIsAdmin";

const removePost = async (req, res) => {
  await verifyIsAdmin(req, res);
  await connect();
  const post = await Post.findByIdAndDelete(req.query.id);
  res.json(post);
};

const getPost = async (req, res) => {
  await connect();
  const post = await Post.findById(req.query.id);
  console.log(post);
  post.views++;
  await post.save();
  console.log(post);
  res.json(post);
};

const updatePost = async (req, res) => {
  await verifyIsAdmin(req, res);
  await connect();
  const post = await Post.findById(req.query.id);
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getPost(req, res);
      break;
    case "DELETE":
      await removePost(req, res);
      break;
    case "POST":
      await updatePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
