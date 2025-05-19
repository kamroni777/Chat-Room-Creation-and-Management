require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "http://localhost:3000" },
});


app.use(cors());
app.use(express.json());


connectDB();


io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('sendMessage', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket) => {
  console.log('New client connected');
  
 
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    const user = await User.findById(socket.userId);
    io.to(roomId).emit('userJoined', {
      userId: user._id,
      username: user.username
    });
  });

 
  socket.on('leaveRoom', async (roomId) => {
    socket.leave(roomId);
    const user = await User.findById(socket.userId);
    io.to(roomId).emit('userLeft', {
      userId: user._id,
      username: user.username
    });
  });
});