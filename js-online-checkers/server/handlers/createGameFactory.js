const { createGame } = require('../gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (name) => {
  const game = createGame({ player: socket, name });
  sendGames(io);
  socket.emit('your-game-created', game.id);
  socket.emit('color', 'red');
};
