var Popup = (function(){
	var $overlay = $('.overlay');
	var $popup = $('.popup');
	var $btnRus = $('.js-button-ru');
	var $btnUkr = $('.js-button-ua');
	var $btnAge = $('.js-button-age');
	var $close = $('.js-popup-close');

	function checkAge(birthDate, minAge) {
		var tempDate = new Date(birthDate);
		return (tempDate <= new Date());
	}

	//Check hash onload
	$(function(){
		var hash = window.location.hash.slice(1);

		if (hash === 'ru'){
			Popup.show(1);
		}
		if (hash ==='ua'){
			Popup.show(2);
		}
	});

	//Click events
	$btnRus.click( function(){
		$.cookie('lang', 'ru', { expires: 7 });
		Popup.show(3);
	});
	$btnUkr.click( function(){
		$.cookie('lang', 'ua', { expires: 7 });
		Popup.show(6);
	});
	$close.click( function(){
		Popup.close();
	});

	//Birthday check
	$btnAge.click( function(e){
		var parent = $(this).parent().parent();

		e.preventDefault();
		var minAge = 18;
		var day = +parent.find('.select-day').find('option:selected').val();
		var month = +parent.find('.select-month').find('option:selected').val();
		var year = +parent.find('.select-year').find('option:selected').val();
		var date = new Date(year + 18, month, day);

		if ( checkAge(date) ) {
			$.cookie('age', '1', { expires: 7 });
			window.location.href = 'registration';
		} else {
			$.cookie('age', '0', { expires: 7 });
			if ( $(this).parent().parent().hasClass('ua-age') ) {
				Popup.show(7);
			} else {
				Popup.show(4);
			}
		}
	});


	return {

		show: function(id){
			$overlay.addClass('active');
			$popup.removeClass('active');
			$('[data-popup="' + id + '"]').addClass('active');
		},

		close: function(){
			$overlay.removeClass('active');
			$popup.removeClass('active');
		}

	};

})();