var App = (function(){
	var $btnLog = $('.js-btn-signin');
	var $btnCab = $('.js-btn-edit');
	var $cabForm = $('.cabinet-user');
	var $numInput = $('.js-num-input');
	var $txtInput = $('.js-txt-input');
	var $beginEd = $('.js-begin-learning');

	$beginEd.click( function(e){
		e.preventDefault();
		$('.cabinet.section').toggleClass('active');
	});

	$btnCab.click( function(){
		$cabForm.addClass('edit');
		$(this).parent().find('input').removeAttr('disabled');
	});
	
	$btnLog.click( function(){
		Popup.show(5);
	});

	$numInput.on("keypress keyup blur",function (event) {
       $(this).val($(this).val().replace(/[^\d].+/, ""));
        if (event.keyCode != 8) {
        	if ((event.which < 48 || event.which > 57)) {
	            event.preventDefault();
	        }
        }        
    });

	$txtInput.bind('keypress keyup blur',function(){
		var node = $(this);
		node.val(node.val().replace(/[1234567890!@#$%^&*();{}'"]/gi,'') ); }
	);

	$(function(){
		if ($.cookie('lang') == 'ru') {
            $('h1.logo').removeClass('ua').addClass('ru');
            $('.js-f-soc').attr('href', 'http://suninbev.ru/responsibility/');
            $('.js-f-br').attr('href', 'http://suninbev.ru/brands/');
            $('.js-f-fb').attr('href', 'http://fb.com/suninbev').html('fb.com/suninbev');
            $('.js-f-main').attr('href', 'http://suninbev.ru').html('suninbev.ru');
        }
        if ($.cookie('lang') == 'ua') {
            $('h1.logo').removeClass('ru').addClass('ua');
            $('.js-f-soc').attr('href', 'http://www.suninbev.com.ua/ru/csr');
            $('.js-f-br').attr('href', 'http://www.suninbev.com.ua/ru/brands');
            $('.js-f-fb').attr('href', 'https://www.facebook.com/SUNInBev.UA?ref=br_rs').html('fb.com/SUNInBev.UA');
            $('.js-f-main').attr('href', 'http://www.suninbev.com.ua/').html('suninbev.com.ua');
        }
	});
	
})();