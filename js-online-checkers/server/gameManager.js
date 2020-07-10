let nextGameId = 0;

const games = [];

exports.getGames = () =>
  games.map((g) => {
    // we don't want to send back the players because the socket
    // object is too complex
    const { players, ...game } = g;
    return {
      ...game,
      numberOfPlayers: players.length,
    };
  });

exports.createGame = ({ name }) => {
  const game = {
    name,
    players: [],
    id: nextGameId++,
  };
  games.push(game);
  return game;
};

exports.getGameById = (gameId) =>
  exports.getGames().find((g) => g.id === gameId);

exports.addPlayerToGame = ({ player, gameId }) => {
  const game = games.find((g) => g.id === gameId);

  const color = game.players.length === 1 ? 'red' : 'black';
  game.players.push({
    color,
    socket: player,
  });

  return color;
};

exports.playerDisconnected = ({ player }) => {
  const game = games.find((g) => g.players.indexOf(player));
  // players might disconnect while in the lobby
  if (!game) return;
  games.splice(games.indexOf(game), 1);
  game.players.forEach((player) => {
    player.socket.emit('end-game');
  });
  games.splice(games.indexOf(game), 1);
};
