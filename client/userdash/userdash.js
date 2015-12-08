Template.dashboard.helpers({
	userGoals : function(){
		var userGoalsAll = Goals.find({'belongsTo':Meteor.userId()}).fetch();
		userGoals = []
		for (goal in userGoalsAll) {
			newGoal={}
			newGoal[goalTitle] = goal['goalTitle']
			userGoals.push(newGoal)
		}
		return userGoals
		}
});

