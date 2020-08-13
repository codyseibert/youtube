const {
  getGameById,
  addPlayerToGame,
} = require('../gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (gameId) => {
  const game = getGameById(gameId);
  if (game.numberOfPlayers < 2) {
    const color = addPlayerToGame({
      player: socket,
      gameId,
    });
    sendGames(io);
    socket.emit('color', color);
  }
  sendGames(io);
};
