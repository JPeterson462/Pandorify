'use strict';

// remove the old iframe
try {
  window.iframe.remove();
}
catch (e) {
}

window.iframe = document.createElement('iframe');
chrome.storage.local.get({
  width: 64,
  height: 64
}, ({width, height}) => {
  window.iframe.id = "injection";
  window.iframe.style = "width: 64px; height: 64px; background-image: url('http://files.softicons.com/download/android-icons/flat-icons-by-martz90/png/64x64/pandora.png');z-index: 10000000000;"
  window.iframe.src = chrome.runtime.getURL('data/inject/selector.html');
  document.body.appendChild(window.iframe);
  var src = document.getElementById('mediaelement_0').getAttribute("src");
  var downloading = browser.downloads.download({
  	url: src
  });
  downloading.then(function(id) {
  	console.info(`Started downloading: ${id}`);
  }, function(error) {
  	console.error(`Download failed: ${error}`);
  });
});