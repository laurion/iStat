// All TabStats methods.
iStat = {};

function initialize() {
    chrome.tabs.onUpdated.addListener(iStat.onTabUpdate);//try onCreated 
}

iStat.onTabUpdate = function(tabId, changeInfo, tab){
	
	if ( changeInfo.status == "complete" ) {
	  //TODO ignore all chrome://*
		if(tab.url == "chrome://newtab/")
			return;
		var req2 = new XMLHttpRequest();
			req2.open(
			    "GET",
			    "http://localhost:8000/api/send-page" +
			      "?url=" +
			        tab.url +
					  "&title=" +
				      tab.title,
			    true);
		req2.onreadystatechange=function() {
			if (req2.readyState==4){
				if(req2.status!=404){
					var obj = jQuery.parseJSON(req2.responseText);
				}
			}
		}
		req2.send(null);
	}

}

window.addEventListener('load', initialize, false);