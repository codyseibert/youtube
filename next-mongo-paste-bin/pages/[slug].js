import Head from "next/head";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Snippet } from "../models/Snippet";

export default function Slug({ snippet }) {
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
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>New Snippet</Form.Label>
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
    props: { snippet: snippet.snippet },
  };
}
