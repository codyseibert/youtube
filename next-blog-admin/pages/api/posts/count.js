import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";
import { ITEMS_PER_PAGE } from ".";

const getPostsCount = async (req, res) => {
  await connect();
  const totalPosts = await Post.count({});
  res.json({ totalPages: Math.ceil(totalPosts / ITEMS_PER_PAGE) });
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getPostsCount(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
