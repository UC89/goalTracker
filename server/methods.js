Meteor.methods({
	addGoal: function (title,description,inProgress,pending,completed,colorClass,objectives,shared,picture,date) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('Must Be Logged In To Do That');
		}


		Goals.insert({goalTitle:title,
			goalDescription:description,
			inProgressPercentage:inProgress,
			pendingPercentage:pending,
			completedPercentage:completed,
			goalCardColorClass:colorClass,
			objectives:objectives,
			numberObjectives:objectives.length,
			isPublic:shared,
			goalPictureUrl:picture,
			dueDate:date,
			dateAdded: new Date(),
			belongsTo:Meteor.userId(),
			username:Meteor.user().username
		});
	},
	deleteGoal: function(goalId) {
		Goals.remove(goalId);
	}
})