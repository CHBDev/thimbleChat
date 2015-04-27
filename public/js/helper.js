var roundCorners = function(div, px){
    div.style.borderRadius = pixelString(px);
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

var sizeDivPercent = function(div, w, h){
  div.style.width = percentString(w);
  div.style.height = percentString(h);
}

var rgbaString = function(r,g,b,a){
  a = a || 1;
  return "rgba(" + r + "," + g + "," + b +")";
};

var setBackgroundColor = function(div, r, g, b, a){
  div.style.backgroundColor = rgbaString(r,g,b,a);
}

var setFontColor = function(div, r, g, b, a){
  div.style.color = rgbaString(r,g,b,a);
}
