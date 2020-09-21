import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";

const getRecentPosts = async (req, res) => {
  await connect();
  const recentPosts = await Post.find().sort({ _id: -1 }).limit(5);
  res.json(recentPosts);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getRecentPosts(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
