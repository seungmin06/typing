// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_room', ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room ${room}`);
  });

  socket.on('send_message', ({ username, room, message }) => {
    io.to(room).emit('receive_message', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
