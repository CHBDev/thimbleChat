var pixelScale = 1;
var mainDiv;
var leftColumn;
var rightColumn;
var centerColumn;
var wordBox;
var sendButton;
var topBar;
var content;
var avatars;
var extraBubbles;
var createUser;
var options;
var dimmer;
var optionsButton;
var userImage;
var buildingMessage;

var bigDivs = [];

var roundCorners = function(div, px){
    px = px || 5;
    div.style.borderRadius = pixelString(px);
}

var giveBorder = function(div, px, color){
  px = px || 2;
  div.style.border = pixelString(px) + " solid white";
}

var pixelString = function(val){
  return "" + val + "px";
}

var percentString = function(val){
  return "" + val + "%";
}

var sizeDiv = function(div, w, h){
  div.style.width = pixelString(w);
  div.style.height = pixelString(h);

}
var positionTopLeft = function(div, x, y){
  div.style.transformOrigin = "left top";
  setTranslateString(div,x,y);
  divDoTransform(div);
};

var setTranslateString = function(div, x, y){
  div.translateString = "translate(" + pixelString(x * pixelScale) + " , " + pixelString(y * pixelScale) + ")";
}

var divDoTransform = function(div){
  div.scaleString = div.scaleString || "";
   div.rotateString = div.rotateString || "";
    div.translateString = div.translateString || "";
  div.style.transform = div.translateString + " " + div.scaleString + " " + div.rotateString;
}


var sizeDivPercent = function(div, w, h){
  div.style.width = percentString(w);
  div.style.height = percentString(h);
}

var rgbaString = function(r,g,b,a){
  a = a || 1.0;
  return "rgba(" + r + "," + g + "," + b +"," + a +")";
};

var setBackgroundColor = function(div, r, g, b, a){
  var str = rgbaString(r,g,b,a);
  console.log(str);
  div.style.backgroundColor = str;
}

var setFontColor = function(div, r, g, b, a){
  div.style.color = rgbaString(r,g,b,a);
}

var scaleMainDiv = function(){

  var winX = window.innerWidth;
  var winY = window.innerHeight;
  var scaleX = winX / 1920;
  var scaleY = winY / 1080;


  pixelScale = Math.min(scaleX, scaleY);
  mainDiv.style.transformOrigin = "left top";

  mainDiv.style.transform = "scale(" + pixelScale + ")";
  mainDiv.scaleString = "scale(" + pixelScale + ")"

}

var hideDiv = function(div){
  div.style.display = "none";
}

var showDiv = function(div){
  div.style.display = "block";
}

var setupDivs = function(){

  mainDiv = document.getElementById('mainDiv');
  leftColumn = document.getElementById('leftColumn');
  rightColumn = document.getElementById('rightColumn');
  centerColumn = document.getElementById('centerColumn');
  wordBox = document.getElementById('wordBox');
  topBar = document.getElementById('topBar');
   content = document.getElementById('content');
    avatars = document.getElementById('avatars');
   extraBubbles = document.getElementById('extraBubbles');
   createUser  = document.getElementById('createUser');
   options  = document.getElementById('options');
   dimmer = document.getElementById('dimmer');
   optionsButton  = document.getElementById('optionsButton');
   sendButton = document.getElementById('sendButton');
   userImage = document.getElementById('userImage');
   buildingMessage = document.getElementById('buildingMessage');

   bigDivs = [mainDiv,leftColumn,rightColumn,centerColumn,wordBox,
               topBar,content,avatars ,extraBubbles,createUser, options, dimmer, optionsButton, sendButton, userImage, buildingMessage ];

    bigDivs.forEach(function(div){
      div.style.position = "absolute";
      setBackgroundColor(div, 50,200,50,.5);
      roundCorners(div);
      giveBorder(div);
    })

    setBackgroundColor(dimmer, 0,0,0,.5);

    hideDiv(options);
    hideDiv(createUser);



   mainDiv.style.zIndex = "0";
    leftColumn.style.zIndex = "10";
     rightColumn.style.zIndex = "10";
      centerColumn.style.zIndex = "9";
       wordBox.style.zIndex = "71";
         topBar.style.zIndex = "97";
         content.style.zIndex = "30";
     avatars.style.zIndex = "20";
     extraBubbles.style.zIndex = "21";
     dimmer.style.zIndex = "98"
     createUser.style.zIndex = "99";
     options.style.zIndex = "100";
     optionsButton.style.zIndex = "101";
     sendButton.style.zIndex = "72";
     userImage.style.zIndex = "71";
     buildingMessage.style.zIndex = "71";

     var dX = 1920;
     var dY = 1080;

     var wordBoxSize = {x:400,y:400};
     var contentSize = {x:853,y:480};
     var avatarSize = {x:dX, y:dY};
     var createUserSize = {x:1280,y:720};
     var leftColumnSize = {x:60,y:dY};
     var topBarSize = {x:dX,y:60};
     var optionsSize = {x:400,y:680};
     var optionsButtonSize = {x:60,y:60};
     var userImageSize = {x:256,y:256};
     var buildingMessageSize = {x: dX-wordBoxSize.x-userImageSize.x,y: 80};
     var sendButtonSize = {x: 128, y:64};


  sizeDiv(mainDiv, dX,dY);
  sizeDiv(topBar, topBarSize.x, topBarSize.y);
   sizeDiv(leftColumn, leftColumnSize.x, leftColumnSize.y);
   sizeDiv(centerColumn, dX, dY);
   sizeDiv(wordBox, wordBoxSize.x, wordBoxSize.y);
     sizeDiv(content, contentSize.x, contentSize.y);
     sizeDiv(avatars, avatarSize.x, avatarSize.y);
     sizeDiv(extraBubbles, dX, dY);
     sizeDiv(createUser, createUserSize.x, createUserSize.y);
    sizeDiv(options, optionsSize.x, optionsSize.y);
    sizeDiv(dimmer, dX,dY);
    sizeDiv(optionsButton,optionsButtonSize.x, optionsButtonSize.y);
    sizeDiv(userImage, userImageSize.x, userImageSize.y);
    sizeDiv(buildingMessage, buildingMessageSize.x, buildingMessageSize.y);
    sizeDiv(sendButton, sendButtonSize.x, sendButtonSize.y);


     positionTopLeft(mainDiv,0,0);
     positionTopLeft(dimmer,0,0);

      positionTopLeft(topBar,0,0);
      positionTopLeft(leftColumn,0,0);
      positionTopLeft(centerColumn,0,0);
      positionTopLeft(wordBox,dX - wordBoxSize.x,dY-wordBoxSize.y);
        positionTopLeft(content,(dX-contentSize.x)/2,(dY-contentSize.y)/2);
        positionTopLeft(avatars,0,0);
        positionTopLeft(extraBubbles,0,0);
        positionTopLeft(createUser,(dX-createUserSize.x)/2,(dY-createUserSize.y)/2);
        positionTopLeft(options,dX-optionsSize.x,0);
        positionTopLeft(optionsButton, dX-optionsButtonSize.x, 0);
        positionTopLeft(userImage, 0, dY-userImageSize.y);
        positionTopLeft(buildingMessage, userImageSize.x, dY-buildingMessageSize.y);
        positionTopLeft(sendButton, dX-wordBoxSize.x-sendButtonSize.x, dY-sendButtonSize.y);

         scaleMainDiv();




}
