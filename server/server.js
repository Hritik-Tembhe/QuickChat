
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // In production, replace with your frontend domain
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('QuickChat Server is running');
});

// Socket connection handling
const users = {}; // Store user information

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  
  // Handle user joining
  socket.on('user_join', ({ username }) => {
    users[socket.id] = {
      username,
      id: socket.id
    };
    
    // Notify all users about the new user
    io.emit('user_joined', { 
      user: users[socket.id],
      users: Object.values(users),
      message: `${username} has joined the chat`
    });
  });
  
  // Handle chat messages
  socket.on('send_message', (data) => {
    const { message } = data;
    const user = users[socket.id];
    
    if (user) {
      io.emit('receive_message', {
        message,
        user,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Handle typing status
  socket.on('typing', (data) => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit('user_typing', { username: user.username });
    }
  });
  
  // Handle stop typing status
  socket.on('stop_typing', () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit('user_stop_typing');
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const user = users[socket.id];
    
    if (user) {
      io.emit('user_left', { 
        user,
        users: Object.values(users).filter(u => u.id !== socket.id),
        message: `${user.username} has left the chat`
      });
      delete users[socket.id];
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
