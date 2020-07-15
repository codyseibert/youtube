const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  transports: ['websocket'],
});

const onDisconnectFactory = require('./handlers/onDisconnectFactory');
const movePieceFactory = require('./handlers/movePieceFactory');
const leaveGameFactory = require('./handlers/leaveGameFactory');
const createGameFactory = require('./handlers/createGameFactory');
const joinGameFactory = require('./handlers/joinGameFactory');
const chatMessageFactory = require('./handlers/chatMessageFactory');

const sendGames = require('./helpers/sendGames');

io.on('connection', (socket) => {
  sendGames(socket);

  socket.on(
    'disconnect',
    onDisconnectFactory({ io, socket })
  );

  socket.on('move-piece', movePieceFactory({ io, socket }));

  socket.on('leave-game', leaveGameFactory({ socket, io }));

  socket.on(
    'chat-message',
    chatMessageFactory({ socket, io })
  );

  socket.on(
    'create-game',
    createGameFactory({ io, socket })
  );

  socket.on('join-game', joinGameFactory({ io, socket }));
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
