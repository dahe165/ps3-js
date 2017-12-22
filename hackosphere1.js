
// This file is part of the Neo template. As I spent quite some time developing
// this code, please give proper credits to Hackosphere if you are going to
// re-use the code.
// - Ramani@hackosphere

// Implementasi:
// <div id='LabelDisplay'>
// <div id='LabelTitle'>
// </div>
// <div class='widget-content' id='LabelPosts'>
// <script language='javascript'>fetchLatestPosts('url', 'label');</script>
// </div>
// </div>

var postTitle = new Array();
var postContent = new Array();
var postId = new Array();
var postDate = new Array();
var postPermalink = new Array();
var commentAuthor = new Array();
var commentContent = new Array();
var commentDate = new Array();
var blogid, blogurl, totalComments;
var monthnames = new Array();
var startIndex = 1;
var oldestFirstOrder = 0;
var numPosts = 8;

function dateString(rawdate, needYear) {
   monthnames[1] = "January";
   monthnames[2] = "February";
   monthnames[3] = "March";
   monthnames[4] = "April";
   monthnames[5] = "May";
   monthnames[6] = "June";
   monthnames[7] = "July";
   monthnames[8] = "August";
   monthnames[9] = "September";
   monthnames[10] = "October";
   monthnames[11] = "November";
   monthnames[12] = "December";
   var year = rawdate.substring(0,4);
   var month = rawdate.substring(5,7);
   var day = rawdate.substring(8,10);
   str = monthnames[parseInt(month,10)] + ' ' + day;
   if (needYear) str = str + ', ' + year;
   return (str);
}

function updateLabelPosts(json) {
  feedid = json.feed.id.$t;
  start = feedid.indexOf('blog-');
  blogid = feedid.substr(start+5);

  for (var k = 0; k < json.feed.link.length; k++) {
      if (json.feed.link[k].rel == 'alternate') {
        alturl = json.feed.link[k].href;
        break;
      }
  }
  index = alturl.lastIndexOf('/');
  var label = alturl.substr(index+1);
  label = decodeURIComponent(label);

  var labelposts = document.getElementById("LabelPosts");
  var labeltitle = document.getElementById("LabelTitle");

  if (label == "") {
    labeltitle.innerHTML = '<left><h2>Recent Posts</h2></left><hr/>';
  } else {
    labeltitle.innerHTML = '<h2> ' + label + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="' + blogurl + 'feeds/posts/default/-/' + label + '"><img style="border: 0pt none;" src="http://2d0ec971-a-62cb3a1a-s-sites.googlegroups.com/site/archivesiugi/juniakhir/feed-icon.png"/></a><hr/>' + '</h2>';
 
  }
  var disp = '';

  for (var i = 0; i < json.feed.entry.length; i++) {
    var entry = json.feed.entry[i];
    var selfurl;
    postTitle[i] = entry.title.$t;
    postContent[i] = entry.content.$t;
    postDate[i] = entry.published.$t.substring(0,10);
    entryid = entry.id.$t;
    start = entryid.indexOf('post-');
    postId[i] = entryid.substr(start+5);

    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        postPermalink[i] = entry.link[k].href;
        break;
      }
    }

    disp = disp + '<a href="javascript:updatePost(' + i + ');">' + entry.title.$t + '</a><br/>';
  }
  if (label == "index.html") label = "";
  disp = disp + '<p class="navLinks">';
  if (startIndex != 1) {
    disp = disp + '<a href="javascript:fetchNewerPosts(\'' + label + '\');">&#9668;&nbsp;Next</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  }

  if (json.feed.entry.length == numPosts) {
    disp = disp + '<a href="javascript:fetchOlderPosts(\'' + label + '\');">Prev&nbsp;&#9658</a>';
  }
  disp = disp + '</p>';
  labelposts.innerHTML = disp;
}

function updatePost(index) {
   var datediv = document.getElementById("PostDate");
   var titlediv = document.getElementById("PostTitle");
   var contentdiv = document.getElementById("PostContent");
   var editdiv = document.getElementById("PostEditLink");
   var commentdiv = document.getElementById("PostCommentLink");

   datediv.innerHTML = dateString(postDate[index], 1);
   titlediv.innerHTML = '<a href="' + postPermalink[index] + '">' + postTitle[index] + '</a>';
   contentdiv.innerHTML = '<p>' + postContent[index] + '</p><div style="clear: both;"></div>';
   if (editdiv)
     editdiv.innerHTML = '<a href="http://www2.blogger.com/post-edit.g?blogID=' + blogid + '&postID=' + postId[index] + '"><span class="quick-edit-icon">&#160;</span></a>';
   commentdiv.innerHTML = '<a target="_blank" href="http://www2.blogger.com/comment.g?blogID=' + blogid +'&postID=' + postId[index] + '">Post a Comment</a>';

   var backlinksdiv = document.getElementById("backlinks-container");
   backlinksdiv.innerHTML = '';

   //var postdiv = document.getElementById("post");
   //postdiv.scrollIntoView(true);
   checkFullNeo();
   fetchComments(postId[index]);
}

function updateComments(json) {
  if (json.feed.entry) {   
    for (var i = 0; i < json.feed.entry.length; i++) {
      var entry = json.feed.entry[i];
      commentAuthor[i] = entry.author[0].name.$t;
      commentContent[i] = entry.content.$t;
      commentDate[i] = entry.published.$t.substring(0,10);
    }
    totalComments = json.feed.entry.length;
  } else totalComments = 0;

  updateCommentsPage(0);
}

