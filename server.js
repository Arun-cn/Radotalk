
const express = require('express');
const app = express();
const http = require('http');

const {Server} = require('socket.io')

const cors = require('cors');
const connectDB  = require('./config/db');
const router = require('./routes/authRoute');

const server =  http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:'http://localhost:3007'
  }
});
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("<h1>radotalk<h1>")
})

app.use("/api/v1/auth",router);
connectDB();

io.on('connection',(server)=>{
  console.log('user connected');
});


server.listen(3000,()=>{
    console.log('server started 3000')
});