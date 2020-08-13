const { addChatMessage } = require('../gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => (message) => {
  addChatMessage({ player: socket, message });
  sendGames(io);
};
