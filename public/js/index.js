window.onload = function(){
  setupDivs();
  setTimeout(go, 0);
};

var hasSavedUserData = false;
var mainEnabled = false;
var userCreateEnabled = false;
var optionsEnabled = false;
var largeContent = {x:1280, y: 720};
var mediumContent = {x: 853, y: 480};
var localUser = {name:null,avatar:null, tempName:null, currentWords:[]};

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
    localUser.name = data.name;
    localUser.tempName = null;
    localUser.avatar = data.avatar;
  });

  socket.on('showNewUsers', function(users){

    updateUsers(users);
  });

  socket.on('chatDown', function(messages){
    updateChat(messages);
  });

  socket.on('contentDown', function(data){
    updateContent(data);
  });

  socket.on('wordsDown', function(data){
    updateWords(data);
  });

  socket.on('allDown', function(data){
    if(!localUser.name){
      localUser.name = data.name;
      localUser.tempName = data.name;
    }
    updateCreateUser(data);
    setTimeout(function(){
      updateWords(data);
      updateContent(data);

    },0);
  });

  socket.on('startDown', function(data){
    socket.emit('startUp', localUser);
  });


var updateChat = function(messages){
  console.log("client updates Chat");
  for(var i = 0; i < messages.length; i++){
    var message = messages[i];
    doBubble(message);
  }
};

var updateUsers = function(users){
  console.log(users);
    console.log("client updates Users");
    for(var key in users){
      if(!users[key] || avatarsOnScreen[users[key].name]) continue;
      createAvatar(users[key]);
    }

};

var updateContent = function(data){
    console.log("client updates Content");
    var data = data.content;
    if(data[2] == "img"){
      content.innerHTML = "";
      content.style.backgroundImage = urlString(data[1]);

    }else if(data[2] === 'video'){
      var str = "<iframe id='movie' width='853' height='480' src=" + data[1] + " frameborder='0'></iframe>";
      content.style.backgroundImage = "";
      content.innerHTML = str;
      //content.innerHTML = data[1];
      //content.innerHTML = str;
    }
};

var updateWords = function(data){
  console.log("client updates Words");
  addWords(data);
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

  buildingMessage.innerHTML = ""
  //do local tests
  var message = theMessage();
  console.log("message = ", message);
  socket.emit('chatUp', {user:localUser,message: message} );
};


var sendContent = function(){
  socket.emit('contentUp');
};

var theMessage = function(){
  //the array of server numbers
  console.log("client composes numbers of message");
  return [10,11,12,13,14,15];

}

var completedUserCreation = function(){
  socket.emit("newUser", {tempName: localUser.tempName, selectedNameFragments: buildingName, avatar: selectedAvatar.avatar});
  enableMain();
}

var theWords = {};

//the message system



