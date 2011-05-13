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
    a.href = data[i].url;
    a.appendChild(document.createTextNode(data[i].title + " - " + data[i].views));//poate in loc de url, punem numele paginii
    a.addEventListener('click', onAnchorClick);
	
	popupDiv.appendChild(a);
	popupDiv.appendChild(br);
	
  }
}


function buildUrlList(divName,url_list) {
	
	
	//console.log(changeInfo.status);
	//if ( changeInfo.status == "complete" ) {
		
		
	//var tabUrl;
	chrome.tabs.getSelected(null, function(tab) {
    	window.tabUrl=tab.url;
    	//alert(tabUrl);
  	});
	alert(window.tabUrl);
  	
	//console.log(tabUrl);
	
	//console.log(tab.title);
  	var data = []; // empty array
	
	
  	var req = new XMLHttpRequest();
	req.open(
	    "GET",
	    "http://localhost:8000/api/most-visited" +
	        "?website='" +
	        escape(tabUrl) +
	        "'",
	    true);
	req.onreadystatechange=function() {
		if (req.readyState==4) {
			alert("status: " + req.status);
			if(req.status!=404){
				//alert(req.responseText);				
				//var rez = jsonParse(req.toString());
				var obj = jQuery.parseJSON(req.responseText);
			  	for (i = 0; i < obj.pages.length; i ++) {
			    	alert(obj.pages[i].long_url);
			    	if(obj.pages[i].long_url)
			    		alert("json parsing works");
			    	else
			    		alert("json parsing didn't work");
			    	data.push({ url: obj.pages[i].long_url, title: obj.pages[i].title, views: obj.pages[i].cached_views });
			  	}
				//alert(req.toString);
				//buildPopup(divName, rez);
				buildPopup(divName, data);
			}
		}
	}
	//req.onload = function(){
		//urlArray = req.responseXML.getElementsByTagName("url");
	//};
	req.send(null);
	

		//var myJson = '{ "pages": [ {"infoarena", "http://infoarena.ro/", 10 }, { "aaa", "http://bbb.com", 128 } ]';	//'{ "url" : "http://example.com/page/4", "title" : "Example page 4", "visited-counter" : 102, "url" : "http://secondurl.com/", "title" : "secondtitle", "visited-counter" : 555 }';	//}	{	“url” : “http://example.com/page/5”,	“title” : “Example page 5”,	“visited-counter” : 99	}	{	“url” : “http://example.com/page/1”,	“title” : “Example page 1”,	“visited-counter” : 21	}}';
		//var myJson = '{ "x": { "a": "Hello, World!", "b": "aaa" }, "y": [1, 2, 3] }'
		//alert(myJson.toJSONString());
		//t=jsonParse(myJson);
		//alert(t.x[a]);
		//var t = jQuery.parseJSON(myJson);
		//for (i =0;i<t.pages.length;i++)
		//alert(t.y);
		//alert(t.pages[0]);
		//alert(t.page2.title);
		//alert(t.url);  // alerts Hello, World!
		/*
		for (var k in t) {
		  // alerts x=Hello, World!  and  y=1,2,3
		  //alert(k + '=' + t[k]);
		  alert(k);
		  for(var l in t.k){
		  	alert(l+'='+t.k.l);
		  }
		}
		*/
	
	//urlArray = new Array();
	//urlArray[0]=tabUrl;
	//buildPopup(divName, urlArray);
}








