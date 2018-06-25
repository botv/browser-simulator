$(document).ready(function () {
	$('#safari').on('click', function () {
		chrome.tabs.executeScript({
			file: 'js/browsers/safari.js'
		});
	});
	$('#opera').on('click', function () {
		chrome.tabs.executeScript({
			file: 'js/browsers/opera.js'
		});
	});
	$('#firefox').on('click', function () {
		chrome.tabs.executeScript({
			file: 'js/browsers/firefox.js'
		});
	});
	$('#internet-explorer').on('click', function () {
		chrome.tabs.executeScript({
			file: 'js/browsers/internet-explorer.js'
		});
	});
});