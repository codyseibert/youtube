import React, { useState } from 'react';

export default function CreateNewGame({ createGame }) {
  const [name, setName] = useState('');

  return (
    <div>
      <h1>Create New Game</h1>

      <label>Name</label>
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
      ></input>

      <button onClick={() => createGame(name)}>
        Create
      </button>
    </div>
  );
}
