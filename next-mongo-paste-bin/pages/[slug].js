import Head from "next/head";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Snippet } from "../models/Snippet";
import * as copy from "clipboard-copy";

export default function Slug({ snippet, slug }) {
  return (
    <div>
      <Head>
        <title>Snippet {snippet}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <Row className="mb-4">
                <Col>
                  <h1>Snippet "{slug}"</h1>
                </Col>
                <Col className="text-right">
                  <Button
                    onClick={() => copy(window.location)}
                    variant="secondary"
                  >
                    Copy Link for Sharing
                  </Button>
                </Col>
              </Row>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    disabled
                    value={snippet}
                    style={{ height: "400px" }}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const snippet = await Snippet.findOne({
    slug,
  });
  return {
    props: { snippet: snippet.snippet, slug },
  };
}
