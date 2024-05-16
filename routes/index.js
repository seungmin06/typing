// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 방 정보를 저장할 배열
let rooms = [];

app.use(bodyParser.json());

// 방 목록을 가져오는 엔드포인트
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

// 방을 만드는 엔드포인트
app.post('/api/rooms', (req, res) => {
  const { name } = req.body;
  const newRoom = { id: rooms.length + 1, name, users: [] };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// 방에 사용자를 추가하는 엔드포인트
app.post('/api/rooms/:id/join', (req, res) => {
  const roomId = parseInt(req.params.id);
  const { username } = req.body;

  const room = rooms.find(room => room.id === roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  room.users.push(username);
  res.json(room);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
