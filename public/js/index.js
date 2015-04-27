

socket = io();

  socket.on('userDown', function(data){
    updateUsers(data);
  });

  socket.on('chatDown', function(data){
    updateChat(data);
  });

  socket.on('contentDown', function(data){
    updateContent(data);
  });

  socket.on('wordsDown', function(data){
    updateWords(data);
  });

  socket.on('allDown', function(data){
    updateWords(data);
    updateUsers(data);
    updateContent(data);
    updateChat(data);
  });

  socket.on('startDown', function(data){
    socket.emit('startUp', {user:getUserData()});
  });



var updateChat = function(data){
  console.log("client updates Chat");
};

var updateUsers = function(data){
    console.log("client updates Users");


};

var updateContent = function(data){
    console.log("client updates Content");


};

var updateWords = function(data){
  console.log("client updates Words");
  //register worlds in theWords object
  //do someting that actually updates the div's text
}

var sendMessage = function(){
  console.log("client sends chat up");
  var message = theMessage();
  console.log("message = ", message);
  socket.emit('chatUp', {user:getUserData(),message: message} );
};

var sendUser = function(){
  socket.emit('userUp', getUserData());
};

var sendContent = function(){
  socket.emit('contentUp');
};

var getUserData = function(){
  return {name: "Joe", avatar: "giraffe"};
}


var theMessage = function(){
  //the array of server numbers
  console.log("client composes numbers of message");
  return [10,11,12,13,14,15];

}

var theWords = {};

//the message system



