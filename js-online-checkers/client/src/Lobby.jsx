import React from 'react';

export default function Lobby({
  setPage,
  joinGame,
  games,
}) {
  return (
    <div>
      {games.map((game) => (
        <div key={game.name}>
          {game.name}
          {game.id}
          {game.numberOfPlayers} / 2
          <button onClick={() => joinGame(game.id)}>
            Join Game
          </button>
        </div>
      ))}
      <button onClick={() => setPage('CreateNewGame')}>
        Create New Game
      </button>
    </div>
  );
}
