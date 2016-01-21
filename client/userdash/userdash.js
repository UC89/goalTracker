Template.dashboard.helpers({
	userGoals : function(){
		var userGoals = Goals.find({'belongsTo':Meteor.userId()});
		return userGoals;
		},
		images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});

Template.dashboard.events = {
'click .goal-card' : function(event,template) {
	Session.set('addNewGoal', false);
	console.log('Clicked goalcard');
	console.log('addNewGoal Session: '+Session.get('addNewGoal'));
	}
}



