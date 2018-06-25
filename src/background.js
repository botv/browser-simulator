function changeBrowser(browser) {
	chrome.storage.local.set({'browser': browser});
	chrome.browserAction.setIcon({path: `assets/${browser}.png`});
	chrome.tabs.reload();
	chrome.tabs.executeScript({file: "simulate.js"});
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({'browser': 'chrome'});
});

chrome.browserAction.onClicked.addListener(function() {
  let browsers = ['chrome', 'safari', 'opera', 'firefox', 'internet-explorer'];
  chrome.storage.local.get("browser", function(result) {
		changeBrowser(browsers[(browsers.indexOf(result.browser) + 1) % browsers.length])
  });
});