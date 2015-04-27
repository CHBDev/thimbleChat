window.thimble = tc = {};


tc.socket = io.connect();

tc.socket.on('userDown', function(data){
  tc.updateUsers(data);
});

tc.socket.on('chatDown', function(data)){
  tc.updateChat(data);
};

tc.socket.on('contentDown', function(data)){
  tc.updateContent(data);
};

tc.socket.on('wordsDown'), function(data){
  tc.updateWords(data);
}

tc.updateChat = function(data){

};

tc.updateUsers = function(data){

};

tc.updateContent = function(data){

};

tc.updateWords = function(data){
  //register worlds in theWords object
  //do someting that actually updates the div's text
}

tc.sendChat = function(){
  tc.socket.emit('chatUp', tc.theChatMessage());
};

tc.sendUser = function(){
  tc.socket.emit('userUp');
};

tc.sendContent = function(){
  tc.socket.emit('contentUp');
};


tc.theChatMessage = function(){
  //the array of server numbers

}

tc.theWords = {};

//the message system



