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
	'click #add-goal' : function(event,template) {
		newGoalId = event.target.value
		console.log('Adding Goal: '+newGoalId)
		goalToAdd = Goals.findOne({'_id':newGoalId});
		goalToAdd['isPublic'] = false;
		goalToAdd['belongsTo'] = Meteor.userId();
		delete goalToAdd['_id'];
		Goals.insert(goalToAdd);
	}
}