import Head from "next/head";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import Link from "next/link";
import { AppStateContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import { formatDate } from ".";
import { login } from "../services/login";
import { NoPostsEmptyState } from "../components/NoPostsEmptyState";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [appState, setAppState] = useContext(AppStateContext);

  return (
    <>
      <h1>Please Login</h1>
      {appState.errorText && (
        <Alert
          onClose={() => setAppState((state) => ({ ...state, errorText: "" }))}
          dismissible
          variant="danger"
        >
          {appState.errorText}
        </Alert>
      )}
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login({ password });
            setAppState((state) => ({
              ...state,
              isAdmin: true,
            }));
          } catch (err) {
            setAppState((state) => ({
              ...state,
              errorText: "invalid password",
            }));
          }
        }}
      >
        <Form.Group controlId="password">
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Enter the admin password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default function Admin({ posts }) {
  const [appState, setAppState] = useContext(AppStateContext);

  useEffect(
    () => () => setAppState((state) => ({ ...state, successText: "" })),
    []
  );

  return (
    <Container>
      <Row>
        {!appState.isAdmin && (
          <Col>
            <LoginForm />
          </Col>
        )}
        {appState.isAdmin && (
          <Col>
            {appState.successText && (
              <Alert
                onClose={() =>
                  setAppState((state) => ({ ...state, successText: "" }))
                }
                dismissible
                variant="success"
              >
                {appState.successText}
              </Alert>
            )}
            <h1 className="mb-4">
              Your Posts
              <div className="float-right">
                <Link href="/posts/create">
                  <Button variant="success">Create Post</Button>
                </Link>
              </div>
            </h1>

            {posts.length === 0 && (
              <Col>
                <NoPostsEmptyState text="No posts created yet!"></NoPostsEmptyState>
              </Col>
            )}
            {posts.length !== 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td>
                        <Link href={`/posts/${post._id}`}>
                          <a className="mr-2">{post.title}</a>
                        </Link>
                      </td>
                      <td>{formatDate(post.date)}</td>
                      <td>
                        <Link href={`/posts/${post._id}/edit`}>
                          <a className="mr-2">Edit</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};
