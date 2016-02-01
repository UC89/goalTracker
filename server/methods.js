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
		if (!Meteor.userId()) {
			throw new Meteor.Error('Must Be Logged In To Do That');
		}
		Goals.remove(goalId);
	},
	updateGoal: function(editGoalId,goalTitle,goalDescription,inProgressPercentage,pendingPercentage,completedPercentage,pendingPercentage,completedPercentage,newColor,editedObjectives,imageUrl) {

		if (!Meteor.userId()) {
			throw new Meteor.Error('Must Be Logged In To Do That');
		}

		Goals.update({_id:editGoalId},{goalTitle:goalTitle,goalDescription:goalDescription,inProgressPercentage:inProgressPercentage,pendingPercentage:pendingPercentage,completedPercentage:completedPercentage,goalCardColorClass:newColor,objectives:editedObjectives,belongsTo:Meteor.userId(),isPublic:false,goalPictureUrl:imageUrl},{upsert:true})

	},
	deleteGoal: function(goalId) {
		Goals.remove(goalId);
	},
	addUser: function(
		userName,password_1,password_2,email,imageRef) {
		if (password_1 != password_2) {
			throw new Meteor.Error('Passwords do not match')
		}
		let profile = {};
		profile['profilePicture'] = imageRef;
		var newUser = {'username':userName,'email':email,'password':password_1,'profile':profile};
		Accounts.createUser(newUser);

	}
})