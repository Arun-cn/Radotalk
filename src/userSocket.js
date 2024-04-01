
const { users } = require('./users');

module.exports.userSocket = (socket, io) => {
 // const userId = socket.handshake.session.userId;
  //users[userId] = socket;
  
  console.log('User connected:', socket.id);
  socket.emit('chat message', 'Welcome to the Socket.IO server!');
  socket.emit('chat message', 'hello i am arun!');
  

  socket.on('chat message', (content) => {
    // Messaging logic...
    console.log('Message from client:', content);
    socket.emit('chat message',content);
  });

  socket.on('disconnect', () => {
   // delete users[userId];
   console.log(socket.id);
  });
};
