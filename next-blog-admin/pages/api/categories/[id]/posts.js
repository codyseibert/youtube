import { connect } from "../../../../utils/db";
import { Post } from "../../../../models/post";

const getPostsInCategory = async (req, res) => {
  await connect();
  const posts = await Post.find({
    category: req.query.id,
  });
  res.json(posts);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getPostsInCategory(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
