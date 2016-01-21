Template.navbar.events = {
	'click #logout-button' : function() {
		Meteor.logout()
	},
	'click #signup-button' : function() {
		$('.signup-form').css('display','block');
	},
	'click #login-button' : function(event,template) {
		var username = template.find('#login-username').value;
		var password = template.find('#login-password').value;
		Meteor.loginWithPassword(username,password);
	},
	'click #logout-button' : function() {
		Meteor.logout();
	},
	'click #add-goal-button' : function() {
		Session.set('addNewGoal',true)
	},
	'click #help-button' : function() {
		alert('When adding a goal\nClick check mark button to cycle through states of completion');
	},
	'keyup login-password' : function(event,template){
		if(event.keyCode == 13){
			$('#login-button').click();
		}
	}
}

Template.navbar.helpers({
	currentUser: function() {
		return Meteor.user().username;
	}
});
