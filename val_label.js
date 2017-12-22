// <![CDATA[
home_page = 'http://caprt3a.blogspot.co.id/';
max_rc_posts = 6;
function showentry(json){
  var maxp = (max_rc_posts <= json.feed.entry.length) ? max_rc_posts : json.feed.entry.length;
  var text = "<ul>";
  for (var i = 0; i < maxp; i++) {
    var entry = json.feed.entry[i];
    var posttitle = entry.title.$t;
    var posturl;
    if (i == json.feed.entry.length) break;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        posturl = entry.link[k].href;
        break;
      }
    }
    text += "<li><a href='"+posturl+"'>" + posttitle + "</a></li>";
  }
  text += "</ul>";
  document.getElementById("showItemLabel").innerHTML = text;
}
function showPostLabel(sPL_label,e){
   var isDOM  = (navigator.appName.match("Microsoft Internet Explorer") || navigator.appName.match("MSIE")) ? false : true;
   var check = document.getElementById("showItemLabel");
   if(check) {
     if(!isDOM) { check.removeNode(true); }
    else {check.parentNode.removeChild(check);}
   }
   var elm;
   if(e.target) elm = e.target;
   	else elm = window.event.srcElement;
   var div = document.createElement('div');
   div.innerHTML = "";
   div.id = "showItemLabel";
   if(!isDOM) { elm.insertAdjacentElement('afterEnd', div); } else { elm.parentNode.insertBefore(div, this.nextSibling); }
	var elm2 = document.getElementById("showItemLabel");
	elm2.style.display = "inline";
	elm2.innerHTML = "<br/><img alt='Indicator' src='http://2.bp.blogspot.com/-rYDNUOcB8_w/Wj05yItOlFI/AAAAAAAANPo/wwKT9IaIaTcd-Os_7Cc9uiUwgvMoCHHOwCLcBGAs/s1600/Loading-2-1.gif'/>&nbsp;&nbsp;Loading...";
	var script = document.createElement('script');
	script.src = home_page+"feeds/posts/summary/-/"+sPL_label.replace(/ /g,"%20")+"?start-index=1&max-results="+max_rc_posts+1+"&alt=json-in-script&callback=showentry";
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);
}
// ]]>