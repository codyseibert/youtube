import styled from "styled-components";
import Head from "next/head";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Link from "next/link";
import { searchPosts } from "../services/posts";
import { CardPost } from "./categories/[id]";

import { NoPostsEmptyState } from "../components/NoPostsEmptyState";

const NoResults = (searchString) => {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-4">Results matching keyword "{searchString}"</h1>
      </div>
      <NoPostsEmptyState text="No results found!" />
    </>
  );
};

const Results = ({ searchString, posts }) => {
  return (
    <>
      <h1 className="mb-4">Results matching keyword "{searchString}"</h1>
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
    </>
  );
};

export default function Search({ posts, searchString }) {
  return (
    <Container>
      <Row>
        <Col>
          {posts.length === 0 ? (
            <NoResults searchString={searchString} />
          ) : (
            <Results searchString={searchString} posts={posts} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const posts = await searchPosts({ titleText: context.query.title });
  return {
    props: {
      posts,
      searchString: context.query.title,
    },
  };
};
