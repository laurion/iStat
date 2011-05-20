/**
    @name getDomain
    @description Gets absolute domain from long url
*/
function getDomain (url) {
   return url.match(/:\/\/(www\.)?(.[^/:]+)/)[2];
} // End getDomain

function populatePopup (response) {
  myWindow=window.open('','','width=200,height=100');
  myWindow.document.write("<p>This is 'myWindow'</p>");
  myWindow.focus();
  myWindow = window.open("", "","toolbar=no,status=no,left=80,width=900,height=500");
  myWindow.document.write("<p>This is 'myWindow'</p>");
  myWindow.focus();
}

/**
    @name makeRequest
    @description Makes the request
*/
function makeRequest (url, params, getVisited) {
  var http = new XMLHttpRequest();
  http.open("GET", url + "?" + params, true);
  http.onreadystatechange = function() {
  	if(http.readyState == 4 && http.status == 200) {
  	    var response = http.responseText;
  	    if (getVisited) {
    	    populatePopup(response);
  	    }	    
  	}
  }
  http.send(null);
} // End makeRequest


function iStatSearch(event){
  var url = window.content.location.href;
  myWindow = window.open(SEARCH_URL + "?website=" + url + "&html=true", "iStat", "toolbar=no,status=no,left=80,width=900,height=500");
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
    makeRequest(UPDATE_URL, "url=" + url + "&title=" + title, false);
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
