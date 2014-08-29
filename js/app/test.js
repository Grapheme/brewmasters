jQuery.fn.testTheory = function(obj) {
	var element = $(this),
		$arrowLeft = $(this).find('.js-arrow-left'),
		$arrowRight = $(this).find('.js-arrow-right'),
		$testProgress = $(this).find('.js-test-progress'),
		slides = $(this).find('.test-li'),
		activeSlide = 0,
		questionId = 1;


	$arrowLeft.click( function(){
		if( $(this).hasClass('disabled') ) return;

		element.trigger('step.prev');

		$arrowRight.removeClass('disabled');

		//Make button disabled if first slide

		var currentSlide = activeSlide + 1;

		if( currentSlide === 1 ) $(this).addClass('disabled');
	});

	$arrowRight.click( function(){
		if( $(this).hasClass('disabled') ) return;

		element.trigger('step.next');
		element.trigger('progress.calculate');

		$arrowLeft.removeClass('disabled');

		//Make button disabled if last slide

		var currentSlide = activeSlide + 1;
		var slidesLength = slides.length;

		if( currentSlide === slidesLength ) $(this).addClass('disabled');
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
		var testId = slides.parent().data('test');
		var questNewId = slides.filter('.active').data('question');
		var action = slides.parent().data('action');

		//Здесь мы обновляем глобальный счетчик текущего вопроса

		if (questionId < questNewId) questionId = questNewId;

		var persent = Math.floor(current * 100 / count) + ' %';

		$testProgress.html(persent);

		$.post(action , {
			testId: testId,
			questId: questionId,
			testProgress: persent
		});
	});

	//Method show
	element.bind('step.show', function(e, num){
		slides.filter('.active').removeClass('active');
		slides.eq(num).addClass('active');
	});

	//Show first slide at the beginning
	element.trigger('step.show', activeSlide);
	element.trigger('progress.calculate');
	$arrowLeft.addClass('disabled');
};

$('.test').testTheory();