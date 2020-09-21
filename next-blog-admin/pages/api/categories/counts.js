import { Post } from "../../../models/post";
import { CATEGORIES } from "./index";
import { methodMapper } from "../../../utils/methodMapper";

const getCategoryCounts = async (req, res) => {
  const posts = await Post.find({});
  const categories = {};
  CATEGORIES.forEach(
    (category) =>
      (categories[category] = {
        category,
        count: 0,
      })
  );
  posts.forEach((post) => {
    categories[post.category].count++;
  });
  res.json(Object.keys(categories).map((key) => categories[key]));
};

export default methodMapper({
  GET: getCategoryCounts,
});
