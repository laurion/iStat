
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	window.domain = getDomain(tab.url);
    window.shortDomain = getDomain(tab.url, "noSubOrWwwDomain");
    window.subDomain = getDomain(tab.url, "noWwwDomain");
	var req2 = new XMLHttpRequest();
		req2.open(
		    "GET",
		    "http://localhost:8000/api/send-page" +
		        "?url=" +
		        tab.url +
				"&title=" +
				tab.title,
		    true);
		// req2.onload = function(){
	//	window.urlArray = req.responseXML.getElementsByTagName("url_list");
	//};
		req2.send(null);
		
	
	
	
    //chrome.browserAction.setTitle({'title': tooltip, 'tabId': tab.id})
});