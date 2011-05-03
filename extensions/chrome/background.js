
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	window.domain = getDomain(tab.url);
    window.shortDomain = getDomain(tab.url, "noSubOrWwwDomain");
    window.subDomain = getDomain(tab.url, "noWwwDomain");
	var req = new XMLHttpRequest();
	req.open(
	    "GET",
	    "http://localhost:8000/api/send-url" +
	        "?url=" +
	        window.shortDomain +
	        "&title=" +
	        tab.title,
	    true);
	req.onload = function(){
		window.urlArray = req.responseXML.getElementsByTagName("url_list");
	};
	req.send(null);
	
	
   
    //document.getElementById("shortDomain").innerHTML = shortDomain + "<br />";
    //alert(window.shortDomain);
    //sendPOST(tab.url,shortDomain,document.title,(new Date).getTime())
    //chrome.browserAction.setTitle({'title': tooltip, 'tabId': tab.id})
    //if (domain!=tab.url && shortDomain!=subDomain)
    //    tooltip = tooltip + "\n" + "SubDomain Rank: " + getPageRank(subDomain);
    //if (domain!=tab.url || shortDomain!=subDomain)
    //    tooltip = tooltip + "\n" + "Site Rank: " + getPageRank(shortDomain);
    //chrome.browserAction.setTitle({'title': tooltip, 'tabId': tab.id})
});
