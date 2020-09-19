import { connect } from "../../utils/db";
import { Post } from "../../models/post";

export default async (req, res) => {
  await connect();
  const post = await Post.create({
    text: "hello world",
  });
  res.json(post);
};
