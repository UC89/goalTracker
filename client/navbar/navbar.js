Template.navbar.events = {
	'click #logout-button' : function() {
		console.log('Clicked logout button');
		Meteor.logout()
	},
	'click #signup-button' : function() {
		console.log('Clicked Signup Button');
		$('.signup-form').css('display','block');
	},
	'click #login-button' : function(event,template) {
		console.log('Clicked login button');
		var username = template.find('#login-username').value;
		var password = template.find('#login-password').value;
		Meteor.loginWithPassword(username,password);
	},
	'click #logout-button' : function()
	{
		console.log('Logging out: '+Meteor.user()['username']);
		Meteor.logout();
	},
	'keyup login-password' : function(event,template){
		if(event.keyCode == 13){
			console.log('Pressed enter key');
			$('#login-button').click();
		}
	}
}

Template.navbar.helpers({
	currentUser: function() {
		return Meteor.user().username;
	}
});
