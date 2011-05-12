function populate_popup (response) {
  //Firebug.Console.log(document.getElementById("most-visited"));
  alert(response);
  var obj = jQuery.parseJSON(response);
  for (i = 0; i < obj.pages.length; i ++) {
    alert(obj.pages[i].long_url);
  }
//  alert(obj.pages);
}
