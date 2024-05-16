const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS 설정
app.use(cors());

// 방 정보를 저장할 변수
let rooms = [];

// 방 생성 엔드포인트
app.post('/create-room', (req, res) => {
  const newRoom = {
    id: rooms.length + 1,
    name: req.body.name, // 방 이름
    users: [] // 참여한 유저 목록
  };
  rooms.push(newRoom);
  res.json(newRoom);
});

// 방 입장 엔드포인트
app.post('/join-room/:roomId', (req, res) => {
  const roomId = parseInt(req.params.roomId);
  const user = req.body.user; // 유저 정보

  const room = rooms.find(room => room.id === roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  room.users.push(user);
  res.json(room);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Express 서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
