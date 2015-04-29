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
  socket.on('newUser', function(userInfo) {
    var aUser = db.newUser(userInfo);
    var name = aUser.name;
    socket.emit('userDown', aUser );
    socket.emit('showNewUsers', db.allUserData );
    socket.broadcast.emit('showNewUsers', aUser );


  });

  socket.on('chatUp', function(data) {

    if(db.testMessage(data)){
      socket.broadcast.emit('chatDown', {name: AI1,words: [[1,"Hi"],[2,"fern"],[3,"dog"],[4,"plenty"],[5,"a"],[6,"place"]]});
      socket.emit('wordsDown', {words: db.getNewWords(data.name)});
    }else{
      socket.emit('wordsError', {words: db.getCurrentWords(data.name)});
    }

  });

  socket.on('disconnect', function(data) {
    //TODO set user as offline
    socket.broadcast.emit('userDown', data);
  });

  socket.on('startUp', function(data){
    //soemhow based on this data
    //we determine what user it is
    console.log("START ON SERVER: ", data);
    if(data.name){
      //test for validation
    }
    socket.emit('allDown', db.getAll());
  });

  socket.emit('startDown', {});


});


server.listen(8080, function(){
  console.log('listening on *:8080');
});

