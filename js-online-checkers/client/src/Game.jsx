import React from 'react';

export default function Game({ game, color }) {
  return (
    <>
      <div>{game.name}</div>
      <div>{color}</div>
    </>
  );
}
