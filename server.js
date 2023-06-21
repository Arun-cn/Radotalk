const express = require('express');
const app = express();
const http = require('http');
const server =  http.createServer(app);


app.get('/',(req,res)=>{
    res.send("<h1>radotalk<h1>")
})

app.listen(3000,()=>{
    console.log('server started in 3000');
})