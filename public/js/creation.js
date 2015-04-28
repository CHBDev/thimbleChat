var nameFragments = {};
var nameSelection;
var avatarSelection;
var runningName;
var buildingName = [];
var avatarOptions = [];
var selectedAvatar;
var runningMessage = [];
var avatarsOnScreen = {};

var updateCreateUser = function(data){

  username = data.user;
  avatar = data.avatar;

  disableCreateButton();

  avatarOptions = data.avatarOptions;
  avatarSelection = avatarSelection || document.getElementById('avatarSelection');
  for(var i = 0; i < avatarOptions.length; i++){
    var div = document.createElement('div');
    div.classList.add('avatarOption');
    div.avatar = avatarOptions[i];
    div.style.backgroundImage = urlString( div.avatar[1]);
    avatarSelection.appendChild(div);
    setupAvatarDiv(div);
      if(i===Math.floor(avatarOptions.length/2)){
       makeSelected(div);
      }
  }


  nameFragments = data.nameFragments;
   nameSelection = nameSelection || document.getElementById('nameSelection');
   runningName = runningName || document.getElementById('runningName');
  for(var i = 0; i < nameFragments.length; i++){
    var div = document.createElement('div');
    div.classList.add('nameFragment');
    nameSelection.appendChild(div);
    div.frag = nameFragments[i];
    setupNameFragDiv(div);

  }

};

var setupAvatarDiv = function(div){
  div.onclick = avatarClicked;
}

var setupNameFragDiv = function(div){
  div.innerHTML = div.frag[1];
  div.onclick = nameFragClicked;
  div.selected = false;
}

var avatarClicked = function(e){
  var div = e.srcElement;
  makeSelected(div);
}

var makeSelected = function(div){
  if(selectedAvatar){
    selectedAvatar.classList.remove('selected');
  }
  div.classList.add('selected')
  selectedAvatar = div;
}

var nameFragClicked = function(e){
  var div = e.srcElement;
  if(div.selected === false){
    div.selected = true;
    div.remove();
    div.classList.add('selectedFrag');
    runningName.appendChild(div);
    buildingName.push(div.frag);
    if(buildingName.length > 2){
      enableCreateButton();
    }

  }else{
    div.selected = false;
    div.remove();
    div.classList.remove('selectedFrag');
    nameSelection.appendChild(div);
    for(var i = 0; i < buildingName.length; i++){
      if(buildingName.length > 0 && buildingName[i][0] === div.frag[0]){
        buildingName.splice(i,1);
         if(buildingName.length <= 2){
            disableCreateButton();
         }
         break;
      }
    }
  }
};

var urlString = function(str){
  return "url(" + str + ")";
}

var enableCreateButton = function(){
  document.getElementById('createUserConfirm').classList.remove('disabled');

}

var disableCreateButton = function(){
  document.getElementById('createUserConfirm').classList.add('disabled');
}


var createUserButtonClicked = function(e){

  console.log("CREATE CLICK");
  if(buildingName.length > 2){
    completedUserCreation();
    userImage.style.backgroundImage = urlString(selectedAvatar.avatar[1]);

  }else{
    //nothing
  }
}

var addWords = function(data){
  var words = data.words;

  for(var i = 0; i < words.length; i++){
    var div = document.createElement('div');
    div.classList.add('wordButton');
    div.word = words[i];
    div.innerHTML =  div.word[1];
    div.onclick = wordButtonClicked;
    div.selected = false;
    wordBox.appendChild(div);
  }

}

var wordButtonClicked = function(e){

  var div = e.srcElement;
  if(div.selected === false){
    div.selected = true;
    div.remove();
    div.classList.add('selectedWord');
    buildingMessage.appendChild(div);
    runningMessage.push(div.word);
    if(buildingName.length > 0){
      enableSendButton();
    }

  }else{
    div.selected = false;
    div.remove();
    div.classList.remove('selectedWord');
    wordBox.appendChild(div);
    for(var i = 0; i < runningMessage.length; i++){
      if(runningMessage.length > 0 && runningMessage[i][0] === div.word[0]){
        runningMessage.splice(i,1);
         if(runningMessage.length < 1){
            disableSendButton();
         }
         break;
      }
    }
  }
};

var enableSendButton = function(){
  sendButton.classList.remove('disabled');

}

var disableSendButton = function(){
  sendButton.classList.add('disabled');
}

var doBubble = function(words, avatarDiv){
  var str = "";
  for(var i = 0; i < words.length; i++){
    str + words[i] + " ";
  }

  str[str.length - 1] = ".";

  avatarDiv.textBox.innerHTML = str;


}

var createAvatar = function(data){

  var avatar = document.createElement('div');
  avatar.style.backgroundImage = urlString(data.user.avatar);
  avatar.classList.add('avatar');
  avatar.user = data.user;


  var div = document.createElement('div');
  div.classList.add('bubbleDiv');
  var p = document.createElement('p');
  div.appendChild(p);
  p.classList.add('textBox');

  avatar.textBox = p;
  avatar.bubble = div;
  avatar.appendChild(div);
  avatarsOnScreen[avatar.user.name] = data;
  avatars.appendChild(avatar);
  //TODO hack, randomly placing them.
  avatar.style.left = Math.random() * dX;
  avatar.style.top = Math.random() * dY;


  return avatar;
}











