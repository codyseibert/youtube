const {
  movePiece,
  isGameOver,
  endGame,
} = require('../gameManager');
const sendGames = require('../helpers/sendGames');

module.exports = ({ io, socket }) => ({
  selectedPiece,
  destination,
}) => {
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
};
