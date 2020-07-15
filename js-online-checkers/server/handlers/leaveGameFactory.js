const { endGame } = require('../gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => () => {
  endGame({ player: socket });
  sendGames(io);
};
