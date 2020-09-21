import Head from "next/head";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { AppStateContext } from "../_app";
import Link from "next/link";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { createPost } from "../../services/posts";
import { useRouter } from "next/router";
import { getCategories } from "../../services/categories";

export const PostDataForm = ({
  post = {},
  onSubmit,
  categories,
  submitLabel,
}) => {
  const [title, setTitle] = useState(post.title || "");
  const [date, setDate] = useState(post.date || "");
  const [imageUrl, setImageUrl] = useState(post.imageUrl || "");
  const [text, setText] = useState(post.text || "");
  const [category, setCategory] = useState(post.category || "Other");
  const [validated, setValidated] = useState(false);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(e) => {
        e.preventDefault();
        setValidated(true);
        if (title && date && text && category) {
          onSubmit({ title, date, text, category, imageUrl });
        }
      }}
    >
      {`${validated}`}
      <Form.Row>
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            defaultValue={title}
            required
            placeholder="Enter a title for your post"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            onChange={(e) => setDate(e.target.value)}
            defaultValue={date}
            type="date"
            placeholder="Enter the date for your post"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="category">
          <Form.Label>Category</Form.Label>

          <Form.Control
            as="select"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="image">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          defaultValue={imageUrl}
          required
          placeholder="Enter a image url for your post"
        />
      </Form.Group>

      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          defaultValue={text}
          required
          onChange={(e) => setText(e.target.value)}
          as="textarea"
          rows={10}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
};

export default function CreatePost({ categories }) {
  const router = useRouter();
  const [appState, setAppState] = useContext(AppStateContext);

  const create = async (post) => {
    await createPost({
      post,
      password: appState.password,
    });
    setAppState((state) => ({
      ...state,
      successText: "Your post was created successfully.",
    }));
    router.push("/admin");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mb-4">Create Post</h1>
          <PostDataForm
            categories={categories}
            submitLabel="Create"
            onSubmit={create}
          />
        </Col>
      </Row>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
};
