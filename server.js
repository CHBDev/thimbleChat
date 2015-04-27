//ThimbleChat Server

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./db.js');
var

app.use(express.static(__dirname + '/public'));

//TODO remove later for real interaction
var db = {};
db.newUserData = {};
db.allUserData = {};
db.newMessages = {};
db.allMessages = {};
db.newContent = {};
db.allContent = {};

db.updateMessages = function(data){

}

db.updateUsers = function(data){

}

db.updateContent = function(data){

}

db.getWords = function(data){

}


io.on('connection', function(socket) {

  socket.on('userUp', function(data) {
    db.updateUser(data);
    socket.broadcast.emit('userDown', db.newUserData);
  });

  socket.on('chatUp', function(data) {
    db.updateMessages(data);
    socket.broadcast.emit('chatDown', db.newMessages);
    socket.emit('wordsDown', db.getWords(data));
  });

  socket.on('contentUp', function(data) {
    db.updateContent(data);
    socket.broadcast.emit('contentDown', db.newContent);
  });


});


http.listen(8080);

