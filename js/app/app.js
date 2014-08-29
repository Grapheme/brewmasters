var App = (function(){
	var $btnLog = $('.js-btn-signin');
	var $btnCab = $('.js-btn-edit');
	var $cabForm = $('.cabinet-user');
	var $cabSave = $('.js-cab-save');

	$btnCab.click( function(){
		$cabForm.addClass('edit');
		$(this).parent().find('input').removeAttr('disabled');
	});
	$cabSave.click( function(){
		$cabForm.removeClass('edit').find('input').addAttr('disabled');
	});

	$btnLog.click( function(){
		Popup.show(5);
	});
})();