import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";

const searchPosts = async (req, res) => {
  await connect();
  const { query } = req;
  const posts = await Post.find({
    title: { $regex: query.title, $options: "i" },
  });
  res.json(posts);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await searchPosts(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
