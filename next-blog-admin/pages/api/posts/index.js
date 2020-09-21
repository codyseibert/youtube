import { connect } from "../../../utils/db";
import { Post } from "../../../models/post";
import { verifyIsAdmin } from "../../../utils/verifyIsAdmin";

export const ITEMS_PER_PAGE = 3;

const createPost = async (req, res) => {
  await verifyIsAdmin(req, res);
  await connect();
  const { body } = req;
  const post = await Post.create({
    ...body,
  });
  res.json(post);
};

const getPosts = async (req, res) => {
  await connect();
  const page = parseInt(req.query.page || "0");
  const posts = await Post.find({})
    .skip(page * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.json(posts);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      await createPost(req, res);
      break;
    case "GET":
      await getPosts(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
