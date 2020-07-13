import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateNewGame({ createGame }) {
  const [name, setName] = useState('');

  return (
    <div>
      <h1>Create New Game</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createGame(name);
        }}
      >
        <Form.Group controlId="name">
          <Form.Label>Name of Game</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => createGame(name)}
        >
          Create
        </Button>
      </Form>
    </div>
  );
}
