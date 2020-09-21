import Link from "next/link";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { formatDate, PostPreview } from "..";
import { getPostsInCategory } from "../../services/categories";

export const CardPost = ({ post }) => {
  return (
    <Card className="mb-2">
      <Card.Img variant="top" src={post.imageUrl} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {formatDate(post.date)}
        </Card.Subtitle>

        <Card.Text>
          <div
            dangerouslySetInnerHTML={{
              __html: post.text.substring(0, 100) + "...",
            }}
          ></div>
        </Card.Text>
        <Link href={`/posts/${post._id}`}>
          <a>Continue reading...</a>
        </Link>
      </Card.Body>
    </Card>
  );
};
export default function ShowCategory({ posts, id }) {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="mb-5">{id} Posts</h1>
        </Col>
      </Row>
      <Row>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          {posts.map((post) => (
            <CardPost post={post} key={post._id} />
          ))}
        </div>
      </Row>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const posts = await getPostsInCategory(context.params.id);
  return {
    props: {
      id: context.params.id,
      posts,
    },
  };
};
