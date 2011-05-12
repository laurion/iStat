/**
    @name getDomain
    @description Gets absolute domain from long url
*/
function getDomain (url) {
   return url.match(/:\/\/(www\.)?(.[^/:]+)/)[2];
} // End getDomain


/**
    @name makeRequest
    @description Makes the request
*/
function makeRequest (url, params, getVisited) {
  var http = new XMLHttpRequest();
  http.open("GET", url + "?" + params, true);
  Firebug.Console.log(url);
  Firebug.Console.log(params);
  http.onreadystatechange = function() {
    Firebug.Console.log(http.readyState);
    Firebug.Console.log(http.status);
  	if(http.readyState == 4 && http.status == 200) {
  	    var response = http.responseText;
  	    if (getVisited) {
    	    populate_popup(response);
  	    }	    
  	}
  }
  http.send(null);
} // End makeRequest


function iStatSearch(event){
  var url = window.content.location.href;
  makeRequest(SEARCH_URL, "website=" + getDomain(url), true);
  //var panel = document.getElementById("search-panel");
  //panel.openPopup(null, "", event.clientX, event.clientY, false, false);
}


function iStatPageLoad(event) {
  if (event.originalTarget instanceof HTMLDocument) {
    var win = event.originalTarget.defaultView;
    var doc = event.originalTarget;
    if (win.frameElement) {
      return;
    }
    var title = doc.title;
    var url = doc.location.href;
    if (url == "about:blank") return;
    makeRequest(UPDATE_URL, "title=" + escape(title) + "&url=" + escape(url), false);
  }
}

// do not try to add a callback until the browser window has
// been initialised. We add a callback to the tabbed browser
// when the browser's window gets loaded.
window.addEventListener("load", function () {
  // Add a callback to be run every time a document loads.
  // note that this includes frames/iframes within the document
  gBrowser.addEventListener("load", iStatPageLoad, true);
}, false);





//window.addEventListener('load', function () { iStatLoad.init(); }, false);

/*var iStatLoad = {
  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
        appcontent.addEventListener("DOMContentLoaded", iStatLoad.onPageLoad, true);
  },

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget;
    var win = doc.defaultView;
    if (win.frameElement) return;

    var title = window.document.title;
    var url = window.content.location.href;
    if (url == "") return;
    
    Firebug.Console.log(title);
    Firebug.Console.log(url);
    makeRequest(UPDATE_URL, "title=" + title + "&url=" + url);
  }
}*/
