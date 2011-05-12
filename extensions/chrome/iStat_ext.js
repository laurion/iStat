/**
 * @author laurion
 */

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	console.log(changeInfo.status);
	if ( changeInfo.status == "complete" ) {
		console.log(tab.url);
		//console.log(tab.title);
		
		
		var req = new XMLHttpRequest();
		req.open(
		    "GET",
		    "http://localhost:8000/api/most-visited" +
		        "?website=http://" +
		        tab.url,
		    true);
		//req.onload = function(){
			//window.urlArray = req.responseXML.getElementsByTagName("url");
		//};
		req.send(null);
	    //chrome.browserAction.setTitle({'title': tooltip, 'tabId': tab.id})	
	}
});
*/

// Event listner for clicks on links in a browser action popup.
// Open the link in a new tab of the current window.
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildPopup(divName, data) {
  var popupDiv = document.getElementById(divName);
  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('a');
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));//poate in loc de url, punem numele paginii
    a.addEventListener('click', onAnchorClick);
	
	popupDiv.appendChild(a);
	popupDiv.appendChild(br);
  }
}


function buildUrlList(divName,url_list) {  	
	buildPopup(divName, window.urlArray);
	console.log(changeInfo.status);
	if ( changeInfo.status == "complete" ) {
		console.log(tab.url);
		//console.log(tab.title);
  	
  	var req = new XMLHttpRequest();
		req.open(
		    "GET",
		    "http://localhost:8000/api/most-visited" +
		        "?website=http://" +
		        tab.url,
		    true);
		//req.onload = function(){
			//window.urlArray = req.responseXML.getElementsByTagName("url");
		//};
		req.send(null);
		}
}

