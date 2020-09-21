import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";

const getPopularPosts = async (req, res) => {
  await connect();
  const popularPosts = await Post.find().sort({ views: -1 }).limit(5);
  res.json(popularPosts);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getPopularPosts(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
