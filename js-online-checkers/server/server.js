const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const {
  getGames,
  getGameById,
  addPlayerToGame,
  playerDisconnected,
  createGame,
} = require('./gameManager');

const sendGames = (sender) => {
  sender.emit('games', getGames());
};

io.on('connection', (socket) => {
  console.log('a user connected');
  sendGames(socket);

  socket.on('disconnect', () => {
    console.log('a player disconnected');
    playerDisconnected({ player: socket });
  });

  const joinGame = ({ gameId }) => {
    console.log('join game', gameId);
    const game = getGameById(gameId);
    console.log('game', game);
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
    console.log('create-game');
    const game = createGame({ name });
    sendGames(io);
    socket.emit('your-game-created', game.id);
  });

  socket.on('join-game', (gameId) => {
    joinGame({ gameId });
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
