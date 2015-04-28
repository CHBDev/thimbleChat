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
var db = {};
db.newUserData = {};
db.allUserData = {};
db.newMessages = {};
db.allMessages = {};
db.newContent = {};
db.allContent = {};

db.allWords = [0,1,2,3,4,5,6,7,8,9,[10, 'some'],[11, 'kind'],[12, 'of'],[13, 'giraffe'],[14, 'words'],[15, 'here'], 16,17,18,19,20];

db.updateMessages = function(data){
  var mess = db.parseUp("message", data);
  this.newMessages.push(mess);
  this.allMessages.push(mess);
};

db.updateUser = function(data){
  var user = data.user.name;
  var userObj = {name: user, avatar: data.user.avatar, currentWords: db.getNewWords(data)};
  db.newUserData[user] = userObj;
  db.allUserData[user] = userObj;
  //check updated data,
  //then set it to user profile
};

db.updateContent = function(data){
  //test auth for admin able to change content
  db.newContent = data.content;
};

db.getNewWords = function(data){
  //TODO hacked atm
  return db.allWords.slice(10,16);
};

db.lockWordsToUser = function(data){

  var usersWords = db.getStuff("currentWords", data);
  var newWords = this.getNewWords(data);
  for(var key in newWords){
    words[key] = newWords[key];
  }
  //TODO use some algo to determine what words the user will have access to
};

db.testMessage = function(data){
  var message = db.parseUp("message", data);
  var words = db.getStuff("currentWords", data);
  var messageIsGood = true;
  for(var i = 0; i < message.length; i++){
    if(words[message[i]] !== true){
      messageIsGood = false;
    }break;
  }

return messageIsGood;
  //make sure user has access to those word numbers
};

db.parseUp = function(thing, data){
   if(thing === "name"){
     return data.user.name;
   }
   if(thing === "message" || thing === "chat" || thing === "mess"){
     return data.user.message;
   }
   if(thing === "avatar"){
     return data.user.avatar;
   }

};

db.getStuff = function(thing, data){
  if(thing === "currentWords"){
    return this.allUserData[data.user.name].currentWords;
  }
  if(thing === 'user'){
    var user = this.allUserData[data.user.name];
    if(user === undefined){
      user = this.getRandomUsername();
    }
    return user;
  }
};

db.getAll = function(data){
  var all = {};
  all.user = db.getStuff('user', data);
  all.users = db.allUserData;
  all.messages = db.allMessages;
  all.content = db.allContent;
  all.nameFragments = db.getNameFragments();
  all.avatarOptions = db.getAvatars();
  return all;
};

db.getNameFragments = function(){
  //TODO hacked hardwired
  return [[1,"fra"], [2,"moon"], [3,"happy"], [4,'feet'], [5,'gruun'], [6,"anda"], [7,"pink"], [8,"ra"], [9,"fim"], [10,"lim"],[11,"lim"]];
}

db.getRandomUsername = function(){
  return "tempThimblePerson";
}

db.getAvatars = function(){
  if(false){
      return [[1,"http://cliparts.co/cliparts/pi5/ooz/pi5oozEMT.png"],[2,"http://img.photobucket.com/albums/v289/jackboots/mecha/silhouette.png"], [3,""]];
  }else{
      return [[1,"http://upload.wikimedia.org/wikipedia/en/c/c6/Nelson_Muntz.PNG",[2,"http://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png"],[3,"https://s-media-cache-ak0.pinimg.com/originals/62/9a/78/629a78e8d3b2e21a6611ff4ad06abd53.jpg"]];
  }
}


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

