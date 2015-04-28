var db = {};
var ADDAI = true;

db.allUserData = {};

db.allContent = {};

db.allRooms = {'lobby':{ users: {} } };

db.allWords = [0,1,2,3,4,5,6,7,8,9,[10, 'some'],[11, 'kind'],[12, 'of'],[13, 'giraffe'],[14, 'words'],[15, 'here'], 16,17,18,19,20];

db.newUser = function(data){
  console.log("DATA from newUser ", data);
  var tempName = data.tempName;
  var fragArray = data.selectedNameFragments;
  var avatar = data.avatar;
  console.log("TEMPNAME ", tempName);
  var originalEntry = db.allUserData[tempName];
  db.allUserData[tempName] = undefined;
  var nameStr = "";

  for(var i = 0 ; i < fragArray.length; i++){
    nameStr+=fragArray[i][1];
  }

  originalEntry.name = nameStr;

  originalEntry.avatar = avatar;
  db.allUserData[originalEntry.name] = originalEntry;

  this.setUserInRoom(originalEntry.name, "lobby");

  return originalEntry;
  //testFragArray

  //testname against original temp entry

  //check updated data,
  //then set it to user profile
};

db.getNewWords = function(name){
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
  return true;
  var message = data.message;
  var words = db.allUserData[data.user.name].currentWords;
  var messageIsGood = true;
  for(var i = 0; i < message.length; i++){
    if(words[message[i]] !== true){
      messageIsGood = false;
    }break;
  }

return messageIsGood;
  //make sure user has access to those word numbers
};


db.getAll = function(){
  var all = {};
  all.name = this.getTempUsername();
  all.currentRoom = "lobby";

  all.messages = this.allMessages;
  all.content = this.getRandomContent();
  all.nameFragments = this.getNameFragments();
  all.avatarOptions = this.getAvatars();
  all.avatar = null;
   db.allUserData[all.name] = {name: all.name, currentWords: [], nameFragments: all.nameFragments, currentRoom: all.currentRoom, avatar: all.avatar, avatarOptions: all.avatarOptions};

  all.words = this.lockWordsToUser(this.getNewWords(), all.name);
  all.availableRooms = this.getAvailableRooms(all.name)


     if(ADDAI){
      for(var i = 0; i < 20; i++){
        this.makeAIUser("AI" + i, all.currentRoom);
      }
     }

     all.users = this.allRooms['lobby'].users;



  return all;
};

db.getAvailableRooms = function(){
  return this.allRooms;
}

db.setUserInRoom = function(user){
  //db.allRooms["lobby"].users[user.name] = undefined;

  db.allRooms["lobby"].users[user.name] = true;
}

db.makeAIUser = function(name, room){
  var user = {};
  user.name = name;
  user.currentRoom = room;
  user.avatar = this.getRandomAvatar();
    this.allUserData[user.name] = user;

  this.setUserInRoom(user.name, room);

}

db.getCurrentWords = function(name){
  var words = this.allUserData[name].currentWords;
  if(!words){
    this.allUserData[name].currentWords = this.getNewWords(name);
  }
}

db.getRandomRoom = function(data){
  var str = "ThimbleRoom" + + Math.random() * 10000000000 / (+new Date());
  db.allRooms[str] = {users:[]};
  return str;
}

db.getNameFragments = function(){
  //TODO hacked hardwired
  return [[1,"fra"], [2,"moon"], [3,"happy"], [4,'feet'], [5,'gruun'], [6,"anda"], [7,"pink"], [8,"ra"], [9,"fim"], [10,"lim"],[11,"lim"]];
}

db.getTempUsername = function(){
  var str = "ThimblePerson" + Math.random() * 11111111111;
  while(db.allUserData[str]){
    str = "ThimblePerson" + Math.random() * 11111111111;
  }
  return str;
}

db.getRandomContent = function(){
  var index = Math.floor(Math.random() * 3);
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
  var list = this.getAvatars();
  return list[Math.floor(Math.random() * list.length)];
}


module.exports = db;
