import Head from "next/head";
import { useRouter } from "next/router";

import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import dayjs from "dayjs";
import {
  getPopularPosts,
  getPosts,
  getRecentPosts,
  getTotalPages,
} from "../services/posts";
import styled from "styled-components";
import { getCategoryCounts } from "../services/categories";
import { SideInfo } from "../components/SideInfo";
import {
  faNewspaper,
  faGrinBeamSweat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoPostsEmptyState } from "../components/NoPostsEmptyState";

export const formatDate = (date) => {
  return dayjs(date).format("MMM D, YYYY");
};

const PostBody = styled.p`
  min-height: 200px;
`;

export const PostPreview = ({ post }) => {
  const MAX_BODY_CHARS = 800;

  return (
    <div className="mb-5">
      <Link href={`/posts/${post._id}`}>
        <a>
          <h3>{post.title}</h3>
        </a>
      </Link>
      <h5>{formatDate(post.date)}</h5>
      <PostBody>
        <img className="m-4" align="right" width="400" src={post.imageUrl} />{" "}
        <div
          dangerouslySetInnerHTML={{
            __html: post.text.substring(0, MAX_BODY_CHARS) + "...",
          }}
        ></div>
      </PostBody>
      <div className="text-right">
        <Link href={`/posts/${post._id}`}>
          <a>continue reading</a>
        </Link>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default function Home({
  posts,
  recentPosts,
  popularPosts,
  categoryCounts,
  page,
  totalPages,
}) {
  return (
    <Container>
      <Row>
        {posts.length === 0 && (
          <Col>
            <NoPostsEmptyState text="No posts created yet!" />
          </Col>
        )}

        {posts.length !== 0 && (
          <>
            <Col md={8}>
              {posts.map((post) => (
                <PostPreview post={post} key={post._id} />
              ))}
              <Pagination>
                {new Array(totalPages).fill(null).map((val, idx) => (
                  <Link key={idx} href={`/?page=${idx}`} passHref>
                    <Pagination.Item key={idx} active={idx === page}>
                      {idx + 1}
                    </Pagination.Item>
                  </Link>
                ))}
              </Pagination>
            </Col>
            <Col md={1}></Col>
            <Col md={3}>
              <SideInfo
                recentPosts={recentPosts}
                popularPosts={popularPosts}
                categoryCounts={categoryCounts}
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const page = parseInt(context.query.page || "0");
  const posts = await getPosts(page);
  const { totalPages } = await getTotalPages();
  const recentPosts = await getRecentPosts();
  const popularPosts = await getPopularPosts();
  const categoryCounts = await getCategoryCounts();
  return {
    props: {
      posts,
      recentPosts,
      popularPosts,
      categoryCounts,
      page,
      totalPages,
    },
  };
};
