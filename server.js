//ThimbleChat Server

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db = require('./db.js');

//todo use authentication
//todo use session tokens

app.use(express.static(__dirname + '/public'));

//TODO remove later for real interaction



io.on('connection', function(socket) {

  console.log("server is connected");
  socket.on('userUp', function(data) {
    db.updateUser(data);
    socket.broadcast.emit('userDown', {user:db.newUserData});
  });

  socket.on('chatUp', function(data) {
    console.log("DATA on chat up = ", data);
    console.log("server recieves chat up");
    if(db.testMessage(data)){
      db.updateMessages(data);
      socket.broadcast.emit('chatDown', db.newMessages);
      socket.emit('wordsDown', {words: db.getWords(data)});
    }else{
      socket.emit('wordsError', {words: db.getCurrentWords(data)});
    }

  });

  socket.on('contentUp', function(data) {
    db.updateContent(data);
    socket.broadcast.emit('contentDown', {content:db.newContent});
  });

  socket.on('disconnect', function(data) {
    //TODO set user as offline
    socket.broadcast.emit('userDown', data);
  });

  socket.on('startUp', function(data){
    //soemhow based on this data
    //we determine what user it is
    console.log("START ON SERVER: ", data);
    db.updateUser(data);
    socket.emit('allDown', db.getAll(data));
  });

  socket.emit('startDown', {});


});


server.listen(8080, function(){
  console.log('listening on *:8080');
});

