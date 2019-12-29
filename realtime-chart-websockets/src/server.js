const server = require('http').createServer();
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});
let start = 0;
io.on('connection', client => {
  setInterval(() => {
    client.emit('entry', {
      key: 'amount',
      value: start++
    });
  }, 1000);
});
server.listen(3000);
