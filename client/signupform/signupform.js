Template.signupTemplate.onRendered(function (){
	$('.signup-form').validate();
})

Template.signupTemplate.events = {
	'click #cancel-signup' : function() {
		console.log('Cancel signup');
		$('.signup-form').css('display','none');
	},
	'click #signup-submit' : function(event,template) {
		console.log('Submit Form');

		var files = document.getElementById('profilePicture');
    var file = files.files[0];
    //var goalImage = Images.insert(file, function (error, fileObj) {
      // Insert error catch here...
    //});

		var createdAt = new Date();
		var userName = template.find('#usernameInput').value;
		var userEmail = template.find('#userEmail').value;
		var userPassword1 = template.find('#userPassword1').value;
		var userPassword2 = template.find('#userPassword2').value;


		var imageObject = profileImages.insert(file);

		console.log('imageObject: '+imageObject.getFileRecord());

		Meteor.call('addUser',userName,userPassword1,userPassword2,userEmail, imageObject);

		Router.go('/addgoal');
	}
}