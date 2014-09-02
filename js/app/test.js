jQuery.fn.testTheory = function() {
	var element = $(this),
		$arrowLeft = $(this).find('.js-arrow-left'),
		$arrowRight = $(this).find('.js-arrow-right'),
		$btnFinish = $(this).find('.js-arrow-finish'),
		$testProgress = $(this).find('.js-test-progress'),
		slides = $(this).find('.test-li'),
		activeSlide = $('.test-ul').data('question'),
		questionId = 1,
		persent = $('.test-ul').data('progress') || 0;

		console.log(persent);
		console.log(activeSlide);

	//knob

	$(".dial").knob({
		width: 100,
		font: 'Open Sans',
		thickness: '.2',
		bgColor: 'rgba(172, 172, 172, .5)',
		fgColor: '#fff',
		draw : function () {
			$(this.i).val(this.cv + '%');
		},
		readOnly: true
	});
	function animKnob(persent) {
		$(".dial").animate({animatedVal: persent}, {
			duration: 800,
			easing: "swing",
			step: function() {
				$(".dial").val(Math.ceil(this.animatedVal)).trigger("change");
			}
		});
	}

	$arrowLeft.click( function(){
		if( $(this).hasClass('disabled') ) return;

		element.trigger('step.prev');

		$arrowRight.removeClass('disabled');

		//Make button disabled if first slide

		var currentSlide = activeSlide + 1;

		if( currentSlide === 1 ) $(this).addClass('disabled');

		//Check if last slide
		element.trigger('check.last');
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

		//Check if last slide
		element.trigger('check.last');
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

	//Show link to cabinet if slide is last
	//And hide if we back
	element.bind('check.last', function(e){
		if ( slides.filter('.active').data('question') === 'finish' ) {
			$btnFinish.addClass('active');
			$arrowRight.hide();
		} else {
			$btnFinish.removeClass('active');
			$arrowRight.show();
		}
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

		// Disable button if exam
		if ( slides.eq(nextIndex).hasClass('exam-li') && !slides.eq(nextIndex).find('.js-selected').hasClass('success') ) {
			$arrowRight.addClass('disabled');
		}
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

		var persentNew = Math.floor(current * 100 / count);


		//Заполняем глобальную переменую прогресса
		if (persent < persentNew) {

			persent = persentNew;

				$.post(action , {
				testId: testId,
				questId: questionId,
				testProgress: persent
			});
		} else {
		}
		animKnob(persent);
	});

	//Method show
	element.bind('step.show', function(e, num){
		slides.filter('.active').removeClass('active');
		slides.filter('[data-question="' + activeSlide + '"]').addClass('active');
	});

	$('.answ-opt').click( function(){
		$(this).addClass('js-selected');
		if ( $(this).hasClass('success') ) {
			$(this).parent().children().unbind();
			$arrowRight.removeClass('disabled');
		}
	});

	//Show first slide at the beginning
	element.trigger('step.show', activeSlide);
	element.trigger('progress.calculate');

	if(activeSlide === 0) $arrowLeft.addClass('disabled');
};

$('.test').testTheory();