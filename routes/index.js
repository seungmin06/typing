// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let rooms = [];

// 방 생성 API
app.post('/api/rooms', (req, res) => {
  const { name, capacity } = req.body;
  const newRoom = { id: rooms.length + 1, name, capacity };
  rooms.push(newRoom);
  res.json(newRoom);
});

// 모든 방 가져오는 API
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
