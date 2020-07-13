const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  transports: ['websocket'],
});

const {
  isGameOver,
  getGames,
  getGameById,
  addPlayerToGame,
  endGame,
  movePiece,
  createGame,
} = require('./gameManager');

const sendGames = (sender) => {
  sender.emit('games', getGames());
};

io.on('connection', (socket) => {
  sendGames(socket);

  socket.on('disconnect', () => {
    endGame({ player: socket });
    sendGames(io);
  });

  socket.on(
    'move-piece',
    ({ selectedPiece, destination }) => {
      movePiece({
        player: socket,
        selectedPiece,
        destination,
      });
      const winner = isGameOver({ player: socket });
      if (winner !== false) {
        endGame({ player: socket, winner });
      }
      sendGames(io);
    }
  );

  socket.on('leave-game', () => {
    endGame({ player: socket });
    sendGames(io);
  });

  const joinGame = ({ gameId }) => {
    const game = getGameById(gameId);
    if (game.numberOfPlayers < 2) {
      const color = addPlayerToGame({
        player: socket,
        gameId,
      });
      sendGames(io);
      socket.emit('color', color);
    }
  };

  socket.on('create-game', (name) => {
    const game = createGame({ player: socket, name });
    sendGames(io);
    socket.emit('your-game-created', game.id);
    socket.emit('color', 'red');
  });

  socket.on('join-game', (gameId) => {
    joinGame({ gameId });
    sendGames(io);
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