function showNextPage(page) {
  updateCommentsPage(page);
  var commentdiv = document.getElementById('comments');
  commentdiv.scrollIntoView(true);
}

function updateCommentsPage(page) {
  var commentdiv = document.getElementById('comments');

  if (totalComments == 0) {
      commentdiv.innerHTML = "<center><h2>No comments yet</h2></center>";
      return;
  }
  disp = "<center><h2>" + totalComments + " comments";

  var numpages = (totalComments / 10);
  if (numpages > 1) {
     disp = disp + ",&nbsp;Pages:&nbsp;"
     for (i = 0; i < numpages; i++) {
       if (i == page)
          disp = disp + (i+1) + "&nbsp;&nbsp;";
       else
          disp = disp + '<a href="javascript:updateCommentsPage(' + i + ');">' + (i+1) + '</a>&nbsp;&nbsp;';
     }
  }

  disp = disp + "</h2></center><dl class='comments-block' id='comments-block'>";

if (oldestFirstOrder == 1) {
  max = totalComments - 1 - (page * 10);
  min = totalComments - 1 - ((page+1) * 10);
  if (min < 0)
      min = 0;
  for (var i = max; i >= min; i--) {
      disp = disp + "<dt class='comment-author'>" + "On " + dateString(commentDate[i], 0) + ", " + commentAuthor[i] + " said...</dt>";
      if (commentAuthor[i] == blogAuthor) {
          disp = disp + "<dd class='comment-body-author'>" + commentContent[i] + "</dd><br/>";
      } else {
          disp = disp + "<dd class='comment-body'>" + commentContent[i] + "</dd><br/>";
      }
  }
} else { 
  max = (page + 1) * 10;
  if (max > totalComments)
      max = totalComments;
  for (var i = page * 10; i < max; i++) {
      disp = disp + "<dt class='comment-author'>" + "On " + dateString(commentDate[i], 0) + ", " + commentAuthor[i] + " said...</dt>";
      if (commentAuthor[i] == blogAuthor) {
          disp = disp + "<dd class='comment-body-author'>" + commentContent[i] + "</dd><br/>";
      } else {
          disp = disp + "<dd class='comment-body'>" + commentContent[i] + "</dd><br/>";
      }
  }
}
  disp = disp + "</dl>";

  if (page < (numpages-1)) {
    disp = disp + '<center><h3><a href="javascript:showNextPage(' + (page+1) + ');">Next comments page>></a></h3></center><br/>';
  }

  commentdiv.innerHTML = disp;
}
function fetchOlderPosts(label) {
   startIndex = startIndex + numPosts;
   fetchPosts(label);
   document.getElementById('LabelDisplay').scrollIntoView(true);
}

function fetchNewerPosts(label) {
   startIndex = startIndex - numPosts;
   fetchPosts(label);
   document.getElementById('LabelDisplay').scrollIntoView(true);
}

function fetchLatestPosts(url, label) {
   blogurl = url;
   startIndex = 1;
   fetchPosts(label);
}

function fetchPosts(label) {
  var labelposts = document.getElementById("LabelPosts");
  var labeltitle = document.getElementById("LabelTitle");
  labeltitle.innerHTML = "<h2><img alt='Indicator' src='http://3.bp.blogspot.com/-OeKIVJy47S4/Uf4_Om-3iBI/AAAAAAAAGHo/LBIXnhqYLB0/s1600/0075.gif'/>&nbsp;&nbsp;Updating...</h2><hr/>";

  if (label == '') {
     feedurl = 'http://caprt3a.blogspot.com/feeds/posts/default?orderby=published&start-index=' + startIndex + '&max-results=' + numPosts + '&alt=json-in-script&callback=updateLabelPosts';
  } else {
     label = label.replace(" ", "%20");
     feedurl = 'http://caprt3a.blogspot.com/feeds/posts/default/-/' + label + '?orderby=published&start-index=' + startIndex + '&max-results=' + numPosts + '&alt=json-in-script&callback=updateLabelPosts';
  }

  var script = document.createElement('script');
  script.setAttribute('src', feedurl);
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}

function fetchComments(postid) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://caprt3a.blogspot.com/feeds/' + postid + '/comments/default?max-results=100&alt=json-in-script&callback=updateComments');
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}


function showFullNeo() {
	var showspan = document.getElementById('showlink');
	var hidespan = document.getElementById('hidelink');
	var fullspan = document.getElementById('fullpost');
        showspan.style.display = 'none';
        hidespan.style.display = 'inline';
        fullspan.style.display = 'inline';
}
function hideFullNeo() {
	var showspan = document.getElementById('showlink');
	var hidespan = document.getElementById('hidelink');
	var fullspan = document.getElementById('fullpost');
        showspan.style.display = 'inline';
        hidespan.style.display = 'none';
        fullspan.style.display = 'none';
        var post = document.getElementById('post');
        post.scrollIntoView(true);
}
function checkFullNeo() {
	var showspan = document.getElementById('showlink');
	var hidespan = document.getElementById('hidelink');
        var fullpost = document.getElementById('fullpost');
        if (fullpost) {
            showspan.style.display = 'inline';
            hidespan.style.display = 'none';
        } else {
            showspan.style.display = 'none';
            hidespan.style.display = 'none';
        }
}