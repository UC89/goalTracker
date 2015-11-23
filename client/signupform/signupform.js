Template.signupTemplate.events = {
	'click #cancel-signup' : function() {
		console.log('Cancel signup');
		$('.signup-form').css('display','none');
	},
	'click #signup-submit' : function(event,template) {
		console.log('Submit Form');
		var createdAt = new Date();
		var userName = template.find('#usernameInput').value;
		var userEmail = template.find('#userEmail').value;
		var userPassword1 = template.find('#userPassword1').value;
		var userPassword2 = template.find('#userPassword2').value;
		console.log('Username: '+userName);
		var newUser = createUser(userName,userPassword1,userEmail,createdAt);
		Accounts.createUser(newUser);
	}
}