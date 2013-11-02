
chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command)
	cmd[command]();
});




var cmd = {};

cmd.API_KEY = 'AIzaSyAjebaw-1fPa_5APX0leYvl_TCLuiNlS9c';
cmd.CLIENT_ID = '75561265292-3kf5aag63jv44k3jueco1t5o7ip96emm.apps.googleusercontent.com';
cmd.SCOPES = 'https://www.googleapis.com/auth/drive';

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

// COMMAND: shorturl (Default key: Alt+Shift+C)
cmd.copytodrive = function() {
	chrome.tabs.executeScript(null, {code:"window.getSelection().toString()"}, function(arr) {
        cmd.clipboard = arr[0];
        chrome.identity.getAuthToken({ 'interactive': true }, cmd.copytodrive_auth); //TODO: error handling; TODO: token refresh
    });
};


cmd.copytodrive_auth = function(token) {
    gapi.auth.setToken({access_token:token, state: cmd.SCOPES});

    var request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'body': {
            "title" : "clipboard.txt",
            "description" : "This file contains a copy of text selected on page inside chrome browser"
        }
    });
    request.execute(cmd.copytodrive_created);
};
    

cmd.copytodrive_created = function(result) {
    console.log("created; result: ", result);
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files/' + result.id,
        'method': 'PUT',
        'body': cmd.clipboard
    });
    request.execute(cmd.copytodrive_done);
};


cmd.copytodrive_done = function(result) {
    console.log("done; result: ", result);
};


