var db = {};
var ADDAI = true;
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
  var userObj = {name: user, avatar: data.user.avatar};
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

db.lockWordsToUser = function(words, user){

  var usersWords = this.allUserData[user].currentWords
  usersWords = usersWords.concat(words);

  return usersWords;
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


db.getAll = function(){
  var all = {};
  all.name = this.getRandomUsername();
  all.currentRoom = this.getRandomRoom();
  all.users = this.allUserData[all.currentRoom];
  all.messages = this.allMessages;
  all.content = this.getRandomContent();
  all.nameFragments = this.getNameFragments();
  all.avatarOptions = this.getAvatars();
  all.avatar = null;
  all.words = this.lockWordsToUser(this.getNewWords(), all.user);

  return all;
};

db.makeAIUser = function(name, room){
  var all = this.getAll();
  all.currentRoom = room;
  all.name = name;



}

db.getCurrentWords = function(user){
  var words = this.allUserData[user].currentWords;
  if(!words){
    this.allUserData[user].currentWords = this.getNewWords(user);
  }
}

db.getRandomRoom = function(data){
  var str = "ThimbleRoom" + + Math.random() * 10000000000 / (+new Date());
  db.allUserData[str] = {};
  if(!ADDAI) return str;
  for(var i = 0; i < 20; i++){
    var fakeUser = this.makeAIUser("AI" + i, str);
    db.allUserData[str][fakeUser.name];
  }
  return str;
}

db.getNameFragments = function(){
  //TODO hacked hardwired
  return [[1,"fra"], [2,"moon"], [3,"happy"], [4,'feet'], [5,'gruun'], [6,"anda"], [7,"pink"], [8,"ra"], [9,"fim"], [10,"lim"],[11,"lim"]];
}

db.getRandomUsername = function(){
  var str = "ThimblePerson" + Math.random() * 10000000000 / (+new Date());
  db.allUserData["create"][str] = {name: str, currentWords:[]};
  return str;
}

db.getRandomContent = function(){
  var index = Math.floor(Math.random() * 3);
  var changeTHIs = 8;
  var content = [
                  [1,"http://www.bet.com/shows/lets-stay-together/photos/top-childrens-books/_jcr_content/leftcol/flipbook/flipbookimage.flipfeature.dimg/0311-shows-lets-stay-110-wildthings.jpg","img"],
                  [2, "https://www.youtube.com/embed/PwZnCkoX5gI?rel=0&amp;controls=0&amp;showinfo=0", "video"],
                  [3, "http://pauls-pizza.com/wp-content/uploads/2014/10/panpizza.png", "img"]
                  ]

  return content[index];
}

db.getAvatars = function(){
  if(false){
      return [[1,"http://cliparts.co/cliparts/pi5/ooz/pi5oozEMT.png"],[2,"http://img.photobucket.com/albums/v289/jackboots/mecha/silhouette.png"], [3,""]];
  }else{
      return [[1,"http://upload.wikimedia.org/wikipedia/en/c/c6/Nelson_Muntz.PNG"],
      [2,"http://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png"],
      [3,"https://s-media-cache-ak0.pinimg.com/originals/62/9a/78/629a78e8d3b2e21a6611ff4ad06abd53.jpg"],
      [4,"http://upload.wikimedia.org/wikipedia/en/archive/c/c7/20120908140647!Meg_Griffin.png"],
      [5,"http://cartoon-characters.com/wp-content/uploads/2014/04/Susie-Carmichael.png"]
      ];
  }
}

db.getRandomAvatar = function(){

}


module.exports = db;
