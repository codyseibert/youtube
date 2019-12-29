const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

let tick = 0;
// 1. listen for socket connections
io.on('connection', client => {
  setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
    os.cpuUsage(cpuPercent => {
      client.emit('cpu', {
        name: tick++,
        value: cpuPercent
      });
    });
  }, 1000);
});

server.listen(3000);
