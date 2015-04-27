//ThimbleChat Server

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./db.js');

//todo use authentication
//todo use session tokens

app.use(express.static(__dirname + '/public'));

//TODO remove later for real interaction
var db = {};
db.newUserData = {};
db.allUserData = {};
db.newMessages = {};
db.allMessages = {};
db.newContent = {};
db.allContent = {};

db.allWords = {{10: 'some'},{11: 'kind'},{12: 'of'},{13: 'giraffe'},{14: 'words'},{15: 'here'},

db.updateMessages = function(data){

  this.newMessages.push(data.messages);
  this.allMessages.push(data.messages);
}

db.updateUser = function(data){
  //check updated data,
  //then set it to user profile
}

db.updateContent = function(data){
  //test auth for admin able to change content
  db.newContent = data.content;
}

db.getNewWords = function(data){
  //TODO hacked atm
  return db.allWords;
}

db.lockWordsToUser = function(data){

  var usersWords = this.getCurrentWords(data);
  var newWords = this.getNewWords(data);
  for(var key in newWords){
    words[key] = newWords[key];
  }
  //TODO use some algo to determine what words the user will have access to
}

db.getUser = function(data){
  return this.allUserData[data.user.name];
}

db.getCurrentWords = function(data){
  return this.getUser(data).currentWords;
}

db.testMessage = function(data){
  var message = data.message;
  var words = this.getCurrentWords(data);
  var messageIsGood = true;
  for(var i = 0; i < message.length; i++){
    if(words[message[i]] !== true){
      messageIsGood = false;
    }break;
  }

return messageIsGood;
  //make sure user has access to those word numbers
}



io.on('connection', function(socket) {

  socket.on('userUp', function(data) {
    db.updateUser(data);
    socket.broadcast.emit('userDown', db.newUserData);
  });

  socket.on('chatUp', function(data) {
    if(messageIsGood){
      db.updateMessages(data);
      socket.broadcast.emit('chatDown', db.newMessages);
      socket.emit('wordsDown', db.getWords(data));
    }else{
      socket.emit('wordsError', db.getCurrentWords(data));
    }

  });

  socket.on('contentUp', function(data) {
    db.updateContent(data);
    socket.broadcast.emit('contentDown', db.newContent);
  });


});


http.listen(8080);

