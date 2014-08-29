var Reg = (function(){
	var step1 = $('.reg-step-1');
	var step2 = $('.reg-step-2');
	var inputJob = $('.input-jobtype');

	step1.find('.spec').click( function(){
		inputJob.val($(this).data('jobtype'));
		step1.hide();
		step2.show();
	});

	return {
		init: function(){

		}
	};

})();