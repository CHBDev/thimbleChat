var avatarSlotsPrimary = {
  1:{user:null,x:50,y:1,scale:1},
  2:{user:null,x:60,y:4,scale:1.1},
  3:{user:null,x:70,y:0,scale:1},
  4:{user:null,x:40,y:2,scale:1.05},
  5:{user:null,x:30,y:0,scale:.95},
  6:{user:null,x:20,y:50,scale: 1},
  7:{user:null,x:80,y:50,scale: 1},
  8:{user:null,x:25,y:60,scale: .95},
  9:{user:null,x:75,y:60,scale: 1.05},
  10:{user:null,x:30,y:25,scale: 1.05}
};

var assignAvatarToSlot = function(div){
  for(var key in avatarSlotsPrimary){
    var slot = avatarSlotsPrimary[key];
    if(slot.user === null){
      slot.user = div.user;
       avatarsOnScreen[div.user.name] = div.user.name;
        positionAvatar(div,slot.x, slot.y, slot.scale);
        slot.user = div.user;
        slot.user.avatarDiv = div;
        break;
    }
  }
};

var positionAvatar = function(div,x,y,scale){
  mainDiv.appendChild(div);
  // x*=pixelScale;
  // y*=pixelScale;
  x = dX * x/100 - 128;
  y = dY * (100-y)/100 - 256;
  div.style.left = pixelString(x);
  div.style.top = pixelString(y);
  //div.style.transform = "translate(" + pixelString(x/100 * dX )+ ", " + pixelString((100-y)/100 * dY) + ")";
};


var doBubble = function(message){
  var slot = null;

  var name = message.name;
  var words = message.words;

  for(var key in avatarSlotsPrimary){
    if (avatarSlotsPrimary[key].user.name === name);
    slot = avatarSlotsPrimary[key];
  }

  if(!slot && name !== localUser.name) return;
  if(localUser.name === name){
     slot.user ={};
    slot.user.avatarDiv = userImage;
  }


  var str = "";
  for(var i = 0; i < words.length; i++){
    str + words[i] + " ";
  }

  str[str.length - 1] = ".";

  slot.user.avatarDiv.textBox.innerHTML = str;
  slot.user.avatarDiv.bubble.style.display = "block";


}



