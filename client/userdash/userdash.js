if (Meteor.isClient) {
	Template.dashboard.helpers({
		userGoals : function(){
			var userGoals = Goals.find({'belongsTo':Meteor.userId()});
			return userGoals;
			},
			images: function () {
	    return Images.find(); // Where Images is an FS.Collection instance
	  }
	});
}
/*Template.dashboard.events = {
	'click .goal-card' : function(event,template) {
		//window.location.href = 'addGoal'
		console.log('Clicked goalcard')
	}

}*/
