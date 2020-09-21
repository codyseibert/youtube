import Head from "next/head";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Modal,
  Table,
} from "react-bootstrap";
import Link from "next/link";
import dayjs from "dayjs";
import { PostDataForm } from "../create";
import { getPost, removePost, updatePost } from "../../../services/posts";
import { useRouter } from "next/router";
import { AppStateContext } from "../../_app";
import { useContext, useState } from "react";
import { getCategories } from "../../../services/categories";

const ConfirmDeleteModal = ({ onConfirm, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, remove post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function EditPost({ id, post, categories }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [appState, setAppState] = useContext(AppStateContext);

  const remove = async () => {
    await removePost({ id, password: appState.password });
    setAppState((state) => ({
      ...state,
      successText: "Your post was deleted successfully.",
    }));
    router.push("/admin");
    setShowModal(false);
  };

  const update = async (post) => {
    await updatePost({
      id,
      post,
      password: appState.password,
    });
    setAppState((state) => ({
      ...state,
      successText: "Your post was updated successfully.",
    }));
    router.push("/admin");
  };

  return (
    <>
      <ConfirmDeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={remove}
      />
      <Container>
        <Row>
          <Col>
            <h1 className="mb-4">Edit Post</h1>
          </Col>
          <Col className="text-right">
            <Button
              variant="danger"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Delete Post
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <PostDataForm
              submitLabel="Save"
              onSubmit={update}
              post={post}
              categories={categories}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const post = await getPost(context.params.id);
  const categories = await getCategories();
  return {
    props: {
      id: context.params.id,
      post,
      categories,
    },
  };
};
