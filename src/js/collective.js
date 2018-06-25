function removeStyle() {
	// remove all CSS
	$(document).find('link[rel=stylesheet]').remove();
}

function sendAllTo(href) {
	// send all links and buttons to href
	$(document).find('a').attr('href', href);
	$(document).find('button').attr('onclick', `location.href=${href}`);
}