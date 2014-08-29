var App = (function(){
	var $btnLog = $('.js-btn-signin');
	var $btnCab = $('.js-btn-edit');
	var $cabForm = $('.cabinet-user');

	$btnCab.click( function(){
		$cabForm.addClass('edit');
		$(this).parent().find('input').removeAttr('disabled');
	});
	
	$btnLog.click( function(){
		Popup.show(5);
	});
})();