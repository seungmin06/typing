// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

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
    // 여기서는 클라이언트에게 메시지를 전달하는 대신에, 방에 속한 클라이언트들에게 메시지를 전달해야 합니다.
    io.to(room).emit('receive_message', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
