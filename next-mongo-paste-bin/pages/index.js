import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Welcome!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row>
            <Col>
              <h1>Paste Bucket</h1>
              <p>
                This site was created to help people have a
                place to store text so that they can easily
                share it between friends or on the internet
              </p>
              <Button href="/create" variant="primary">
                Create Your Snippet
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
