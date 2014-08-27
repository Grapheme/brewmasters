/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

jQuery.fn.testTheory = function(obj) {
	var element = $(this),
		$arrowLeft = $(this).find('.js-arrow-left');
		$arrowRight = $(this).find('.js-arrow-right');
		$testProgress = $(this).find('.js-test-progress');
		slides = $(this).find('.test-li');
		activeSlide = 0;


	$arrowLeft.click( function(){
		element.trigger('step.prev');
	});

	$arrowRight.click( function(){
		element.trigger('step.next');
		element.trigger('progress.calculate');
	});

	//Slider events
	//Previous slide
	element.bind('step.prev', function(e){
		var prevIndex = 0;

		slides.filter('.active').removeClass('active');

		if( activeSlide > 0 ) {
			prevIndex = --activeSlide;
		} else {
			prevIndex = activeSlide = slides.length - 1;
		}

		slides.eq(prevIndex).addClass('active');
	});

	//Next slider
	element.bind('step.next', function(e){
		var nextIndex = 0;

		slides.filter('.active').removeClass('active');

		if( activeSlide < (slides.length - 1) ) {
			nextIndex = ++activeSlide;
		} else {
			nextIndex = activeSlide = 0;
		}

		slides.eq(nextIndex).addClass('active');
	});

	//Method calculate progress
	element.bind('progress.calculate', function(e){
		var current = slides.filter('.active').index() + 1;
		var count = slides.length;

		console.log(current);
		console.log(count);

		var persent = Math.floor(current * 100 / count) + ' %';

		$testProgress.html(persent);
	});

	//Method show
	element.bind('step.show', function(e, num){
		slides.filter('.active').removeClass('active');
		slides.eq(num).addClass('active');
	});

	//Show first slide at the beginning
	element.trigger('step.show', activeSlide);
	element.trigger('progress.calculate');
};

jQuery.fn.testExam = function(obj) {

};

var Popup = (function(){
	var $overlay = $('.overlay');
	var $popup = $('.popup');
	var $btnRus = $('.js-button-rus');
	var $btnUkr = $('.js-button-ukr');

	//Check hash onload
	$(function(){
		var hash = window.location.hash.slice(1);

		if (hash === 'ru'){
			Popup.show(1);
		}
		if (hash ==='ukr'){
			Popup.show(2);
		}
	});

	//Click events
	$btnRus.click( function(){
		$.cookie('lang', 'rus', { expires: 7 });
	});
	$btnUkr.click( function(){
		$.cookie('lang', 'ukr', { expires: 7 });
	});


	return {

		show: function(id){
			$overlay.addClass('active');
			$('[data-popup="' + id + '"]').addClass('active');
		},

		close: function(){
			$overlay.removeClass('active');
			$popup.removeClass('active');
		}

	};

})();

$('.test').testTheory();

$('.answ-opt').click( function(){
	$(this).addClass('js-selected');
});

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
