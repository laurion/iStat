// All TabStats methods.
iStat = {};

function initialize() {
    chrome.tabs.onUpdated.addListener(iStat.onTabUpdate);//try onCreated 
	//alert('started');
    //var tabId,tab,changeInfo;
    //iStat.onTabUpdate(tabId,changeInfo,tab);

}

iStat.onTabUpdate = function(tabId, changeInfo, tab){
	
	if ( changeInfo.status == "complete" ) {
		//alert(tab.url);
		//alert(tab.title);
		//console.log(tab.url);
		//console.log(tab.title);
		var req2 = new XMLHttpRequest();
			req2.open(
			    "GET",
			    "http://localhost:8000/api/send-page" +
			        "?url='" +
			        tab.url +
					"'&title='" +
					tab.title
					+"'",
			    true);
		req2.onreadystatechange=function() {
			if (req2.readyState==4){
				//alert("status" + req2.status);
				if(req2.status!=404){
					
					//var rez = jsonParse(req2.toString());
					
				}
			}
		}
			req2.send(null);
	}

}

window.addEventListener('load', initialize, false);