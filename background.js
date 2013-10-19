
chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command)
	cmd[command]();
});




var cmd = {};

cmd.API_KEY = 'AIzaSyD5vyQs7WkiAjFvr94emCm1wQ9DuZW56lM';

// COMMAND: translate (Default key: Ctrl+Shift+A)
cmd.translate = function() {
	chrome.tabs.executeScript(null, {code:"window.getSelection().toString()"}, cmd.translate_cb);
};

cmd.translate_cb = function(arr) {
	window.open("http://translate.google.pl/#auto/pl/" + arr[0]); //TODO: case when nothing is selected
};





// COMMAND: bookmark (Default key: Ctrl+Shift+X)
cmd.bookmark = function() {
	chrome.tabs.query({active: false, pinned: false}, cmd.bookmark_cb);
};

cmd.bookmark_cb = function(tabs) {
	for(var i = 0; i < tabs.length; ++i) {
		chrome.bookmarks.create({parentId: '1', title: tabs[i].title, url: tabs[i].url});
		chrome.tabs.remove(tabs[i].id);
	}
};




// COMMAND: shorturl (Default key: Ctrl+Shift+S)
cmd.shorturl = function() {
    gapi.client.setApiKey(cmd.API_KEY);
    gapi.client.load("urlshortener", "v1", cmd.shorturl_cb1);//TODO: what if we call it second time? will it actually load again?
};

cmd.shorturl_cb1 = function() {
    chrome.tabs.query({active:true}, cmd.shorturl_cb2);
};

cmd.shorturl_cb2 = function(tabs) {
    var tab = tabs[0]; //FIXME: always tabs[0] ??
    var req = gapi.client.urlshortener.url.insert({resource:{longUrl:tab.url}});
    cmd.tabid_ = tab.id;
    req.execute(cmd.shorturl_cb3);
};

cmd.shorturl_cb3 = function(res) {
    alert("Long URL: " + res.longUrl + "\nShort URL: " + res.id);
};

    


