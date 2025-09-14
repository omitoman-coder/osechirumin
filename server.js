// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static('public')); // public配信

io.on('connection', (socket) => {
  console.log('新しいプレイヤー接続');

  // 他のプレイヤーに手を送信
  socket.on('move', (data) => {
    socket.broadcast.emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('プレイヤー切断');
  });
});

// Renderが割り当てるポート対応
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`サーバー起動: http://localhost:${PORT}`));