$(document).ready(function () {
	$('#safari').on('click', function () {
		chrome.tabs.executeScript({
			file: 'js/safari.js'
		});
	});
});