import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import CreateNewGame from './CreateNewGame';
import Lobby from './Lobby';
import Game from './Game';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import 'bootstrap/dist/css/bootstrap.min.css';

const PAGE_GAME = 'Game';
const PAGE_LOBBY = 'Lobby';
const PAGE_CREATE_NEW_GAME = 'CreateNewGame';

function App() {
  const [page, setPage] = useState('Lobby');
  const [games, setGames] = useState([]);
  const [color, setColor] = useState('');
  const [game, setGame] = useState({ board: [] });
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);

  const joinGame = (gameId) => {
    socket.emit('join-game', gameId);
    setPage(PAGE_GAME);
    setGameId(gameId);
  };

  const movePiece = ({ selectedPiece, destination }) => {
    socket.emit('move-piece', {
      selectedPiece,
      destination,
    });
  };

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);
    if (!game) {
      setGame({
        board: [],
      });
    } else {
      setGame(game);
    }
  }, [games, gameId]);

  const leaveGame = () => {
    setGame(PAGE_LOBBY);
    socket.emit('leave-game');
  };

  const createGame = (name) => {
    socket.emit('create-game', name);
    setPage(PAGE_GAME);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      transports: ['websocket'],
    });
    newSocket.on('disconnect', () => {
      setGameId(null);
      setColor('');
      setPage(PAGE_LOBBY);
      alert('The server crashed or restarted');
    });
    newSocket.on('games', (games) => {
      setGames(games);
    });
    newSocket.on('your-game-created', (gameId) => {
      setGameId(gameId);
    });
    newSocket.on('color', (color) => setColor(color));
    newSocket.on('end-game', () => {
      setGameId(null);
      setColor('');
      setPage(PAGE_LOBBY);
      alert('The game has ended');
    });
    newSocket.on('winner', (winner) => {
      alert(`${winner} has won the game!`);
    });
    setSocket(newSocket);
  }, []);

  return (
    <>
      <Navbar className="mb-4" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          React Online Checkers
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setPage(PAGE_LOBBY)}>
            Lobby
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>
            {page === PAGE_LOBBY && (
              <Lobby
                games={games}
                setPage={setPage}
                joinGame={joinGame}
              />
            )}
            {page === PAGE_CREATE_NEW_GAME && (
              <CreateNewGame createGame={createGame} />
            )}
            {page === PAGE_GAME && game && (
              <Game
                color={color}
                game={game}
                leaveGame={leaveGame}
                movePiece={movePiece}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
