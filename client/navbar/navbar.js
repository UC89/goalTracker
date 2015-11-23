Template.navbar.events = {
	'click #logout-button' : function() {
		console.log('Clicked logout button');
		Meteor.logout()
	},
	'click #signup-button' : function() {
		console.log('Clicked Signup Button');
		$('.signup-form').css('display','block');
	}
}
