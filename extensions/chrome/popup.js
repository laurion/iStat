/**
 * @author laurion
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
	popupDiv.appendChild(document.createElement('br'));
	
  }
}
function process_tab(tab){
  var data = [];
  var req = new XMLHttpRequest();
  window.open("http://webeval.no-ip.org:8000/api/most-visited" +
      "?website=" +
        tab.url.split('#')[0] + "&html=true", "iStat","toolbar=no,status=no,left:80,width:900,height:900");
/*	req.open(
	    "GET",
	    "http://webeval.no-ip.org:8000/api/most-visited" +
	        "?website=" +
	          tab.url + "&html=true",
	    true);
	    
	req.onreadystatechange=function() {
		if (req.readyState==4) {
			if(req.status!=404){
			/*  console.log(req.responseText);
				var obj = jQuery.parseJSON(req.responseText);
				console.log(obj);
			  	for (i = 0; i < obj.pages.length; i ++) {
			    	data.push({ url: obj.pages[i].long_url, title: obj.pages[i].title, views: obj.pages[i].cached_views });
			  	}*/
				//buildPopup("url_div", data);
				
			//	document.innerHTML = req.responseText;
/*			}
		}
	}
	
	req.send(null);*/
}
function process_win(win){
  chrome.tabs.getSelected(win.id, process_tab);
}
function buildUrlList() {
	chrome.windows.getCurrent(process_win);
}








