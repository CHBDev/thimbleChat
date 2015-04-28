var nameFragments = {};
var nameSelection;
var avatarSelection;
var runningName;
var buildingName = [];
var avatarOptions = [];
var selectedAvatar;

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
    div.style.backgroundImage = "url(" + div.avatar[1] + ")";
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
    buildingName.push(div.frag[0]);
    if(buildingName.length > 2){
      enableCreateButton();
    }

  }else{
    div.selected = false;
    div.remove();
    div.classList.remove('selectedFrag');
    nameSelection.appendChild(div);
    for(var i = 0; i < buildingName.length; i++){
      if(buildingName[i][0] === div.frag[0]){
        buildingName.splice(i,1);
         if(buildingName.length <= 2){
            disableCreateButton();
         }
         break;
      }
    }
  }
};

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
  }else{
    //nothing
  }
}
