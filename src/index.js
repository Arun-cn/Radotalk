const express = require('express');
const http = require('http');
const session = require('express-session');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const router = require('./routes');
const path = require('path');

// Conenect mongodb
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
const sessionMiddleware = session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddleware);

const server = http.createServer(app);

const io = socketIo(server);
/*io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));*/

const publicDirectoryPath = path.join(__dirname, 'public');

// Serve static files from public directory (approach 1)
app.use(express.static(publicDirectoryPath));

// API route to send index.html (approach 2 - optional)
app.get('/', (req, res) => {
  const filePath = path.join(publicDirectoryPath, 'index.html'); // Specify full path to index.html
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to send index.html');
    } else {
      console.log('index.html sent successfully');
    }
  });
});

app.use('/api', router);

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle 'join' event to associate a user with a socket
  socket.on('join', (userId) => {
    socket.join(userId); // Join the room with the user's ID
    console.log(`User ${userId} joined the room`);
  });

  // Handle 'message' event to send a message to a specific user
  socket.on('message', ({ toUserId, fromUserId, message }) => {
    io.to(toUserId).emit('message', { from: fromUserId, message });
    console.log(`Message from ${fromUserId} to ${toUserId}: ${message}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
