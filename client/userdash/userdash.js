Template.dashboard.helpers({
	userGoals : function(){
		var userGoals = Goals.find({'$and':[{'belongsTo':Meteor.userId()},{'isPublic':false}]});
		return userGoals;
		},
		images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});

Template.dashboard.events = {
'click .goal-card' : function(event,template) {
	Session.set('addNewGoal', false);
	}
}



