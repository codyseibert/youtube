import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Lobby({
  setPage,
  joinGame,
  games,
}) {
  return (
    <div className="lobby">
      <div className="mb-4">
        <Button
          variant="primary"
          onClick={() => setPage('CreateNewGame')}
        >
          Create New Game
        </Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Number of Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 && (
            <tr>
              <td colSpan="3">No games created yet</td>
            </tr>
          )}
          {games.map((game) => (
            <tr key={game.name}>
              <td>{game.name}</td>
              <td>{game.numberOfPlayers} / 2</td>
              <td>
                <Button
                  onClick={() => joinGame(game.id)}
                  variant="link"
                >
                  Join Game
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
