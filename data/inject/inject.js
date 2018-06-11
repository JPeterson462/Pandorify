'use strict';

// remove the old iframe
try {
  window.iframe.remove();
}
catch (e) {}

console.log("injecting...")
window.iframe = document.createElement('iframe');
chrome.storage.local.get({
  width: 750,
  height: 650
}, ({width, height}) => {
  console.log("injected!")
  window.iframe.id = "injection";
  window.iframe.src = chrome.runtime.getURL('data/inject/selector.html');
  document.body.appendChild(window.iframe);
  console.log(window.iframe.contentDocument);
});