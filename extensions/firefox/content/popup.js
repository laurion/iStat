/*
function populate_popup (response) {
//  var container = $("#iStatMostVisited");
  var panel = document.getElementById("iStatSearchContent");
  var obj = jQuery.parseJSON(response);
  alert(response);
  Firebug.Console.log("length:" + obj.pages.length);
  for (i = 0; i < obj.pages.length; i ++) {
    Firebug.Console.log(obj.pages[i].title);
    var title = obj.pages[i].title;
    Firebug.Console.log('ceva');
    var _div = document.createElement('div');
    _div.id = "page";
    var _text = document.createTextNode(title);
    _div.appendChild(_text);
    panel.appendChild(_div);
  }
//  alert(obj.pages);
}*/
