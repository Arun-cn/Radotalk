const { users } = require('./users');

module.exports.userSocket = (socket) => {
 // const userId = socket.handshake.session.userId;
  //users[userId] = socket;
  
  console.log('User connected:', socket.id);
  
  socket.on('private message', ({ recipientId, content }) => {
    // Messaging logic...
  });

  socket.on('disconnect', () => {
   // delete users[userId];
  });
};
