
const express = require('express');
const http = require('http');
const session = require('express-session');
const sharedsession = require('express-socket.io-session');
const {Server} = require('socket.io')
const cors = require('cors');
const connectDB  = require('./config/db');
const router = require('./routes/authRoute');
const path = require('path');

const { userSocket } = require('./userSocket');

// Conenect mongodb 
connectDB();

const app = express();
app.use(express.json());

// Session middleware
const sessionMiddleware = session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true
});
app.use(sessionMiddleware);


const server =  http.createServer(app);

const io = new Server(server);
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
  
app.use("/api/v1/auth",router);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', (msg) => {
    console.log(`user send msg:${msg}`)
    io.emit('chat message',msg);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000,()=>{
    console.log('server started 3000')
});