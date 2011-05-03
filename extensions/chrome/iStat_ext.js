/**
 * @author laurion
 */


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	/*
	var shortDomain=getDomain(tab.url,"noSubOrWwwDomain");
	var req = new XMLHttpRequest();
	req.open(
	    "GET",
	    "http://localhost:8000/api/get-list" +
	    "?url=" +
	    shortDomain,
	    true);
	req.onload = function(){
		urlArray = req.responseXML.getElementsByTagName("url_list");
	};
	req.send(null);
	*/
	
    domain = getDomain(tab.url);
    shortDomain = getDomain(tab.url, "noSubOrWwwDomain");
    subDomain = getDomain(tab.url, "noWwwDomain");
    alert(window.shortDomain);
    //chrome.browserAction.setTitle({'title': tooltip, 'tabId': tab.id})
});


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

  //var ul = document.createElement('ul');
  //popupDiv.appendChild(ul);
	alert(data);
	alert(data.length);
  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('a');
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));//poate in loc de url, punem numele paginii
    a.addEventListener('click', onAnchorClick);

    //var li = document.createElement('li');
    //li.appendChild(a);
	popupDiv.appendChild(a);
	popupDiv.appendChild(br);
    //ul.appendChild(li);
  }
}


function buildUrlList(divName,url_list) {
  	
  	//var microsecunde = 1000 * 60 * 60 * 2;
  	//var twoHoursAgo = (new Date).getTime() - microsecunde;
  	
	//var shortDomain = getDomain(tab.url, "noSubOrWwwDomain");
	   
    
  	
	buildPopup(divName, window.urlArray);
  
}

