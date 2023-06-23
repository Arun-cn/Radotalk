
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
const connectDB  = require('./config/db');
const router = require('./routes/authRoute');
const server =  http.createServer(app);

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("<h1>radotalk<h1>")
})

app.use("/api/v1/auth",router);
connectDB();
app.listen(3000,()=>{
    console.log('server started in 3000');
})