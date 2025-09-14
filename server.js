const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // public配信

io.on('connection', socket => {
  console.log('新しいプレイヤー接続');

  // 他プレイヤーに手を送信
  socket.on('move', data => {
    socket.broadcast.emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('プレイヤー切断');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`サーバー起動: http://localhost:${PORT}`));