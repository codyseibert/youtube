import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";

export default function Create() {
  const [snippet, setSnippet] = useState("");
  const router = useRouter();

  const createSnippet = async () => {
    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippet }),
    });
    const createdSnippet = await response.json();
    router.push(`/${createdSnippet.slug}`);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1>Create a Snippet</h1>
              <p>
                Paste whatever text you wanted saved, and
                you'll get back a unique link to share with
                others
              </p>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>New Snippet</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setSnippet(e.target.value)
                    }
                    style={{ height: "400px" }}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  onClick={createSnippet}
                  variant="primary"
                >
                  Create New Snippet
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
