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

$('.test').testTheory();