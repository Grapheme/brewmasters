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
