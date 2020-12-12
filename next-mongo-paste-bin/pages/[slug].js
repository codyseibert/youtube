import React from "react";
import { Form, Button } from "react-bootstrap";
import { Snippet } from "../models/Snippet";
import { connect } from "../utils/db";
import copy from "clipboard-copy";

export default function CreateSnippet({ snippetText }) {
  return (
    <div className="text-center mt-4">
      <h1>Snippet</h1>

      <Button
        onClick={() => copy(window.location)}
        className="mb-4 mt-2"
        variant="outline-info"
      >
        Copy Link to Clipboard
      </Button>

      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            style={{
              margin: "0 auto",
              width: "400px",
              height: "300px",
            }}
            disabled
            value={snippetText}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export async function getServerSideProps(context) {
  await connect();

  const slug = context.params.slug;

  const snippetObject = await Snippet.findOne({
    slug,
  });

  return {
    props: {
      snippetText: snippetObject.snippet,
    },
  };
}
