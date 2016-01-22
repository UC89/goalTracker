Template.searchGoals.helpers({
	publicGoals : function(){
		var publicGoals = Goals.find({'isPublic':true});
		console.log('Found a goal');
		console.log('publicGoals: '+publicGoals)
		return publicGoals;
		},
		images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});

Template.searchGoals.events = {
'click .goal-card' : function(event,template) {
	Session.set('addNewGoal', false);
	console.log('Clicked goalcard');
	console.log('addNewGoal Session: '+Session.get('addNewGoal'));
	}
}