import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Link from "next/link";
import dayjs from "dayjs";
import {
  getPopularPosts,
  getPost,
  getRecentPosts,
} from "../../../services/posts";
import { formatDate } from "../..";
import { AppStateContext } from "../../_app";
import { useContext } from "react";
import { getCategories, getCategoryCounts } from "../../../services/categories";
import { SideInfo } from "../../../components/SideInfo";

export default function Post({
  post,
  recentPosts,
  popularPosts,
  categoryCounts,
}) {
  const [appState] = useContext(AppStateContext);

  return (
    <Container>
      <Row>
        <Col md={8}>
          {appState.isAdmin && (
            <Link href={`/posts/${post._id}/edit`}>
              <Button className="float-right" variation="primary">
                Edit
              </Button>
            </Link>
          )}
          <h1>{post.title}</h1>
          <h3>{formatDate(post.date)}</h3>
          <img className="mb-4 img-fluid" src={post.imageUrl} />{" "}
          <div dangerouslySetInnerHTML={{ __html: post.text }}></div>
        </Col>
        <Col md={1}></Col>
        <Col md={3}>
          <SideInfo
            recentPosts={recentPosts}
            categoryCounts={categoryCounts}
            popularPosts={popularPosts}
          />
        </Col>
      </Row>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const post = await getPost(context.params.id);
  const recentPosts = await getRecentPosts();
  const popularPosts = await getPopularPosts();
  const categoryCounts = await getCategoryCounts();

  return {
    props: {
      id: context.params.id,
      post,
      recentPosts,
      popularPosts,
      categoryCounts,
    },
  };
};
