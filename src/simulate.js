function removeStyle() {
	// remove all CSS
	$(document).find('link[rel=stylesheet]').remove();
	$(document).find('style').remove();
}

function sendAllTo(href) {
	// send all links and buttons to href
	$(document).find('a').attr('href', href);
	$(document).find('button').attr('onclick', `location.href=${href}`);
}

chrome.storage.local.get('browser', function (result) {
	let browser = result.browser;
	if (browser === 'safari') {

	} else if (browser === 'opera') {

	} else if (browser === 'firefox') {

	} else if (browser === 'internet-explorer') {
		removeStyle();
		sendAllTo('https://www.google.com/chrome');
	}
});