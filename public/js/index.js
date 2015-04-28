window.onload = function(){
  setupDivs();
  setTimeout(go, 0);
};

var hasSavedUserData = false;
var mainEnabled = false;
var userCreateEnabled = false;
var optionsEnabled = false;
var username = null;
var avatar = null;

var go = function(){
  if(hasSavedUserData){
    //start ready
    enableMain();
  }else{
    //no found user, so show user create
    enableUserCreate();
  }
};

var disableAll = function(){
  mainEnabled = false;
  userCreateEnabled = false;
};

var enableMain = function(){
  hideDiv(dimmer);
  hideDiv(createUser)
  mainEnabled = true;
  userCreateEnabled = false;
};

var enableUserCreate = function(){
  showDiv(createUser);
  showDiv(dimmer);
  mainEnabled = false;
  userCreateEnabled = true;
};

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
    updateCreateUser(data);
    setTimeout(function(){
      updateWords(data);
      updateUsers(data);
      updateContent(data);
      updateChat(data);
    },0);
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
var optionsButtonClicked = function(){
  console.log("OPT CLICK");
  if(optionsEnabled){
    optionsEnabled = false;
    hideDiv(options);
  }else{
    optionsEnabled = true;
    showDiv(options);
  }
}

var sendMessage = function(){
  console.log("SEND CLICK");
  //do local tests
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

  return {name: username, avatar: avatar};
}

var theMessage = function(){
  //the array of server numbers
  console.log("client composes numbers of message");
  return [10,11,12,13,14,15];

}

var completedUserCreation = function(){
  socket.emit("userUp", {selectedNameFragments: buildingName, user:{name:null}, avatar: selectedAvatar.avatar});
  enableMain();
}

var theWords = {};

//the message system



