const { getGames } = require('../gameManager');

module.exports = (sender) => {
  sender.emit('games', getGames());
};
