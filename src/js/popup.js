function simulate(browser) {
	chrome.tabs.executeScript(null, { file: "js/jquery.min.js" }, function() {
		chrome.tabs.executeScript(null, { file: "js/collective.js" }, function() {
			chrome.tabs.executeScript(null, { file: `js/browsers/${browser}.js` });
		});
	});
	console.log('hello')
}

$(document).ready(function () {
	$('#safari').on('click', function () {
		simulate('safari')
	});
	$('#opera').on('click', function () {
		simulate('opera')
	});
	$('#firefox').on('click', function () {
		simulate('firefox')
	});
	$('#internet-explorer').on('click', function () {
		simulate('internet-explorer')
	});
});