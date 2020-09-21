import Link from "next/link";
import { ListGroup } from "react-bootstrap";

export const SideInfo = ({ recentPosts, popularPosts, categoryCounts }) => {
  return (
    <>
      <div className="mb-5">
        <h3>Recent Posts</h3>
        <ListGroup>
          {recentPosts.map((post) => (
            <Link key={post._id} href={`/posts/${post._id}`}>
              <a>
                <ListGroup.Item>{post.title}</ListGroup.Item>
              </a>
            </Link>
          ))}
        </ListGroup>
      </div>
      <div className="mb-5">
        <h3>Popular Posts</h3>
        <ListGroup>
          {popularPosts.map((post) => (
            <Link key={post._id} href={`/posts/${post._id}`}>
              <a>
                <ListGroup.Item>
                  {post.title} ({post.views} views)
                </ListGroup.Item>
              </a>
            </Link>
          ))}
        </ListGroup>
      </div>
      <div className="mb-5">
        <h3>Categories</h3>
        <ListGroup>
          {categoryCounts
            .filter((category) => category.count > 0)
            .map((category) => (
              <Link
                key={category.category}
                href={`/categories/${category.category}`}
              >
                <a>
                  <ListGroup.Item>
                    {category.category} ({category.count})
                  </ListGroup.Item>
                </a>
              </Link>
            ))}
        </ListGroup>
      </div>
    </>
  );
};
