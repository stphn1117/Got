
const net = require('net');

// Create a server object
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.write('SERVER: Hello! This is server speaking.\n');
  socket.end('SERVER: Closing connection now.\n');
}).on('error', (err) => {
  console.error(err);
});

// Open server on port 3000
server.listen(3000, () => {
  console.log('opened server on', server.address().port);
});
/*
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
*/