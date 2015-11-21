Template.signupTemplate.events = {
	'click #cancel-signup' : function() {
		console.log('Cancel signup');
		$('.signup-form').css('display','none');
	},
	'click #signup-submit' : function() {
		console.log('Submit Form');
	}
}