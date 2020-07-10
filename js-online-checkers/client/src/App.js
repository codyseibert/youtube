import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import './App.css';
import io from 'socket.io-client';
import CreateNewGame from './CreateNewGame';
import Lobby from './Lobby';
import Game from './Game';

const PAGE_GAME = 'Game';
const PAGE_LOBBY = 'Lobby';
const PAGE_CREATE_NEW_GAME = 'CreateNewGame';

function App() {
  const [page, setPage] = useState('Lobby');
  const [games, setGames] = useState([]);
  const [color, setColor] = useState('');
  const [game, setGame] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);

  const createGame = (name) => {
    socket.emit('create-game', name);
    setPage(PAGE_GAME);
  };

  useEffect(() => {
    if (!gameId) return;
    socket.emit('join-game', gameId);
    setPage(PAGE_GAME);
    console.log('gameId', gameId);
    console.log('games', games);
    console.log(
      'games.find((g) => g.id === gameId)',
      games.find((g) => g.id === gameId)
    );
    setGame(games.find((g) => g.id === gameId));
  }, [gameId]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('games', (games) => {
      console.log('set games', games);
      setGames(games);
    });
    socket.on('your-game-created', (gameId) => {
      setGameId(gameId);
    });
    socket.on('color', (color) => setColor(color));
    socket.on('end-game', () => {
      setColor('');
      setPage(PAGE_LOBBY);
    });
    setSocket(socket);
  }, [socket]);

  return (
    <div className="App">
      {page === PAGE_LOBBY && (
        <Lobby
          games={games}
          setPage={setPage}
          // joinGame={joinGame}
        />
      )}
      {page === PAGE_CREATE_NEW_GAME && (
        <CreateNewGame createGame={createGame} />
      )}
      {page === PAGE_GAME && game && (
        <Game color={color} game={game} />
      )}
    </div>
  );
}

export default App;
