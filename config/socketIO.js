module.exports = function(socket){
  console.log('a user connected');

  socket.on('getCurrentContent', function(){
    console.log('getCurrentContent');
    socket.broadcast.emit('getCurrentContent');
  })

  socket.on('postCurrentContent', function(content){
    console.log('postCurrentContent');
    socket.broadcast.emit('postCurrentContent', content);
  })

  socket.on('update', function(content){
    socket.broadcast.emit('update', content);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
}
